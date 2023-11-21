"use client";
import { Post } from "@prisma/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/menubar";
import { MoreHorizontal } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import Link from "next/link";

interface Props {
  post: Pick<Post, "id" | "title" | "published" | "createdAt">;
}

const PostOperations = ({ post }: Props) => {
  const router = useRouter();

  const status = !post.published ? "Publish" : "Make as draft";
  const message = !post.published ? "published" : "draft";

  const handlePostDelete = async () => {
    try {
      await axios.delete("/api/posts/" + post.id);
      router.refresh();
      toast({
        description: "Your post has been deleted.",
      });
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Your post was not deleted. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePostPublish = async () => {
    try {
      await axios.patch(`/api/posts/${post.id}`, {
        published: !post.published,
      });
      router.refresh();
      toast({
        description: `Your post has been ${message}.`,
      });
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `Your post was not ${message}. Please try again.`,
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <MoreHorizontal size={20} />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={handlePostPublish}>{status}</MenubarItem>
            <MenubarSeparator />
            <MenubarItem asChild>
              <Link href={`/editor/${post.id}`} className="w-full">
                Edit
              </Link>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem asChild>
              <AlertDialogTrigger className="w-full">Delete</AlertDialogTrigger>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your post
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handlePostDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default PostOperations;
