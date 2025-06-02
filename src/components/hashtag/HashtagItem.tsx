type HashtagItemProps = {
  company: string;
  handleSelectCompany: (company: string) => void;
};
export default function HashtagItem({
  company,
  handleSelectCompany,
}: HashtagItemProps) {
  return (
    <li onClick={() => handleSelectCompany(company)} key={company}>
      <button>#{company}</button>
    </li>
  );
}
 