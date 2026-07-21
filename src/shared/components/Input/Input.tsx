import { Input as AntInput, type InputProps } from 'antd';

interface CustomInputProps extends InputProps {
  isPassword?: boolean;
}

export const Input = ({ isPassword, ...props }: CustomInputProps) => {
  if (isPassword) {
    return <AntInput.Password {...props} />;
  }

  return <AntInput {...props} />;
};
