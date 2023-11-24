"use client";

import Link from "next/link";
import Profile from "./profile";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";

const Navbar = () => {
  const { status } = useSession();

  const path = usePathname();

  return (
    <header className="sticky top-0 z-[999999] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="mr-4 flex items-center">
          <Link className="mr-6 flex items-center space-x-2 mb-1" href="/">
            <span className=" font-bold inline-block">frontpage</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              className={cn(
                "transition-colors hover:text-foreground/80 text-foreground/60",
                path === "/blog" ? "text-foreground" : "text-foreground/60"
              )}
              href="/blog"
            >
              Blog
            </Link>
          </nav>
        </div>
        <div>
          {status === "unauthenticated" && (
            <Button size="sm">
              <Link
                href="/api/auth/signin"
                className={cn(buttonVariants({ size: "sm" }))}
              >
                SignIn
              </Link>
            </Button>
          )}
          {status === "loading" && <Skeleton className="h-9 w-16 rounded-md" />}

          {status === "authenticated" && <Profile />}
        </div>
      </div>
    </header>
  );
};
export default Navbar;
