import PostItemSkeleton from "@/components/post-item-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingPage = () => {
  return (
    <section className="w-full max-w-5xl mx-auto p-4 flex flex-col gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="font-bold text-3xl md:text-4xl">Posts</h1>
          <p className="text-lg text-muted-foreground">
            Create and manage posts.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-[95px]" />
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
