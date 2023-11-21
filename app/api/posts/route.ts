import authOptions from "@/app/auth/authOptions";
import { postCreateSchema } from "@/lib/validations/post";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json("Unauthorized", { status: 403 });
  }

  const body = await request.json();
  const validation = postCreateSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: session.user?.email!!,
    },
    select: {
      id: true,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
