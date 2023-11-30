"use client";
import { Bookmark, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "./ui/use-toast";
import React from "react";

interface Props {
  bookmarkId: string;
}

const UnSave = ({ bookmarkId }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete("/api/saves/" + bookmarkId);
      router.refresh();
      toast({
        description: "Your post has been unsave.",
      });
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Something went wrong.",
        description: "Your post was not unsave. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleDelete}
      title="Unsave"
      className="gap-4"
      variant="outline"
    >
      {isLoading ? (
        <>
          Unsaving
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </>
      ) : (
        <>
          Saved
          <Bookmark fill="white" size={18} />
        </>
      )}
    </Button>
  );
};
export default UnSave;
