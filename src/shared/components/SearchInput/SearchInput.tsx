import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';

export const SearchInput = (props: SearchProps) => {
  return <Input.Search placeholder="Axtarış" allowClear {...props} />;
};
