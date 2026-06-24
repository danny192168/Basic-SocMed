import {
  ArrowBigDown,
  ArrowBigUp,
  Ellipsis,
  MessageSquare,
  PencilIcon,
  ShareIcon,
  ThumbsUp,
  TrashIcon,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  id: number;
  username: string;
  title: string;
  description: string;
  time: string;
  imageUrl?: string | null;
  onDelete?: (id: number) => void;
  updateReaction: (postId: number, column: "likes" | "dislikes") => void;
  likes: number;
  dislikes: number;
  commentCount: number;
}

export function PostCard({
  username,
  time,
  title,
  description,
  onDelete,
  id,
  imageUrl,
  updateReaction,
  likes,
  dislikes,
  commentCount,
}: PostCardProps) {
  return (
    <div className="bg-card p-2 sm:p-3 mb-2 sm:mb-3 rounded-md">
      <div>
        <div className="flex items-center gap-2 text-base sm:text-lg">
          <div className="bg-accent p-1.5 sm:p-2 w-10 h-10 grid place-items-center rounded-md">
            <User />
          </div>
          <div className="flex flex-col h-min">
            <span className="text-xs sm:text-sm text-gray-400">
              {" "}
              {formatDistanceToNow(new Date(time.replace(" ", "T")), {
                addSuffix: true,
              })}
            </span>
            <span className="text-sm sm:text-base font-medium">{username}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Ellipsis className="ml-auto w-5 h-5 sm:w-6 sm:h-6" />} />
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <PencilIcon />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ShareIcon />
                  Share
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="text-red-400"
                  onClick={() => onDelete?.(id)} // Add onClick here
                >
                  <TrashIcon />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-2">
          <p className="text-base sm:text-xl font-semibold">{title}</p>
          <p className="text-sm sm:text-base mb-2">{description}</p>
        </div>
        {imageUrl ? (
          <div className="bg-background w-full rounded-md flex justify-center">
            <img
              src={imageUrl}
              alt={title}
              className="max-w-full max-h-240 w-auto h-auto rounded border transition-all object-cover "
            />
          </div>
        ) : null}

        <div className="border-t border-border mt-2 py-2">
          <div className="flex gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={() => {
                updateReaction(id, "likes");
              }}
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm hover:opacity-75 transition"
            >
              <ArrowBigUp className="w-4 h-4" />
              {`${likes} Likes`}
            </button>
            <button
              onClick={() => {
                updateReaction(id, "dislikes");
              }}
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm hover:opacity-75 transition"
            >
              <ArrowBigDown className="w-4 h-4" />
              {`${dislikes} Dislikes`}
            </button>
            <button className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm hover:opacity-75 transition">
              <MessageSquare className="w-4 h-4" /> {`${commentCount} Comments`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
