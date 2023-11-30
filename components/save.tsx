"use client";

import { Bookmark, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "./ui/use-toast";
import axios from "axios";

interface Props {
  postSlug: string;
}

const Save = ({ postSlug }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/saves", {
        postSlug,
      });

      router.refresh();
      toast({
        title: "Successfully save your post",
        variant: "default",
      });
    } catch (error) {
      console.log(error);

      setIsLoading(false);
      toast({
        title: "Something went wrong.",
        description: "Your post was not saved. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      title="Save"
      onClick={handleSave}
      className="gap-4"
      variant="outline"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          Saving
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </>
      ) : (
        <>
          Save
          <Bookmark size={18} />
        </>
      )}
    </Button>
  );
};
export default Save;
