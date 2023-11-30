import prisma from "@/prisma/client";
import Save from "./save";
import UnSave from "./unsave";
import { getCurrentUser } from "@/app/auth/sessions";
interface Props {
  postSlug: string;
}
const Bookmark = async ({ postSlug }: Props) => {
  const user = await getCurrentUser();

  if (!user) return null;

  const bookmark = await prisma.save.findFirst({
    where: {
      postSlug: postSlug,
      userEmail: user?.email!!,
    },
  });

  return (
    <>
      {bookmark ? (
        <UnSave bookmarkId={bookmark.id} />
      ) : (
        <Save postSlug={postSlug} />
      )}
    </>
  );
};
export default Bookmark;
