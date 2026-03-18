import { FC, useState } from "react";
import { Button, Modal } from "@bka-stuff/mfe-utils";
import "./styles.css";

type DeleteConfirmationModalProps = {
  isOpen: boolean;
  item: Obj;
  onConfirm: () => void;
  onClose: () => void;
}

const DeleteConfirmationModal: FC<DeleteConfirmationModalProps> = ({ isOpen, item, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} close={onClose}>
      <div className="delete-confirmation-modal">
        <p className="tw:mb-[24px]">Are you sure you want to delete {item?.name}?</p>
        <div className="delete-confirmation-modal--buttons">
          <Button variant="grey" text="Cancel" onClick={onClose} />
          <Button
            variant="red"
            text="Delete"
            onClick={onConfirm}
            last
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
