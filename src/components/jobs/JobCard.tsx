import { FC, SyntheticEvent, useState } from "react";
import { useGetRecruiters } from "../../hooks/recruiterHooks";
import { ActionButton } from "@bka-stuff/mfe-utils";

type JobCardProps = {
  job: Obj;
  onClickDelete: (id: string, name: string) => void;
  onClickEdit: (job: Obj) => void;
}

const JobCard: FC<JobCardProps> = ({ job, onClickDelete, onClickEdit }) => {
  const [expanded, setExpanded] = useState(false);
  const { data: recruiters } = useGetRecruiters();
  const recruiter = recruiters?.find((r: Obj) => r.id === job.recruiter);

  function deleteJob() {
    console.log('job.id in deleteJob:::', job.id);
    onClickDelete(job.id, job.jobTitle);
  }

  function editJob() {
    console.log('job.id from editJob:::', job.id);
    onClickEdit(job);
  }

  function whatTheFuck(bool: boolean) {
    console.log('bool from whatTheFuck:::', bool);
    setExpanded(bool);
  }

  return (
    <div className="job-card">
      {expanded
        ? (
          <div className="--expansion-btn--expanded">
            <ActionButton
              iconClass="fas fa-caret-down"
              color="blue"
              onClick={() => whatTheFuck(false)}
            />
          </div>
        ) : (
          <div className="--expansion-btn">
            <ActionButton
              iconClass="fas fa-caret-right"
              color="blue"
              onClick={() => whatTheFuck(true)}
            />
          </div>
        )}

      <div className="--first-line">
        <h2>title: <span>{job.jobTitle}</span></h2>
        <p>company: <span>{job.companyName}</span></p>

        <div className="--actions">
          <ActionButton
            iconClass="fas fa-edit"
            color="blue"
            onClick={() => editJob()}
          />
          <ActionButton
            color="red"
            iconClass="fas fa-trash"
            onClick={() => deleteJob()}
          />
        </div>
      </div>

      <div className="--second-line">
        <p>recruiter: <span>{recruiter?.name}</span></p>
        <p>date applied: <span>{job.dateApplied}</span></p>
      </div>
    </div >
  );
};

export default JobCard;
