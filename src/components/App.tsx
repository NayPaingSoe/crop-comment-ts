import Footer from "./layout/Footer";
import HashtagList from "./hashtag/HashtagList";
import Container from "./layout/Container";
import { useFeebackItemsStore } from "../stores/feedbackItemsStore";
import { useEffect } from "react";

function App() {
  const fetchFeedbackItems = useFeebackItemsStore(
    (state) => state.fetchFeedbackItems
  );
  useEffect(() => {
    fetchFeedbackItems();
  }, [fetchFeedbackItems]);

  return (
    <div className="app">
      <Footer />
      {/* <FeedbackItemsContextProvider> */}
      <Container />
      <HashtagList />
      {/* </FeedbackItemsContextProvider> */}
    </div>
  );
}

export default App;
