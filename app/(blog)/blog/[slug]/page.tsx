import { buttonVariants } from "@/components/ui/button";
import { cn, formatDate } from "@/lib/utils";
import prisma from "@/prisma/client";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Params {
  params: { slug: string };
}

const Blog = async ({ params }: Params) => {
  const post = await prisma.post.findFirst({
    where: {
      slug: params.slug,
    },
  });

  const user = await prisma.user.findUnique({
    where: { email: post?.authorId },
  });

  if (!post) return null;

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Link
        href="/blog"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex"
        )}
      >
        <ArrowLeft size={18} className="mr-2 h-4 w-4" />
        See all posts
      </Link>
      <div>
        <time
          dateTime={post.createdAt.toDateString()}
          className="block text-sm text-muted-foreground"
        >
          Published on {formatDate(post.createdAt.toDateString())}
        </time>

        <h1 className="mt-2 inline-block font-bold text-4xl leading-tight lg:text-5xl">
          {post.title}
        </h1>

        {user && (
          <div className="mt-4 flex space-x-4">
            <Image
              src={user?.image!!}
              alt={user?.name!!}
              width={42}
              height={42}
              className="rounded-full bg-white"
            />
            <div className="flex-1 text-left leading-tight">
              <p className="font-medium">{user?.name}</p>
              <p className="text-[12px] text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        )}
      </div>
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={720}
          height={405}
          className="my-8 rounded-md border bg-muted transition-colors"
          priority
        />
      )}

      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
          <ArrowLeft size={18} className="mr-2 h-4 w-4" />
          See all posts
        </Link>
      </div>
    </article>
  );
};
export default Blog;
