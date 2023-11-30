"use client";
import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  bookmarkId: string;
}

const UnSave = ({ bookmarkId }: Props) => {
  const handleDelete = () => {};

  return (
    <Button
      onClick={handleDelete}
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
