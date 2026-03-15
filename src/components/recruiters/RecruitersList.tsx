import { FC, useState } from "react";
import { useGetRecruiters } from "../../hooks/recruiterHooks";
import { ActionButton } from "@bka-stuff/mfe-utils";
import "./styles.css";
import RecruiterModal from "./RecruiterModal";

const RecruitersList: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: recruiters } = useGetRecruiters();

  return (
    <div className="recruiters-container">
      <h2>
        Recruiters&nbsp;
        <ActionButton
          iconClass="fas fa-plus"
          onClick={() => setIsOpen(true)}
        />
      </h2>
      {recruiters?.map((r: any) => {
        return (
          <div key={r.id}>
            <h3>{r.name}</h3>
          </div>
        );
      })}
      <RecruiterModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default RecruitersList;
