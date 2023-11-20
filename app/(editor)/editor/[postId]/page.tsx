import Editor from "@/components/editor";

const EditorPage = () => {
  return (
    <Editor
      post={{
        id: "post.id",
        title: "post.title",
        content: "post.content",
        published: false,
      }}
    />
  );
};
export default EditorPage;
