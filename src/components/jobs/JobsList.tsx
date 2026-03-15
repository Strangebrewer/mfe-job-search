import { FC, useState } from "react";
import { useGetJobs } from "../../hooks/jobHooks";
import { ActionButton } from "@bka-stuff/mfe-utils";
import "./styles.css";
import JobModal from "./JobModal";

const JobsList: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: jobs } = useGetJobs();

  return (
    <div className="jobs-container">
      <h2>
        Jobs&nbsp;
        <ActionButton
          iconClass="fas fa-plus"
          onClick={() => setIsOpen(true)}
        />
      </h2>
      {jobs?.map((j: any) => {
        return (
          <div key={j.id}>
            <h3>{j.jobTitle}</h3>
          </div>
        );
      })}
      <JobModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default JobsList;
