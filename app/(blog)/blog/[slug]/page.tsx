import Bookmark from "@/components/bookmark";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatDate } from "@/lib/utils";
import prisma from "@/prisma/client";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cache } from "react";
import ReactMarkdown from "react-markdown";
interface Params {
  params: { slug: string };
}

const fetchPost = cache((slug: string) =>
  prisma.post.findFirst({
    where: {
      slug: slug,
    },
  })
);

const fetchUser = cache((email: string) =>
  prisma.user.findUnique({
    where: { email: email },
  })
);

const Blog = async ({ params }: Params) => {
  const post = await fetchPost(params.slug);
  if (!post) return null;
  const user = await fetchUser(post?.authorId);

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <div className="absolute left-[-200px] top-14 hidden xl:flex flex-col gap-2">
        <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
          <ArrowLeft size={18} className="mr-2 h-4 w-4" />
          See all posts
        </Link>
        <Bookmark postId={post.id} />
      </div>
      <div>
        <time
          dateTime={post.createdAt.toDateString()}
          className="block text-sm text-muted-foreground"
        >
          Published on {formatDate(post.createdAt.toDateString())}
        </time>

        <h1 className="mt-2 inline-block font-bold text-4xl leading-snug lg:text-5xl">
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
        <AspectRatio ratio={16 / 9} className="bg-muted my-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
      )}

      <hr className="my-8" />

      <article className="prose prose-stone dark:prose-invert ">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>

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
