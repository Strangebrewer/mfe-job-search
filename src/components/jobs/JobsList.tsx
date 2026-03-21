import { FC, useState } from "react";
import { ActionButton } from "@bka-stuff/mfe-utils";
import { useDeleteJob, useGetJobs, useUpdateJob } from "../../hooks/jobHooks";
import JobModal from "./JobCreateModal";
import DeleteConfirmationModal from "../shared/DeleteConfirmationModal";
import JobRow from "./JobRow";
import "./styles.css";

const JobsList: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalState, setModalState] = useState<Obj>({ type: null, item: null });

  const { data: jobs } = useGetJobs();
  const { mutate: deleteJob } = useDeleteJob();
  const { mutate: updateJob } = useUpdateJob();


  function openDeleteModal(id: string, name: string) {
    setModalState({ type: 'delete', item: { id, name } });
  }

  function openArchiveModal(id: string, name: string) {
    setModalState({ type: 'archive', item: { id, name } });
  }

  function confirmDelete() {
    deleteJob(modalState.item.id);
    setModalState({ type: null, item: null });
  }

  function confirmArchive() {
    updateJob({ id: modalState.item.id, archived: true });
    setModalState({ type: null, item: null });
  }

  return (
    <div className="jobs-container">
      <DeleteConfirmationModal
        isOpen={modalState.type === 'delete'}
        item={modalState.item}
        onConfirm={confirmDelete}
        onClose={() => setModalState({ type: null, item: null })}
      />
      <DeleteConfirmationModal
        action="archive"
        isOpen={modalState.type === 'archive'}
        item={modalState.item}
        onConfirm={confirmArchive}
        onClose={() => setModalState({ type: null, item: null })}
      />
      <h2>
        Jobs&nbsp;
        <ActionButton
          iconClass="fas fa-plus"
          onClick={() => setIsOpen(true)}
        />
      </h2>
      <div className="jobs-grid">
        <div className="jobs-grid-header">
          <div></div>
          <div>Job Title</div>
          <div>Company</div>
          <div>Date Applied</div>
          <div>Recruiter</div>
          <div>Work From</div>
          <div>Status</div>
          <div></div>
        </div>
        {jobs?.map((j: any) => (
          <JobRow key={j.id} job={j} onClickDelete={openDeleteModal} onClickArchive={openArchiveModal} />
        ))}
      </div>
      <JobModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default JobsList;
