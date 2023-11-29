"use client";
import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  postSlug: string;
}

const UnSave = ({ postSlug }: Props) => {
  return (
    <Button
      onClick={() => console.log(postSlug)}
      title="Unsave"
      className="gap-4"
      variant="outline"
    >
      Saved
      <Bookmark fill="white" size={18} />
    </Button>
  );
};
export default UnSave;
