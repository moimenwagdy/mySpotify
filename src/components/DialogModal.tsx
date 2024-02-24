import React, { ReactNode, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const DialogModal: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    modalRef.current?.showModal();
  });
  return (
    <motion.dialog
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      ref={modalRef}
      className="w-80 h-60 bg-transparent z-[40] backdrop:bg-white/50">
      {children}
    </motion.dialog>
  );
};

export default DialogModal;
