import ErrorMessage from "../ErrorMessage";
import Spinner from "../Spinner";
import FeedbackItem from "./FeedbackItem";
import { useFeebackItemsStore } from "../../stores/feedbackItemsStore";

export default function FeedbackList() {
  const filteredFeedbackItems = useFeebackItemsStore(
    (state) => state.getFilteredFeedbackItems()
  );
  const isLoading = useFeebackItemsStore((state) => state.isLoading);
  const errorMessage = useFeebackItemsStore((state) => state.errorMessage);
  //template
  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {filteredFeedbackItems.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}
