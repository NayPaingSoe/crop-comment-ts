import { useFeebackItemsStore } from "../../stores/feedbackItemsStore";
import FeedbackForm from "../feedback/FeedbackForm";
import Logo from "../Logo";
import PageHeading from "../PageHeading";
import Pattern from "../Pattern";

export default function Header() {
  const addToList = useFeebackItemsStore((state) => state.addToList);
  //template
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onAddToList={addToList} />
    </header>
  );
}
