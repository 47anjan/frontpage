import { formatDate } from "@/lib/utils";
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
              <article className="group relative flex flex-col space-y-2">
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={200}
                    objectFit="cover"
                    className="rounded-md border bg-muted transition-colors"
                    priority={index <= 1}
                  />
                )}

                <h2 className="text-2xl font-extrabold line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {formatDate(post.createdAt.toDateString())}
                </p>
              </article>
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
