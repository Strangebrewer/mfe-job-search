import { FC, useState } from "react";
import { Modal, Button } from "@bka-stuff/mfe-utils";
import { useCreateJob } from "../../hooks/jobHooks";

type JobModalProps = {
  isOpen: boolean;
  onClose: () => void;
}

const JobModal: FC<JobModalProps> = ({ isOpen, onClose }) => {
  const [jobTitle, setJobTitle] = useState('');

  const { mutate: createJob } = useCreateJob();

  function closeModal() {
    onClose();
  }

  function submit() {
    if (jobTitle) {
      // createJob({ jobTitle });
    }
  }

  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <div>
        <form action="">
          <div>
            <label className="tw:block">job title</label>
            <input
              type="text"
              name="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>

          <div>
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
