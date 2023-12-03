export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/posts", "/dashboard/bookmarks", "/editor/:id+"],
};
