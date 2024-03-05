import { ReactNode } from "react";

const SectionResultCard: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <aside className="w-full sm:w-3/4 md:w-3/5 mx-auto p-2 rounded-md  flex flex-col gap-y-2">
      {children}
    </aside>
  );
};

export default SectionResultCard;
