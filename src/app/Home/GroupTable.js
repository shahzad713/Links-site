import React from 'react';
import { Table } from 'antd';

const GroupTable = ({ columns, filteredGroups }) => (
  <Table 
    columns={columns} 
    dataSource={filteredGroups}
    rowKey="_id"
    pagination={{ 
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
    }}
    scroll={{ x: true }}
    style={{ 
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden'
    }}
  />
);

export default GroupTable;