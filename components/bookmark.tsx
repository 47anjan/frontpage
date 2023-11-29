import prisma from "@/prisma/client";
import Save from "./save";
import UnSave from "./unsave";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
interface Props {
  postId: string;
}
const Bookmark = async ({ postId }: Props) => {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  const comment = await prisma.save.findFirst({
    where: {
      postId: postId,
      userEmail: session?.user?.email!!,
    },
  });

  return <>{comment ? <UnSave postId={postId} /> : <Save postId={postId} />}</>;
};
export default Bookmark;
