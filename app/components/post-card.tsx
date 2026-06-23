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
import { Button } from "./ui/button";

interface PostCardProps {
  id: number; // Add this
  username: string;
  title: string;
  description: string;
  time: string;
  onDelete?: (id: number) => void; // Add this
}

export function PostCard({ username, time, title, description, onDelete, id }: PostCardProps) {
  return (
    <div className="bg-card p-2 sm:p-3 mb-2 sm:mb-3 rounded-md">
      <div>
        <div className="flex items-center gap-2 text-base sm:text-lg">
          <div className="bg-accent p-1.5 sm:p-2 rounded">
            <User className="w-3 h-3 sm:w-4 sm:h-4" />
          </div>
          <span className="text-sm sm:text-base font-medium">{username}</span>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Ellipsis className="ml-auto w-6 h-6" />} />
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
        <div className="mt-1">
          <span className="text-xs sm:text-sm text-gray-400">{time}</span>
        </div>
        <div className="mt-2">
          <p className="text-base sm:text-xl font-semibold">{title}</p>
          <p className="text-sm sm:text-base mb-2">{description}</p>
        </div>
        {/* <div className="bg-gray-100 dark:bg-gray-800 w-full text-gray-700 dark:text-gray-300 text-sm sm:text-base p-2 rounded">
          <img src="images/bananas.jpg" alt="Bananas" />
        </div> */}
        <div className="border-t border-border mt-2 py-2">
          <div className="flex gap-2 sm:gap-3 flex-wrap">
            <button className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm hover:opacity-75 transition">
              <ArrowBigUp className="w-4 h-4" /> 67 Like
            </button>
            <button className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm hover:opacity-75 transition">
              <ArrowBigDown className="w-4 h-4" /> 3 Dislike
            </button>
            <button className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm hover:opacity-75 transition">
              <MessageSquare className="w-4 h-4" /> 43 Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
