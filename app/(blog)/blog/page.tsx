import { formatDate } from "@/lib/utils";
import prisma from "@/prisma/client";
import { Link } from "lucide-react";

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
            <article
              key={post.id}
              className="group relative flex flex-col space-y-2"
            >
              <h2 className="text-2xl font-extrabold">{post.title}</h2>

              <p className="text-sm text-muted-foreground">
                {formatDate(post.createdAt.toDateString())}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  );
};
export default BlogPage;
