import PostCardSkeleton from "@/components/post-card-skeleton";

const LoadingPage = () => {
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-bold text-4xl tracking-tight lg:text-5xl">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            Exploring Ideas, Thoughts, and Stories
          </p>
        </div>
      </div>
      <hr className="my-8" />

      <div className="grid gap-10 sm:grid-cols-2">
        <PostCardSkeleton />
        <PostCardSkeleton />
      </div>
    </div>
  );
};
export default LoadingPage;
