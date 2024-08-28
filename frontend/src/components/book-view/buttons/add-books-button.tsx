import { useState } from "react";

import { Button, Form, Input, Select, Upload } from "antd";
import { Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { categories } from "@/components/book-view/states/book-categories";

const { Option } = Select;

export const AddBookButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {};

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add book to your collection
      </Button>
      <Modal
        title="Add new book"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item
            label="Upload"
            valuePropName="fileList"
            // getValueFromEvent={}
          >
            <Upload action="/upload.do" listType="picture-card">
              <button
                style={{
                  border: 0,
                  background: "none",
                }}
                type="button"
              >
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                whitespace: true,
                min: 5,
                max: 25,
                message: "Please input the book title!",
              },
            ]}
          >
            <Input placeholder="Enter the book title" />
          </Form.Item>
          <Form.Item
            name="rate"
            label="Rate"
            rules={[
              {
                required: true,

                message: "Please rate your book!",
              },
            ]}
          ></Form.Item>
          <Form.Item
            name="author"
            label="Author"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input the author's name!",
                min: 5,
                max: 20,
              },
            ]}
          >
            <Input placeholder="Enter the author's name" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[
              {
                required: true,
                message: "Please select a category!",
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select Categories"
              size="small"
              maxTagCount={2}
              maxCount={2}
            >
              {categories.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
