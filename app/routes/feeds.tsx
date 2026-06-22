import { Image, ImageUp, Trash2, User } from "lucide-react";
import { PostCard } from "~/components/post-card";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "~/components/ui/label";

export default function Feeds() {
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  return (
    <div className="flex-1 max-w-4xl w-full p-3 mx-auto gap-4">
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
                className="bg-input-background px-3 flex-1 rounded-md outline-none"
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
                <DialogTitle className="font-fredoka">Create Post</DialogTitle>
                <DialogDescription>
                  Make changes to your post here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>

              {/* Form inputs */}
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title-1">Tile</Label>
                  <input
                    id="title-1"
                    className="border p-2 rounded outline-none"
                    placeholder="Write a title"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description-1">Description</Label>
                  <textarea
                    id="description-1"
                    className="border p-2 rounded outline-none"
                    placeholder="Write a description"
                  />
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
                      <img
                        src={URL.createObjectURL(imageFile)}
                        alt="Preview"
                        className="w-full h-auto object-cover rounded border"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="border flex items-center p-2 rounded">
                    <span className="text-md font-semibold">Add to your post</span>
                    <label
                      htmlFor="image"
                      className="grid place-items-center rounded-md w-8 h-8  bg-background cursor-pointer ml-auto"
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
                      <Image />
                    </label>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button className="w-full font-semibold text-md font-fredoka" type="submit">
                  Post
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <PostCard
            username="John Doe"
            time="Jun 22, 4:24 PM"
            title="Does anyone Like Bananas?"
            description="I have some bananas here if you guys want some"
          />

          <PostCard
            username="John Doe"
            time="Jun 22, 4:24 PM"
            title="Does anyone Like Bananas?"
            description="I have some bananas here if you guys want some"
          />
        </div>
      </div>
    </div>
  );
}
