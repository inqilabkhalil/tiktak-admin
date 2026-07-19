import { Table as AntTable, type TableProps } from 'antd';

// Bu komponent antd-in Table-ını bükür (wrap edir).
// Generic <T> istifadə olunur ki, Order, Campaign, User kimi
// fərqli data tipləri ilə işləyə bilsin.
//
// Pagination (səhifələmə) default olaraq bu komponentin daxilində
// təyin olunub — hər feature-də təkrar yazmağa ehtiyac yoxdur.
// Sən sadəcə "columns" və "dataSource" prop-larını verirsən,
// qalanını (sıralama, səhifələmə) antd özü həll edir.
export const Table = <T extends object>(props: TableProps<T>) => {
  return (
    <AntTable
      pagination={{
        pageSize: 5,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '50'],
        ...(props.pagination as object),
      }}
      {...props}
    />
  );
};

// İstifadə nümunəsi:
// <Table<Order> columns={columns} dataSource={data} rowKey="id" /> yarat
