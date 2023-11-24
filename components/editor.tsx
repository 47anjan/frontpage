"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { postPatchSchema } from "@/lib/validations/post";
import "@/styles/editor.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post } from "@prisma/client";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { ArrowLeft, Loader2 } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import TextareaAutosize from "react-textarea-autosize";
import slugify from "slugify";
import * as z from "zod";
import { AspectRatio } from "./ui/aspect-ratio";
import { toast } from "./ui/use-toast";
type FormData = z.infer<typeof postPatchSchema>;

interface CldResult {
  url: string;
}

interface EditorProps {
  post: Pick<Post, "id" | "title" | "content" | "published" | "image">;
}

function Editor({ post }: EditorProps) {
  const { register, handleSubmit, watch, setValue, control } =
    useForm<FormData>({
      resolver: zodResolver(postPatchSchema),
      defaultValues: {
        image: post.image || "",
        content: post.content || "",
      },
    });

  const router = useRouter();
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  const data = watch();

  async function onSubmit(data: FormData) {
    try {
      setIsSaving(true);

      const slug = slugify(data.title!!, {
        replacement: "-",
        lower: true,
        trim: true,
      });

      const newPost = {
        title: data.title,
        content: data.content,
        image: data.image,
        slug: `${slug}-${post.id}`,
      };
      await axios.patch(`/api/posts/${post.id}`, newPost);
      setIsSaving(false);
      router.refresh();
      toast({
        description: "Your post has been saved.",
      });
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Your post was not saved. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <div
              onClick={() => {
                router.push("/dashboard/posts");
                router.refresh();
              }}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "cursor-pointer"
              )}
            >
              <ArrowLeft className="mr-2" size={18} />
              Back
            </div>
            <p className="text-sm text-muted-foreground">
              {post?.published ? "Published" : "Draft"}
            </p>
          </div>
          <button
            disabled={isSaving}
            type="submit"
            className={cn(buttonVariants())}
          >
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <span>Save</span>
          </button>
        </div>

        <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert relative">
          {post.image && (
            <AspectRatio ratio={16 / 9} className="">
              <Image
                src={post.image || ""}
                alt="Cover Photo"
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          )}

          {!post.image && data.image && (
            <AspectRatio ratio={16 / 9} className="">
              <Image
                src={data.image || ""}
                alt="Cover Photo"
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          )}

          <div className="flex flex-col gap-2 mb-8 mt-10">
            <CldUploadWidget
              onUpload={(result, widget) => {
                const image = result.info as CldResult;
                setValue("image", image.url);
              }}
              uploadPreset="pzqeksrv"
            >
              {({ open }) => (
                <Button
                  onClick={() => open()}
                  variant="outline"
                  size="sm"
                  type="button"
                >
                  Upload Blog Cover
                </Button>
              )}
            </CldUploadWidget>
          </div>

          <TextareaAutosize
            autoFocus
            id="title"
            defaultValue={post?.title}
            placeholder="Post title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none mb-4"
            {...register("title")}
          />

          <Controller
            name="content"
            control={control}
            defaultValue={post.content}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
            )}
          />
        </div>
      </div>
    </form>
  );
}

export default Editor;
