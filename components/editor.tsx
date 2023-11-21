"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EditorJS from "@editorjs/editorjs";
import { zodResolver } from "@hookform/resolvers/zod";
import "@/styles/editor.css";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import * as z from "zod";
import "@/styles/editor.css";
import { cn } from "@/lib/utils";
import { postPatchSchema } from "@/lib/validations/post";
import { Button, buttonVariants } from "@/components/ui/button";
import { Post } from "@prisma/client";
import { ArrowLeft, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "./ui/use-toast";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

type FormData = z.infer<typeof postPatchSchema>;
import slugify from "slugify";

interface CldResult {
  url: string;
}

interface EditorProps {
  post: Pick<Post, "id" | "title" | "content" | "published" | "image">;
}

function Editor({ post }: EditorProps) {
  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(postPatchSchema),
    defaultValues: {
      image: post.image || "",
    },
  });
  const ref = React.useRef<EditorJS>();
  const router = useRouter();
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    //@ts-ignore
    const Header = (await import("@editorjs/header")).default;
    //@ts-ignore
    const Embed = (await import("@editorjs/embed")).default;
    //@ts-ignore
    const Table = (await import("@editorjs/table")).default;
    //@ts-ignore
    const List = (await import("@editorjs/list")).default;
    //@ts-ignore
    const Code = (await import("@editorjs/code")).default;
    //@ts-ignore
    const LinkTool = (await import("@editorjs/link")).default;
    //@ts-ignore
    const InlineCode = (await import("@editorjs/inline-code")).default;

    const body = postPatchSchema.parse(post);

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: body.content,
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, [post]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  React.useEffect(() => {
    if (isMounted) {
      initializeEditor();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  const data = watch();

  async function onSubmit(data: FormData) {
    try {
      setIsSaving(true);
      const blocks = await ref.current?.save();

      const slug = slugify(data.title!!, {
        replacement: "-",
        lower: true,
        trim: true,
      });

      const newPost = {
        title: data.title,
        content: blocks,
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

  if (!isMounted) {
    return null;
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
              className={cn(buttonVariants({ variant: "ghost" }))}
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
            <Image
              src={post.image || ""}
              alt="Cover Photo"
              width={800}
              height={450}
              loading="lazy"
            />
          )}

          {!post.image && data.image && (
            <Image
              src={data.image || ""}
              alt="Cover Photo"
              width={800}
              height={450}
              loading="lazy"
            />
          )}

          <div className="flex flex-col gap-2 mb-4 ">
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
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            {...register("title")}
          />
          <div id="editor" className="min-h-[500px]" />
          <p className="text-sm text-gray-500">
            Use{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p>
        </div>
      </div>
    </form>
  );
}

export default Editor;
