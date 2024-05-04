"use client"
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { fetchProduct } from './service';

const TablePage: React.FC = () => {
  const dispatch = useDispatch();
  const { dataset, total, loading } = useSelector((state: RootState) => state.table);

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const handleAddNewColumn = () => {

  };

  const DefaultColumns = [
    {
      key: "asin",
      title: "ASIN",
      dataIndex: "asin",
      fixed: 'left',
      width: 150,
    },
    {
      key: "title",
      title: "Title",
      dataIndex: "title",
      width: 500,
    },
    {
      key: "imgUrl",
      title: "Image",
      dataIndex: "imgUrl",
      width: 150,
      render: (value: string) => {
        return <img width={100} src={value} alt={value} />
      }
    },
    {
      key: "boughtInLastMonth",
      title: "Bought In Last Month",
      dataIndex: "boughtInLastMonth",
      width: 150,
    },
    {
      key: "listPrice",
      title: "List Price",
      dataIndex: "listPrice",
      width: 150,
    },
    {
      key: "price",
      title: "Price",
      dataIndex: "price",
      width: 150,
    },
    {
      key: "productURL",
      title: "Product URL",
      dataIndex: "productURL",
      width: 150,
      render: (value: string) => {
        return <a href={value}>{value}</a>
      }
    },
    {
      key: "reviews",
      title: "Reviews",
      dataIndex: "reviews",
      width: 150,
    },
    {
      key: "stars",
      title: "Stars",
      dataIndex: "stars",
      width: 150,
    },
    {
      key: "created_at",
      title: "Created At",
      width: 150,
      dataIndex: "created_at",
      render: (value: string) => {
        return new Date(value).toLocaleDateString();
      }
    },
    {
      title: <span style={{ cursor: "pointer" }} onClick={handleAddNewColumn}>New Column</span>,
      width: 150,
      fixed: 'right',
    },
  ];

  const handlePageSizeChange = (current: number, size: number) => {
    setCurrent(current);
    setPageSize(size);
  };

  useEffect(() => {
    fetchProduct(dispatch, current, pageSize);
  }, [dispatch, current, pageSize]);

  return (
    <Table
      columns={DefaultColumns}
      dataSource={dataset}
      rowKey="id"
      size="small"
      pagination={{
        current,
        pageSize,
        onChange: handlePageSizeChange,
        total,
        pageSizeOptions: [10, 50, 100, 1000],
      }}
      scroll={{ y: 600 }}
      loading={loading}
    />
  );
};

export default TablePage;
