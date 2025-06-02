import { TriangleUpIcon } from "@radix-ui/react-icons";
import type { TFeedbackItem } from "../../lib/types";
import { useState } from "react";

type feedbackItemProps = {
  feedbackItem: TFeedbackItem;
};

export default function FeedbackItem({ feedbackItem }: feedbackItemProps) {
  const [open, setOpen] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(feedbackItem.upvoteCount);

  const handleUpVote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setUpvoteCount((prev) => ++prev);
    e.currentTarget.disabled = true;
    e.stopPropagation();
  };
  //template
  return (
    <>
      <li
        onClick={() => setOpen((prev) => !prev)}
        className={`feedback ${open ? "feedback--expand" : ""}`}
      >
        <button onClick={handleUpVote}>
          <TriangleUpIcon />
          <span>{upvoteCount}</span>
        </button>
        <div>
          <p>{feedbackItem.badgeLetter}</p>
        </div>
        <div>
          <p>{feedbackItem.companyName}</p>
          <p>{feedbackItem.text}</p>
        </div>
        <p>{feedbackItem.daysAgo === 0 ? "New" : feedbackItem.daysAgo + "d"}</p>
      </li>
    </>
  );
}
