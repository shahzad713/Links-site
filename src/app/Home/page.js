'use client'

import React, { useState, useEffect } from 'react';
import { Button, Typography, Layout, Space, message, Modal, Form, Skeleton, Tag } from 'antd';
import { PlusOutlined, WhatsAppOutlined, EditOutlined , EyeOutlined} from '@ant-design/icons';
import axios from 'axios';

import AddGroupForm from './AddGroupForm';
import EditGroupForm from './EditGroupForm.js';
import SearchAndFilter from './SearchAndFilter.js';
import GroupTable from './GroupTable';
import { categories } from './constants';

const { Title } = Typography;
const { Content } = Layout;




// Main Component
export default function Home() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/jobs");
      setGroups(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
      message.error("Failed to load WhatsApp groups");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGroup = async (id, link) => {
    try {
      const updatedGroup = await axios.put(
        `http://localhost:3000/api/jobs/${id}/views`
      );
      window.open(link, "_blank");
      setGroups(
        groups.map((group) => (group._id === id ? updatedGroup.data : group))
      );
    } catch (error) {
      console.error("Error updating views:", error);
    }
  };

  const showAddModal = () => setIsAddModalVisible(true);
  const handleAddCancel = () => {
    setIsAddModalVisible(false);
    form.resetFields();
  };

  const showEditModal = (group) => {
    setEditingGroup(group);
    editForm.setFieldsValue(group);
    setIsEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setEditingGroup(null);
    editForm.resetFields();
  };

  const onAddFinish = async (values) => {
    try {
      const response = await axios.post("http://localhost:3000/api/jobs", {
        ...values,
        createdAt: new Date().toISOString().split("T")[0],
        views: 0,
      });
      message.success("Group added successfully");
      setIsAddModalVisible(false);
      form.resetFields();
      fetchGroups();
    } catch (error) {
      console.error("Error adding group:", error);
      message.error("Failed to add group");
    }
  };

  const onEditFinish = async (values) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/jobs/${editingGroup._id}`,
        values
      );
      message.success("Group updated successfully");
      setIsEditModalVisible(false);
      setEditingGroup(null);
      editForm.resetFields();
      fetchGroups();
    } catch (error) {
      console.error("Error updating group:", error);
      message.error("Failed to update group");
    }
  };

  const handleSearch = (e) => setSearchText(e.target.value);
  const handleCategoryFilter = (value) => setCategoryFilter(value);

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (categoryFilter === "" || group.category === categoryFilter)
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <a style={{ color: "#075E54" }}>{text}</a>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => <Tag color="#128C7E">{category}</Tag>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Views",
      dataIndex: "views",
      key: "views",
      sorter: (a, b) => a.views - b.views,
      render: (views) => (
        <Space>
          <EyeOutlined style={{ color: "#128C7E" }} />
          {views}
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<WhatsAppOutlined />}
            onClick={() => handleJoinGroup(record._id, record.link)}
            style={{ backgroundColor: "#128C7E", borderColor: "#128C7E" }}
          >
            Join Group
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
            style={{ borderColor: "#128C7E", color: "#128C7E" }}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/whatsapp-bg.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
      }}
    >
      <Content className="px-4 py-8">
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <Title level={2} style={{ color: "#075E54", margin: 0 }}>
              WhatsApp Groups
            </Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showAddModal}
              style={{ backgroundColor: "#128C7E", borderColor: "#128C7E" }}
            >
              Add Group
            </Button>
          </div>
          <SearchAndFilter
            handleSearch={handleSearch}
            handleCategoryFilter={handleCategoryFilter}
            categories={categories}
          />
          {loading ? (
            <Skeleton active paragraph={{ rows: 5 }} />
          ) : (
            <GroupTable columns={columns} filteredGroups={filteredGroups} />
          )}
        </div>
      </Content>

      <Modal
        title={
          <span style={{ color: "#075E54", fontSize: "1.5em" }}>
            Add New WhatsApp Group
          </span>
        }
        visible={isAddModalVisible}
        onCancel={handleAddCancel}
        footer={null}
        bodyStyle={{ backgroundColor: "#ECE5DD", padding: "20px" }}
        width={400}
      >
        <AddGroupForm
          form={form}
          onFinish={onAddFinish}
          categories={categories}
        />
      </Modal>

      <Modal
        title={
          <span style={{ color: "#075E54", fontSize: "1.5em" }}>
            Edit WhatsApp Group
          </span>
        }
        visible={isEditModalVisible}
        onCancel={handleEditCancel}
        footer={null}
        bodyStyle={{ backgroundColor: "#ECE5DD", padding: "20px" }}
        width={400}
      >
        <EditGroupForm
          form={editForm}
          onFinish={onEditFinish}
          categories={categories}
          initialValues={editingGroup}
        />
      </Modal>
    </Layout>
  );
}
