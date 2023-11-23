"use client";
import { Post } from "@prisma/client";
import { PostItem } from "./post-item";
import { useAutoAnimate } from "@formkit/auto-animate/react";
interface Props {
  posts: Post[];
}

const Posts = ({ posts }: Props) => {
  const [animationParent] = useAutoAnimate({
    easing: "ease-in",
  });

  return (
    <section
      ref={animationParent}
      className="divide-y divide-border rounded-md border"
    >
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </section>
  );
};
export default Posts;
