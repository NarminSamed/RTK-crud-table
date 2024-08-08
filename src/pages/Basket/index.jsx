import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Space } from "antd";
import {
  increment,
  decrement,
  removeItem,
} from "../../categories/categoriesSlice";

const Basket = () => {
  const dispatch = useDispatch();
  const { basket, data } = useSelector((state) => state.categories);

  const basketItems = basket.map((basketItem) => {
    const item = data.find((item) => item.id === basketItem.id);
    return { ...item, quantity: basketItem.quantity };
  });

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
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <Space>
          <Button onClick={() => dispatch(decrement(record.id))}>-</Button>
          {record.quantity}
          <Button onClick={() => dispatch(increment(record.id))}>+</Button>
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="danger" onClick={() => dispatch(removeItem(record.id))}>
          Remove
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1>Basket</h1>
      <Table dataSource={basketItems} columns={columns} rowKey="id" />
    </div>
  );
};

export default Basket;
