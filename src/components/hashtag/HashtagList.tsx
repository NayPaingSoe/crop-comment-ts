import { useFeebackItemsStore } from "../../stores/feedbackItemsStore";
import HashtagItem from "./HashtagItem";

export default function HashtagList() {
  const companyLists = useFeebackItemsStore((state) => state.getCompanyLists());
  const selectCompany = useFeebackItemsStore((state) => state.selectCompany);
  return (
    <ul className="hashtags">
      {companyLists.map((company) => (
        <HashtagItem company={company} handleSelectCompany={selectCompany} />
      ))}
    </ul>
  );
}
