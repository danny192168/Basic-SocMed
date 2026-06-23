import { Image, ImageUp, Trash2, User } from "lucide-react";
import { PostCard } from "~/components/post-card";
import { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "~/components/ui/label";
import { toast } from "sonner";

import { supabase } from "~/lib/supabase";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

// READ

export default function Feeds() {
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [user, setUser] = useState<any>(null);

  type PostData = {
    id: number;
    created_at: string;
    username: string;
    title: string;
    description: string;
    image_url: string | null;
  };

  const [postDatas, setPostDatas] = useState<PostData[]>([]);

  //   Image Upload
  const uploadImage = async (file: File): Promise<string | null> => {
    // Sanitize filename: remove special characters, keep only alphanumeric, hyphens, underscores
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-").replace(/^-+|-+$/g, "");

    const filePath = `${sanitizedName}-${Date.now()}`;

    console.log("Starting image upload:", filePath);

    const { error } = await supabase.storage.from("post-images").upload(filePath, file);

    if (error) {
      console.error("Error uploading image:", error.message);
      return null;
    }

    console.log("Image uploaded successfully, getting public URL...");
    const { data } = await supabase.storage.from("post-images").getPublicUrl(filePath);

    console.log("Public URL data:", data);
    return data.publicUrl;
  };

  // INSERT

  const addPost = async () => {
    setUploading(true);
    let imageUrl: string | null = null;
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }
    const newPostData = {
      image_url: imageUrl,
      username: user?.email ?? "Anonymous",
      title: postTitle,
      description: postDescription,
    };
    console.log("imageUrl");
    console.log(imageUrl);
    try {
      const data = await toast.promise(
        (async () => {
          const { data, error } = await supabase
            .from("PostUploads")
            .insert([newPostData])
            .select()
            .single();

          if (error) throw error;

          return data;
        })(),
        {
          loading: "Creating post...",
          success: (post) => {
            console.log("Post upload data:", data);
            setPostTitle("");
            setImageFile(null);
            setPostDescription("");
            setOpen(false);
            return `"${post.title}" has been posted!`;
          },
          error: (error) => error.message,
        },
      );
    } catch (error: any) {
      console.error("Post upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  //   Delete

  const deletePost = async (postId: number) => {
    const { error } = await supabase.from("PostUploads").delete().eq("id", postId);
    if (error) {
      toast.error("Failed to delete post");
    } else {
      toast.success("Post deleted");
      fetchPosts(); // refresh the list
    }
  };

  // READ

  const fetchPosts = useCallback(async () => {
    const { data, error } = await supabase
      .from("PostUploads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
    } else {
      console.log(data);
      setPostDatas(data);
      console.log("FETCHED");
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error) {
        console.error("Failed to load user:", error);
        return;
      }
      setUser(data.user);
    });
  }, []);

  // SUPABASE SUBSCRIPTION
  useEffect(() => {
    const channel = supabase
      .channel("posts-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "PostUploads",
        },
        (payload) => {
          const newPost = payload.new as PostData;
          setPostDatas((prev) => [newPost, ...prev]);
        },
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "PostUploads",
        },
        (payload) => {
          const deletedPost = payload.old as PostData;
          setPostDatas((prev) => prev.filter((post) => post.id !== deletedPost.id));
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="flex-1 max-w-4xl w-screen p-3 mx-auto gap-4">
      <div className="max-w-2xl mx-auto">
        <div>
          {/* POST */}
          <Dialog open={open} onOpenChange={setOpen}>
            <div className="bg-card rounded-md mb-3 flex p-3 gap-2">
              <div className="grid place-items-center bg-gray-500 rounded-md h-10 w-10">
                <User className="w-6 h-6" />
              </div>
              <input
                readOnly
                className="bg-input-background px-3 min-w-0 flex-1 rounded-md outline-none"
                style={{ color: "var(--foreground-dark)", caretColor: "transparent" }}
                type="text"
                placeholder="Make a post"
                onClick={() => {
                  setOpen(true);
                }}
              />
              <label
                htmlFor="image"
                className="grid place-items-center rounded-md w-10 h-10 bg-primary cursor-pointer"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="image"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageFile(file);
                      setOpen(true); // ✅ Opens dialog when file is selected
                    }
                  }}
                />
                <ImageUp />
              </label>
            </div>

            <DialogContent className="sm:max-w-xl">
              <DialogHeader>
                <DialogTitle>Create Post</DialogTitle>
                <DialogDescription>
                  Make your post here. Click post when you're done.
                </DialogDescription>
              </DialogHeader>

              {/* Form inputs */}
              <form
                className="grid gap-4 py-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  addPost();
                }}
              >
                <div className="grid gap-2">
                  <Label htmlFor="title-1">Title</Label>
                  <div className="relative">
                    <input
                      id="title-1"
                      value={postTitle}
                      disabled={uploading}
                      required
                      onChange={(e) => {
                        setPostTitle(e.target.value);
                      }}
                      className={`w-full border p-2 rounded outline-none ${uploading && "text-muted-foreground pr-10"}`}
                      placeholder="Write a title"
                    />
                    {uploading && (
                      <Spinner className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    )}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description-1">Description</Label>
                  <div className="relative">
                    {uploading && (
                      <Spinner className="absolute right-3 top-1 translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    )}
                    <textarea
                      id="description-1"
                      value={postDescription}
                      onChange={(e) => {
                        setPostDescription(e.target.value);
                      }}
                      className={`w-full border p-2 rounded outline-none ${uploading && "text-muted-foreground"}`}
                      disabled={uploading}
                      placeholder="Write a description"
                    />
                  </div>
                </div>
                {imageFile ? (
                  <div className="grid gap-2">
                    <div className="flex">
                      <Label>Selected Image</Label>
                    </div>
                    <div className="relative">
                      <button
                        className="ml-auto rounded-full bg-background/80 backdrop-blur-sm text-red-400 p-2 absolute top-0 right-0 m-2"
                        onClick={() => setImageFile(null)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <div className="w-full bg-background p-2 rounded-md flex justify-center">
                        <img
                          src={URL.createObjectURL(imageFile)}
                          alt="Preview"
                          className={`max-w-full max-h-44 w-auto h-auto rounded border transition-all ${uploading && "brightness-75"}`}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border flex items-center p-2 rounded">
                    <span
                      className={`text-md font-semibold ${uploading && "text-muted-foreground"}`}
                    >
                      Add to your post
                    </span>
                    <label
                      htmlFor="image"
                      className="grid place-items-center rounded-md w-8 h-8  bg-background cursor-pointer ml-auto"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploading}
                        id="image"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setImageFile(file);
                            setOpen(true); // ✅ Opens dialog when file is selected
                          }
                        }}
                      />
                      <Image className={`${uploading && "text-muted-foreground"}`} />
                    </label>
                  </div>
                )}

                <DialogFooter>
                  <Button
                    className={`w-full font-semibold text-md  ${uploading && "font-normal"}`}
                    disabled={uploading || postTitle.length == 0}
                    type="submit"
                    onClick={() => {
                      console.log(postDatas);
                    }}
                  >
                    {uploading ? (
                      <>
                        <Spinner data-icon="inline-start" /> Uploading
                      </>
                    ) : (
                      "Post"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          {/* POSTS */}

          {postDatas.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              username={post.username}
              time={post.created_at}
              title={post.title}
              description={post.description}
              onDelete={deletePost}
              imageUrl={post.image_url}
            />
          ))}
          {postDatas.length == 0 && (
            <>
              <Card className="w-full mb-2 sm:mb-3 rounded-md ring-0">
                <CardHeader>
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="aspect-video w-full" />
                </CardContent>
              </Card>
              <Card className="w-full mb-2 sm:mb-3 rounded-md ring-0">
                <CardHeader>
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-2/3" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="aspect-video w-full" />
                </CardContent>
              </Card>
            </>
          )}
          {/* <PostCard
            username="John Doe"
            time="Jun 22, 4:24 PM"
            title="Does anyone Like Bananas?"
            description="I have some bananas here if you guys want some"
          /> */}
        </div>
      </div>
    </div>
  );
}
