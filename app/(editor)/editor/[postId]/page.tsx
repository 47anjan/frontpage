import authOptions from "@/app/auth/authOptions";
import Editor from "@/components/editor";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";

interface Params {
  params: { postId: string };
}

const fetchPost = cache((postId: string) =>
  prisma.post.findUnique({ where: { id: postId } })
);

const EditorPage = async ({ params: { postId } }: Params) => {
  const post = await fetchPost(postId);

  if (!post) notFound();

  return (
    <Editor
      post={{
        id: post.id,
        title: post.title,
        content: post.content,
        published: post.published,
      }}
    />
  );
};
export default EditorPage;
