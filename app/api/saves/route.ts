import authOptions from "@/app/auth/authOptions";
import { postCreateSchema } from "@/lib/validations/post";
import { saveCreateSchema } from "@/lib/validations/save";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json("Unauthorized", { status: 403 });
  }

  const body = await request.json();
  const validation = saveCreateSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const post = await prisma.post.findFirst({
    where: { slug: body.postSlug },
  });

  if (!post)
    return NextResponse.json({ error: "Invalid post" }, { status: 404 });

  const save = await prisma.save.create({
    data: {
      postSlug: body.postSlug,
      userEmail: session.user?.email!!,
    },
  });

  return NextResponse.json(save, { status: 201 });
}
