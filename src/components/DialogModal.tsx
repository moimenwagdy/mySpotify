import React, { ReactNode, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useAppDispatch } from "../stateRoot/reduxHooks";
import { exitAction } from "../stateRoot/exitSlice";
import { useNavigate } from "react-router";
import Button from "../uiux/Button";

const DialogModal: React.FC<{
  children: ReactNode;
  path: string;
}> = ({ children, path }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function closeModal() {
    navigate(path);
    // modalRef.current?.close();
  }
  console.log();
  useEffect(() => {
    dispatch(exitAction.notExit());
    modalRef.current?.showModal();
  });

  return (
    <motion.dialog
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      ref={modalRef}
      className="w-80 h-60 bg-red-600 z-[40] backdrop:bg-white/50">
      {children}
      <Button onClick={closeModal} title="Ok" className="bg-lightGreen px-6" />
    </motion.dialog>
  );
};

export default DialogModal;
