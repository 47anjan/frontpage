import { Post } from "@prisma/client";
import { PostItem } from "./post-item";

interface Props {
  posts: Post[];
}

const Posts = ({ posts }: Props) => {
  return (
    <section className="divide-y divide-border rounded-md border">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </section>
  );
};
export default Posts;
