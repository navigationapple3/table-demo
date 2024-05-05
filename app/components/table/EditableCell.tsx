import React from 'react';
import { Input, Form } from 'antd';
import { ProductInfo } from './types';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: 'number' | 'text';
  record: ProductInfo;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = (props) => {
  const { dataIndex, editing, children, title } = props;

  return (
    <td {...props}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
