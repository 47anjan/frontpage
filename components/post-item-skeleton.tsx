import { Skeleton } from "./ui/skeleton";

const PostItemSkeleton = () => {
  return (
    <div className="p-4 flex items-center justify-between">
      <div className="gap-1 flex flex-col">
        <Skeleton className="h-6 w-[400px]" />
        <Skeleton className="h-5 w-[150px]" />
      </div>
      <Skeleton className="h-10 w-[54px]" />
    </div>
  );
};
export default PostItemSkeleton;
