import { create } from "zustand";
import type { TFeedbackItem } from "../lib/types";

type Store = {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  selectedCompany: string;
  getCompanyLists: () => string[];
  getFilteredFeedbackItems: () => TFeedbackItem[];
  addToList: (text: string) => Promise<void>;
  selectCompany: (text: string) => void;
  fetchFeedbackItems: () => Promise<void>;
};
export const useFeebackItemsStore = create<Store>((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  errorMessage: "",
  selectedCompany: "",
  getCompanyLists: () => {
    return get()
      .feedbackItems.map(
        (feedbackItem: TFeedbackItem) => feedbackItem.companyName
      )
      .filter((company, index, array) => {
        return array.indexOf(company) === index;
      });
  },
  getFilteredFeedbackItems: () => {
    const state = get();
    return state.selectedCompany
      ? state.feedbackItems.filter(
          (item) => item.companyName === state.selectedCompany
        )
      : state.feedbackItems;
  },
  addToList: async (text: string) => {
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
    set((state) => ({ feedbackItems: [...state.feedbackItems, newFeedback] }));
    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        body: JSON.stringify(newFeedback),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  },
  selectCompany: (company: string) => {
    set(() => ({
      selectedCompany: company,
    }));
  },
  fetchFeedbackItems: async () => {
    set(() => ({
      isLoading: true,
    }));
    try {
      const response = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );
      if (!response.ok) {
        throw new Error("Something went wrong. Please try again later.");
      }
      const data = await response.json();
      set(() => ({
        feedbackItems: data.feedbacks,
      }));
    } catch (error) {
      console.log(error)
      set(() => ({
        errorMessage: "Something went wrong. Please try again later",
      }));
    }
    set(() => ({
      isLoading: false,
    }));
  },
}));
