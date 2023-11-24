import Link from "next/link";
import { Post } from "@prisma/client";
import { formatDate } from "@/lib/utils";
import PostOperations from "./post-operations";

interface PostItemProps {
  post: Pick<Post, "id" | "title" | "published" | "createdAt">;
}

export function PostItem({ post }: PostItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <div className="flex gap-2 items-center">
          <Link
            href={`/editor/${post.id}`}
            className="font-semibold hover:underline"
          >
            {post.title}
          </Link>
          <span className="border rounded w-fit text-xs px-1 text-muted-foreground">
            {post.published ? "Published" : "Draft"}
          </span>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(post.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <div>
        <PostOperations post={post} />
      </div>
    </div>
  );
}
