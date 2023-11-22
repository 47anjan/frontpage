import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatDate } from "@/lib/utils";
import prisma from "@/prisma/client";
import Image from "next/image";
import Link from "next/link";

const BlogPage = async () => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-bold text-4xl tracking-tight lg:text-5xl">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            Unlish your brain with new knowlage
          </p>
        </div>
      </div>
      <hr className="my-8" />
      {posts?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {posts.map((post, index) => (
            <Link href={`/blog/${post.slug}`} key={post.id}>
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
                  <CardTitle className="line-clamp-1">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {formatDate(post.createdAt.toDateString())}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  );
};
export default BlogPage;
