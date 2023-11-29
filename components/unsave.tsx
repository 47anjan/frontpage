import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  postId: string;
}

const UnSave = ({ postId }: Props) => {
  return (
    <Button title="Unsave" className="gap-4" variant="outline">
      Saved
      <Bookmark fill="white" size={18} />
    </Button>
  );
};
export default UnSave;
