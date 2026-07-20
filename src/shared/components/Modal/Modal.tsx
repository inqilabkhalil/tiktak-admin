import { Modal as AntModal } from "antd";
import type { ModalProps as AntModalProps } from "antd";

export type ModalProps = AntModalProps;

export const Modal = (props: ModalProps) => <AntModal {...props} />;
