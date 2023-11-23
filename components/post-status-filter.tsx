"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const publishStatuses: { label: string; value?: string }[] = [
  { label: "All" },
  { label: "Published", value: "true" },
  { label: "Draft", value: "false" },
];

const PostStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select
      defaultValue={searchParams.get("published") || undefined}
      onValueChange={(status) => {
        const query = status ? `?published=${status}` : "";
        router.push("/dashboard/posts" + query);
      }}
    >
      <SelectTrigger className="w-28">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {publishStatuses.map((status) => (
          <SelectItem key={status.label} value={status.value!!}>
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
export default PostStatusFilter;
