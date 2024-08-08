import { useAddCategoryMutation } from '../../api/apiSlice.js';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const [addCategory, { isLoading }] = useAddCategoryMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await addCategory(values).unwrap();
      message.success('successfully!');
      navigate('/');
    } catch (err) {
      message.error('Failed');
    }
  };

  return (
    <div>
      <h1>Add Category</h1>
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
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Add Category
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCategory;