import { FC, SyntheticEvent, useState } from "react";
import { Modal, Button, Label, Input, useUserStore } from "@bka-stuff/mfe-utils";
import { useCreateJob } from "../../hooks/jobHooks";
import { useGetRecruiters } from "../../hooks/recruiterHooks";

type JobModalProps = {
  isOpen: boolean;
  onClose: () => void;
}

const JobModal: FC<JobModalProps> = ({ isOpen, onClose }) => {
  const [jobTitle, setJobTitle] = useState('');
  const { data: recruiters } = useGetRecruiters();

  const { mutate: createJob } = useCreateJob();

  function closeModal() {
    onClose();
  }

  function submit(e?: SyntheticEvent) {
    e?.preventDefault();
    console.log(`submit this sumbitch`);
    if (jobTitle) {
      // createJob({ jobTitle });
    }
  }

  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <div className="job-modal-body">
        <form onSubmit={submit}>
          <div>
            <Label text="job title" />
            <Input
              type="text"
              name="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="tw:block">job title</label>
            <select name="recruiter">
              {recruiters?.map((r: any) => {
                return <option key={r.id} value={r.id}>{r.name}</option>
              })}
            </select>
          </div>

          <div>
            <button type="submit" style={{ display: 'none' }} />
            <Button variant="red" text="Cancel" onClick={closeModal} />
            <Button
              variant="blue"
              text="Save"
              onClick={submit}
              disabled={!jobTitle}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default JobModal;
