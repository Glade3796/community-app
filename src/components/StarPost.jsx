import { StarPostServerAction } from "@/_lib/star_action";
import { StarBtn } from "./Buttons";

export default function StarPost({ postId, userId }) {
  return (
    <div>
      <form action={StarPostServerAction}>
        <input type="text" name="postId" value={postId} hidden readonly />
        <input type="text" name="userId" value={userId} hidden readonly />
        <StarBtn label="⭐"></StarBtn>
      </form>
    </div>
  );
}
