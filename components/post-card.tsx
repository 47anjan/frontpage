import { cn, formatDate } from "@/lib/utils";
import { Post } from "@prisma/client";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "./ui/card";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <Card className={cn("h-full overflow-hidden rounded-sm")}>
      <CardHeader className="border-b p-0">
        <AspectRatio ratio={16 / 9}>
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              className="object-cover"
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              fill
              loading="lazy"
            />
          ) : (
            <div
              aria-label="Placeholder"
              role="img"
              aria-roledescription="placeholder"
              className="flex h-full w-full items-center justify-center bg-secondary"
            >
              <div
                className="h-9 w-9 text-muted-foreground"
                aria-hidden="true"
              ></div>
            </div>
          )}
        </AspectRatio>
      </CardHeader>
      <span className="sr-only">{post.title}</span>
      <CardContent className="grid gap-2.5 p-4">
        <CardTitle className="line-clamp-2 leading-snug">
          {post.title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {formatDate(post.createdAt.toDateString())}
        </CardDescription>
      </CardContent>
    </Card>
  );
};
export default PostCard;
