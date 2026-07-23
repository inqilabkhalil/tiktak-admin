import type { FilterDropdownProps } from "antd/es/table/interface";
import styles from "../styles/productsTable.module.css";
import { Space } from "antd";
import type { Key } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";

const useColumnSearchProps = <T,>() => {
  const getColumnSearchProps = (
    dataIndex: keyof T,
    placeholder: string,
    getValue: (record: T) => string = (record) => String(record[dataIndex] ?? ""),
  ) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps) => (
      <div
        className={styles.filterDropdown}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          placeholder={`Axtar: ${placeholder}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          className={styles.filterInput}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            className={styles.filterButton}
          >
            Axtar
          </Button>
          <Button
            onClick={() => {
              clearFilters?.();
              confirm();
            }}
            size="small"
            className={styles.filterButton}
          >
            Sıfırla
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined className={filtered ? styles.filterIconActive : ""} />
    ),
    onFilter: (value: boolean | Key, record: T) =>
      getValue(record).toLowerCase().includes(String(value).toLowerCase()),
  });
  return { getColumnSearchProps };
};

export default useColumnSearchProps;
