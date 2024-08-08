import { useEffect } from "react";
import { Table, Spin, Tooltip, Button, Space, message, Popconfirm } from "antd";
import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from "../../api/apiSlice.js";
import { useSelector, useDispatch } from "react-redux";
import {
  addFavorite,
  fetchCategories,
  addBasket
} from "../../categories/categoriesSlice.js";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Categories = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.categories);
  const { data: categories, error, isLoading } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  useEffect(() => {
    if (categories) {
      dispatch(fetchCategories());
    }
  }, [categories, dispatch]);

  const isFavorite = (id) => {
    return favorites.includes(id);
  };

  const handleFavorite = (id) => {
    dispatch(addFavorite(id));
  };

  const handleAddBasket = (id) => {
    dispatch(addBasket(id));
  };

  const handleDelete = (id) => {
    deleteCategory(id)
      .unwrap()
      .then(() => {
        message.success("Successfully deleted!");
      })
      .catch(() => {
        message.error("Failed to delete");
      });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="View">
            <Link to={`/${record.id}`}>
              <Button type="primary" icon={<EyeOutlined />} />
            </Link>
          </Tooltip>
          <Tooltip title="Edit">
            <Link to={`/edit-category/${record.id}`}>
              <Button type="default" icon={<EditOutlined />} />
            </Link>
          </Tooltip>
          <Popconfirm
            title="Silmek isteyirsiniz?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <Button type="danger" icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
          <Tooltip title="Add Basket">
            <Button type="default" icon={<ShoppingCartOutlined />} onClick={() => handleAddBasket(record.id)} />
          </Tooltip>
          <Tooltip title="Favorite">
            <Button
              type="default"
              icon={
                isFavorite(record.id) ? (
                  <HeartFilled style={{ color: "red" }} />
                ) : (
                  <HeartOutlined />
                )
              }
              onClick={() => handleFavorite(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  if (isLoading) return <Spin tip="Loading..." />;

  if (error) return <div>Error loading categories</div>;

  return <Table dataSource={categories} columns={columns} rowKey="id" />;
};

export default Categories;
