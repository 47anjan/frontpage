import { EmptyPlaceholder } from "@/components/empty-placeholder";

const Bookmarks = () => {
  return (
    <section className="w-full max-w-5xl mx-auto p-4 flex flex-col gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="font-bold text-3xl md:text-4xl">Bookmark</h1>
          <p className="text-lg text-muted-foreground">
            Read your saved post for unlock new knowledge.
          </p>
        </div>
      </div>

      <div>
        <EmptyPlaceholder>
          <EmptyPlaceholder.Title>No saved post</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any saved posts yet.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      </div>
    </section>
  );
};
export default Bookmarks;
