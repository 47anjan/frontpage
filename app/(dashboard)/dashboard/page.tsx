import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { PostCreateButton } from "@/components/post-create-button";

const Dashboard = () => {
  return (
    <section className="w-full max-w-5xl mx-auto p-4 flex flex-col gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="font-bold text-3xl md:text-4xl">Posts</h1>
          <p className="text-lg text-muted-foreground">
            Create and manage posts.
          </p>
        </div>
        <PostCreateButton />
      </div>
      {/* <div className="divide-y divide-border rounded-md border">grgre</div> */}
      <EmptyPlaceholder>
        <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You don&apos;t have any posts yet. Start creating content.
        </EmptyPlaceholder.Description>
        <PostCreateButton variant="outline" />
      </EmptyPlaceholder>
    </section>
  );
};
export default Dashboard;
