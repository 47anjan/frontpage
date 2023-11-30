import { Post } from "@prisma/client";
import Link from "next/link";
import UnSave from "./unsave";

type Bookmark = Pick<Post, "slug" | "title"> & { id: string };
interface Props {
  bookmark: Bookmark;
}

const BookmarkItem = ({ bookmark }: Props) => {
  return (
    <article className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <div className="flex gap-2 items-center">
          <Link
            href={`/blog/${bookmark.slug}`}
            className="font-semibold hover:underline"
          >
            {bookmark.title}
          </Link>
        </div>
      </div>
      <div>
        <UnSave bookmarkId={bookmark.id} />
      </div>
    </article>
  );
};
export default BookmarkItem;
