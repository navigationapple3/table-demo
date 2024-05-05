"use client"
import React, { useEffect, useState } from 'react';
import { Table, Space, Typography, Rate, Popconfirm, Form, Input, Tag, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { addProduct, deleteProduct, fetchProduct, updateProduct } from './service';
import { ActionTypes, ProductInfo } from './types';
import EditableCell from './EditableCell';
import { DEFAULT_PAGE, DEFAULT_SIZE, DEFAULT_SIZE_OPTION } from './constant';
import ColumnDrawer from './ColumnDrawer';
import { v4 } from 'uuid';
import ImageUploader from './ImageUploader';
import { supabase } from '@/app/db/supabase';

const { Search } = Input;

const TablePage: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { dataset, total, loading, addOnColumns, searchText } = useSelector((state: RootState) => state.table);
  const [current, setCurrent] = useState(DEFAULT_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_SIZE);
  const [editingKey, setEditingKey] = useState<string>('');

  const isEditing = (record: ProductInfo) => record.id === editingKey;

  // useEffect(() => {
  //   localStorage.setItem('table_add_on_columns', JSON.stringify(addOnColumns));
  // }, [addOnColumns]);

  useEffect(() => {
    const channel = supabase.channel("table_db_changes").on(
      "postgres_changes",
      {
        event: "*",
        shema: 'public',
        table: "products",
      },
      (payload) => {
        const { eventType, commit_timestamp, table } = payload;

        notification.success({
          message: `This message is from supabase realtime channel:`,
          description: `${eventType} Event on Table ${table} at ${commit_timestamp}`,
        })
      },
    );

    channel.subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [supabase]);

  const onEdit = (record: ProductInfo) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  const onCancel = () => {
    setEditingKey('');
  };

  const handleSearch = (value: string) => {
    dispatch({
      type: ActionTypes.SET_SEARCH_TEXT,
      payload: value,
    });

    fetchProduct(dispatch, DEFAULT_PAGE, pageSize, value);
  };

  const onSave = async (row: ProductInfo) => {
    const { title } = (await form.validateFields()) as ProductInfo;

    const id = row.id;

    await updateProduct(id, title);

    onCancel();

    await fetchProduct(dispatch, current, pageSize, searchText);
  };

  const handleAddNewColumn = () => {
    dispatch({
      type: ActionTypes.OPEN_DRAWER,
    });
  };

  const handlePageSizeChange = (current: number, size: number) => {
    setCurrent(current);
    setPageSize(size);
  };

  useEffect(() => {
    fetchProduct(dispatch, current, pageSize, searchText);
  }, [dispatch, current, pageSize]);

  const handleAddData = async () => {
    await addProduct({ ...dataset[0], id: v4(), asin: `${dataset[0].asin}-${v4()}` });
    await fetchProduct(dispatch, current, pageSize, searchText);
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
      editable: true,
    },
    {
      key: "imgUrl",
      title: "Image",
      dataIndex: "imgUrl",
      width: 150,
      render: (_: string, record: ProductInfo) => {
        return <ImageUploader record={record} />
      }
    },
    {
      key: "boughtInLastMonth",
      title: "Bought In Last Month",
      dataIndex: "boughtInLastMonth",
      width: 150,
      sorter: (a: ProductInfo, b: ProductInfo) => a.boughtInLastMonth - b.boughtInLastMonth,
    },
    {
      key: "listPrice",
      title: "List Price",
      dataIndex: "listPrice",
      width: 150,
      sorter: (a: ProductInfo, b: ProductInfo) => a.listPrice - b.listPrice,
    },
    {
      key: "price",
      title: "Price",
      dataIndex: "price",
      width: 150,
      sorter: (a: ProductInfo, b: ProductInfo) => a.price - b.price,
    },
    {
      key: "productURL",
      title: "Product URL",
      dataIndex: "productURL",
      width: 150,
      render: (value: string, record: ProductInfo) => {
        if (!record.id) {
          return <></>;
        }

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
      render: (value: number, record: ProductInfo) => {
        if (!record.id) {
          return <></>;
        }

        return <Rate value={value} />
      },
      sorter: (a: ProductInfo, b: ProductInfo) => a.stars - b.stars,
    },
    {
      key: "created_at",
      title: "Created At",
      width: 150,
      dataIndex: "created_at",
      render: (value: string, record: ProductInfo) => {
        if (!record.id) {
          return <></>;
        }

        return new Date(value).toLocaleDateString();
      }
    },
    ...addOnColumns,
    {
      title: "Action",
      key: "action",
      fixed: 'right',
      width: 200,
      render: (_: any, record: ProductInfo) => {
        if (!record.id) {
          return <></>;
        }

        const editable = isEditing(record);

        return (
          <Space size="middle">
            {
              editable ?
                (
                  <>
                    <Typography.Link onClick={() => onSave(record)} style={{ marginRight: 8 }}>
                      Save
                    </Typography.Link>
                    <Typography.Link onClick={() => onCancel()} style={{ marginRight: 8 }}>
                      Cancel
                    </Typography.Link>
                  </>
                ) :
                <>
                  <Typography.Link onClick={() => onEdit(record)} style={{ marginRight: 8 }}>
                    Edit
                  </Typography.Link>
                  <Popconfirm
                    title="Delete"
                    description="Are you sure to delete this row?"
                    onConfirm={async () => {
                      await deleteProduct(record.id);
                      await fetchProduct(dispatch, current, pageSize, searchText);
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Typography.Link>
                      Delete
                    </Typography.Link>
                  </Popconfirm>
                </>
            }
          </Space>
        )
      }
    },
    {
      title: <span style={{ cursor: "pointer" }} onClick={handleAddNewColumn}>New Column</span>,
      width: 150,
      fixed: 'right',
    },
  ];

  const mergedColumns = DefaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: ProductInfo) => ({
        dataIndex: col.dataIndex,
        title: col.title,
        record,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Search
        placeholder="Search ASIN or Title"
        onSearch={handleSearch}
        className="mb-12"
        style={{
          width: 400
        }}
      />
      <Table
        columns={mergedColumns}
        dataSource={[
          { asin: <Tag className="cursor-pointer" color="success" onClick={handleAddData}>Duplicate First Row</Tag> },
          ...dataset,
        ]}
        bordered
        rowKey="id"
        size="small"
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        pagination={{
          current,
          pageSize,
          onChange: handlePageSizeChange,
          total,
          pageSizeOptions: DEFAULT_SIZE_OPTION,
        }}
        scroll={{ y: 600 }}
        loading={loading}
      />
      <ColumnDrawer />
    </Form>
  );
};

export default TablePage;
