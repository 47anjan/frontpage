import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(
  response: NextResponse,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const save = await prisma.save.findUnique({
    where: { id: params.id },
  });

  if (!save)
    return NextResponse.json({ error: "Invalid post" }, { status: 404 });

  const result = await prisma.save.delete({
    where: { id: params.id },
  });

  return NextResponse.json(result, { status: 201 });
}
