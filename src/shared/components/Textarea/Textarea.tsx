import { Input as AntInput } from 'antd';
import type { TextAreaProps } from 'antd/es/input';

export const Textarea = (props: TextAreaProps) => {
  return <AntInput.TextArea {...props} />;
};
