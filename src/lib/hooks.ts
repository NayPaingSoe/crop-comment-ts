import { useContext } from "react";
import { FeedbackItemsContext } from "../contexts/FeedbackItemsContextProvider";

export const useFeedbackItemContext = () => {
    const context = useContext(FeedbackItemsContext);
    if(!context) {
        throw new Error ("FeedbackItemsContext not found!");
    }
    return context;
}