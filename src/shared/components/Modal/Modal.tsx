import { Modal as AntModal } from "antd";
import type { ModalProps as AntModalProps } from "antd";
import { motion } from "framer-motion";

export type ModalProps = AntModalProps;

export const Modal = ({ modalRender, ...props }: ModalProps) => (
  <AntModal
    transitionName=""
    modalRender={(node) => (
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: -16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {modalRender ? modalRender(node) : node}
      </motion.div>
    )}
    {...props}
  />
);
