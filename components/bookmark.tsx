import prisma from "@/prisma/client";
import Save from "./save";
import UnSave from "./unsave";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
interface Props {
  postSlug: string;
}
const Bookmark = async ({ postSlug }: Props) => {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  const comment = await prisma.save.findFirst({
    where: {
      postSlug: postSlug,
      userEmail: session?.user?.email!!,
    },
  });

  return (
    <>
      {comment ? <UnSave postSlug={postSlug} /> : <Save postSlug={postSlug} />}
    </>
  );
};
export default Bookmark;
