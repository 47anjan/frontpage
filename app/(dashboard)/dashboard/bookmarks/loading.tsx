import PostItemSkeleton from "@/components/post-item-skeleton";

const LoadingPage = () => {
  return (
    <section className="w-full max-w-5xl mx-auto p-4 flex flex-col gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="font-bold text-3xl md:text-4xl">Bookmark</h1>
          <p className="text-lg text-muted-foreground">
            Read your saved post for unlock new knowledge.
          </p>
        </div>
      </div>

      <div>
        <section className="divide-y divide-border rounded-md border">
          <PostItemSkeleton />
          <PostItemSkeleton />
          <PostItemSkeleton />
          <PostItemSkeleton />
          <PostItemSkeleton />
        </section>
      </div>
    </section>
  );
};
export default LoadingPage;
