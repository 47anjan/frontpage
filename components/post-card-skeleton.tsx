import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const PostCardSkeleton = () => {
  return (
    <Card className={"h-full overflow-hidden"}>
      <CardHeader className="border-b p-0">
        <Skeleton className="w-full h-[221px] " />
      </CardHeader>

      <CardContent className="grid gap-2.5 p-4">
        <CardTitle className="line-clamp-2 leading-snug flex flex-col gap-2">
          <Skeleton className="w-full h-[33px]" />
          <Skeleton className="w-1/2 h-[33px]" />
        </CardTitle>
        <CardDescription className="line-clamp-2">
          <Skeleton className="w-40 h-[20px]" />
        </CardDescription>
      </CardContent>
    </Card>
  );
};
export default PostCardSkeleton;
