import { createContext, useEffect, useMemo, useState } from "react";
import type { TFeedbackItem } from "../lib/types";

type TFeedbackItemsContext = {
  isLoading: boolean;
  errorMessage: string;
  companyLists: string[];
  filteredFeedbackItems: TFeedbackItem[],
  handleAddToList: (text: string) => void;
  handleSelectCompany:(text:string)=> void
};

export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(
  null
);

export default function FeedbackItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  //data
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const companyLists = useMemo(
    () =>
      feedbackItems
        .map((feedbackItem) => feedbackItem.companyName)
        .filter((company, index, array) => {
          return array.indexOf(company) === index;
        }),
    [feedbackItems]
  );
  const filteredFeedbackItems = useMemo(
    () =>
      selectedCompany
        ? feedbackItems.filter((item) => item.companyName === selectedCompany)
        : feedbackItems,
    [selectedCompany, feedbackItems]
  );
  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company);
  };

  //methods
  const handleAddToList = async (text: string) => {
    const companyName = text
      .split(" ")
      .find((word) => word.includes("#"))
      ?.substring(1);
    const newFeedback: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      companyName: companyName!,
      badgeLetter: companyName!.substring(0, 1).toUpperCase(),
    };
    setFeedbackItems([...feedbackItems, newFeedback]);
    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        body: JSON.stringify(feedbackItems),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchFeedbackItems = async () => {
      try {
        const response = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );
        if (!response.ok) {
          throw new Error("Something went wrong. Please try again later.");
        }
        const data = await response.json();
        setFeedbackItems(data.feedbacks);
      } catch (error) {
        console.log(error);
        setErrorMessage("Something went wrong. Please try again later.");
      }
      setIsLoading(false);
    };

    fetchFeedbackItems();
  }, []);

  return (
    <FeedbackItemsContext.Provider
      value={{
        isLoading,
        errorMessage,
        companyLists,
        filteredFeedbackItems,
        handleAddToList,
        handleSelectCompany
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  );
}
