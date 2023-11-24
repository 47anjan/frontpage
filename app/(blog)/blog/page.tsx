import PostCard from "@/components/post-card";
import prisma from "@/prisma/client";
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
            Exploring Ideas, Thoughts, and Stories
          </p>
        </div>
      </div>
      <hr className="my-8" />
      {posts?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {posts.map((post, index) => (
            <Link href={`/blog/${post.slug}`} key={post.id}>
              <PostCard post={post} />
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
