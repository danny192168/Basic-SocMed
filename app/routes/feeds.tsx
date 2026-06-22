import { ImageUp, User } from "lucide-react";
import { PostCard } from "~/components/post-card";

export default function Feeds() {
  return (
    <div className="flex-1 max-w-4xl w-full p-3 mx-auto gap-4">
      {/* <h1>Feeds</h1> */}

      <div className="max-w-2xl mx-auto">
        <div>
          <div className="bg-card rounded-md mb-3 flex p-3 gap-2">
            <div className="grid place-items-center bg-gray-500 rounded-md h-10 w-10">
              <User className="w-6 h-6" />
            </div>
            <input
              className="bg-input-background px-3 flex-1 rounded-md outline-none"
              style={{ color: "var(--foreground-dark)" }}
              type="text"
              placeholder="Make a post"
            />
            <div className="grid place-items-center rounded-md w-10 h-10 bg-primary ">
              <ImageUp />
            </div>
          </div>
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
