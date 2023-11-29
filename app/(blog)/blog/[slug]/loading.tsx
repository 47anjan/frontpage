import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingPost = () => {
  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <div className="absolute left-[-200px] top-14 hidden xl:flex flex-col gap-2">
        <Skeleton className="w-[141px] h-10 rounded-md" />
        <Skeleton className=" w-[141px] h-10 rounded-md" />
      </div>

      <div>
        <Skeleton className="w-60 h-5" />

        <div className="mt-2 flex flex-col gap-2 ">
          <Skeleton className="h-6 md:h-8 w-full" />
          <Skeleton className="h-6 md:h-8 w-1/3" />
        </div>

        <div className="mt-4 flex space-x-4">
          <Skeleton className="h-[42px] w-[42px] rounded-full" />

          <div className="flex-1 flex flex-col gap-1 text-left leading-tight">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-[15px] w-40" />
          </div>
        </div>
      </div>

      <AspectRatio ratio={16 / 9} className="bg-muted my-8">
        <Skeleton className="w-full h-full" />
      </AspectRatio>

      <hr className="my-8" />
    </article>
  );
};
export default LoadingPost;
