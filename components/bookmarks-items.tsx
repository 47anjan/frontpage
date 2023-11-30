import prisma from "@/prisma/client";
import { Save } from "@prisma/client";
import BookmarkItem from "./bookmark-item";

interface Props {
  bookmarks: Save[];
}
const BookmarksItems = async ({ bookmarks }: Props) => {
  const postsId = bookmarks.map((item) => item.postSlug);
  const posts = await prisma.post.findMany({
    where: {
      slug: {
        in: postsId,
      },
    },
  });

  const data = () => {
    const newArray = [];

    for (let i = 0; i < bookmarks.length; i++) {
      const obj = {
        id: bookmarks[i].id,
        title: posts[i].title,
        slug: posts[i].slug,
      };
      newArray.push(obj);
    }
    return newArray;
  };

  const margedPosts = data();

  return (
    <section className="divide-y divide-border rounded-md border">
      {margedPosts.map((bookmark) => (
        <BookmarkItem
          key={bookmark.id}
          bookmark={{
            id: bookmark.id,
            slug: bookmark.slug,
            title: bookmark.title,
          }}
        />
      ))}
    </section>
  );
};
export default BookmarksItems;
