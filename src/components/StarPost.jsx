import { StarPostServerAction } from "@/_lib/star_action";
import { StarBtn } from "./Buttons";

export default function StarPost({ postId, userId, count }) {
  return (
    <div>
      <form action={StarPostServerAction}>
        <input type="text" name="postId" value={postId} hidden readOnly />
        <input type="text" name="userId" value={userId} hidden readOnly />
        <StarBtn label="⭐" count={count}></StarBtn>
      </form>
    </div>
  );
}
