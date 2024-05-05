import React from 'react';
import { Drawer, Input, Button, Row, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { ActionTypes } from './types';

const ColumnDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const { visible, inputs } = useSelector((state: RootState) => state.table);

  const handleSave = () => {
    dispatch({
      type: ActionTypes.ADD_COLUMN,
    });
  };

  const handleDrawerClose = () => {
    dispatch({
      type: ActionTypes.CLOSE_DRAWER,
    });
  };

  const handleInputChange = (type: string, value: string | number) => {
    dispatch({
      type: ActionTypes.SET_DRAWER_INPUT,
      payload: {
        type,
        value,
      },
    });
  };

  return (
    <Drawer
      title="Add Column"
      onClose={handleDrawerClose}
      visible={visible}
      width={600}
      footer={
        <Space>
          <Button type="primary" onClick={handleSave}>
            Edit
          </Button>
          <Button onClick={handleDrawerClose}>
            Cancel
          </Button>
        </Space>
      }
    >
      <Row className='mb-4'>
        <Input
          placeholder="Enter Title"
          value={inputs.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
      </Row>
      <Row className='mb-4'>
        <Input
          placeholder="Enter Data Index"
          value={inputs.dataIndex}
          onChange={(e) => handleInputChange("dataIndex", e.target.value)}
        />
      </Row>
      <Row className='mb-4'>
        <Input
          placeholder="Enter Key"
          value={inputs.key}
          onChange={(e) => handleInputChange("key", e.target.value)}
        />
      </Row>
      <Row className='mb-4'>
        <Input
          placeholder="Enter Width"
          value={inputs.width}
          onChange={(e) => handleInputChange("width", Number(e.target.value))}
        />
      </Row>
    </Drawer>
  );
};

export default ColumnDrawer;
