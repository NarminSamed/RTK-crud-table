import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetCategoryByIdQuery, useEditCategoryMutation } from '../../api/apiSlice.js';
import { Form, Input, Button, Spin, message } from 'antd';

const EditCategory = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { data: category, error, isLoading } = useGetCategoryByIdQuery(id);
  const [editCategory, { isLoading: isUpdating }] = useEditCategoryMutation();

  const [form] = Form.useForm();

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        name: category.name,
        description: category.description,
      });
    }
  }, [category, form]);

  const onFinish = async (values) => {
    try {
      await editCategory({ id, ...values }).unwrap();
      message.success('successfully!');
      navigate('/');
    } catch (err) {
      message.error('Failed');
    }
  };

  if (isLoading || isUpdating) return <Spin tip="Loading..." />;

  if (error) return <div>Error loading</div>;

  return (
    <div>
      <h1>Edit Category</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Category Name"
          name="name"
          rules={[{ required: true, message: 'Please input the category name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isUpdating}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditCategory;
