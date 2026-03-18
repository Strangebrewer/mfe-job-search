import { FC, useState } from "react";
import { useDeleteJob, useGetJobs } from "../../hooks/jobHooks";
import { ActionButton, Modal } from "@bka-stuff/mfe-utils";
import "./styles.css";
import JobModal from "./JobCreateModal";
import JobCard from "./JobCard";
import DeleteConfirmationModal from "../shared/DeleteConfirmationModal";

const JobsList: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: jobs } = useGetJobs();
  const { mutate: deleteJob } = useDeleteJob();

  const [modalState, setModalState] = useState<Obj>({ type: null, item: null });

  function openDeleteModal(id: string, name: string) {
    setModalState({ type: 'delete', item: { id, name } });
  }

  function openEditModal(job: Obj) {
    setModalState({ type: 'edit', item: job });
  }

  function confirmDelete() {
    deleteJob(modalState.item.id);
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
      <h2>
        Jobs&nbsp;
        <ActionButton
          iconClass="fas fa-plus"
          onClick={() => setIsOpen(true)}
        />
      </h2>
      {jobs?.map((j: any) => {
        return (
          <JobCard key={j.id} job={j} onClickDelete={openDeleteModal} onClickEdit={openEditModal} />
        );
      })}
      <JobModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default JobsList;
