import authOptions from "@/app/auth/authOptions";
import { postPatchSchema } from "@/lib/validations/post";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(
  response: NextResponse,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await response.json();

  const validation = postPatchSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });

  if (!session.user)
    return NextResponse.json({ error: "Invalid user." }, { status: 400 });

  const post = await prisma.post.findUnique({
    where: { id: params.id },
  });

  if (!post)
    return NextResponse.json({ error: "Invalid post" }, { status: 404 });

  const updatedPost = await prisma.post.update({
    where: { id: params.id },

    data: {
      ...body,
    },
  });

  return NextResponse.json(updatedPost);
}

export async function DELETE(
  response: NextResponse,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const post = await prisma.post.findUnique({
    where: { id: params.id },
  });

  if (!post)
    return NextResponse.json({ error: "Invalid post" }, { status: 404 });

  const result = await prisma.post.delete({
    where: { id: params.id },
  });
  return NextResponse.json(result, { status: 201 });
}
