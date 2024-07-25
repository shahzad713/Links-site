import React from "react";
import { Row, Col, Input, Select } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";

const { Option } = Select;

const SearchAndFilter = ({
  handleSearch,
  handleCategoryFilter,
  categories,
}) => (
  <Row gutter={16} style={{ marginBottom: 16 }}>
    <Col xs={24} sm={12}>
      <Input
        placeholder="Search groups"
        onChange={handleSearch}
        prefix={<SearchOutlined />}
        style={{ width: "100%" }}
      />
    </Col>
    <Col xs={24} sm={12}>
      <Select
        style={{ width: "100%" }}
        placeholder="Filter by category"
        onChange={handleCategoryFilter}
        allowClear
        suffixIcon={<FilterOutlined />}
      >
        {categories.map((category) => (
          <Option key={category} value={category}>
            {category}
          </Option>
        ))}
      </Select>
    </Col>
  </Row>
);

export default SearchAndFilter;
