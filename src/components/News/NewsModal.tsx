import style from "./NewsModal.module.scss";
import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  hasCloseBtn?: boolean;
  onClose?: (article?: any) => void;
  children: React.ReactNode;
}

const NewsModal = ({ isOpen, hasCloseBtn, onClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isOpen]);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  return (
    <dialog ref={modalRef} className={style.modal} onKeyDown={handleKeyDown}>
      {hasCloseBtn && (
        <button className={style.modal_close_btn} onClick={onClose}>
          Close
        </button>
      )}
      {children}
    </dialog>
  );
};

export default NewsModal;
