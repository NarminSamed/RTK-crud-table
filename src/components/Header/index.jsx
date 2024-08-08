import { Menu, Badge } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const favorites = useSelector((state) => state.categories.favorites);
  const basket = useSelector((state) => state.categories.basket);
  const basketCount = basket.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
      <Menu.Item key="1">
        <Link to="/">Category</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/addcategory">Add Category</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/favorites">
          Favorites <Badge count={favorites.length} />
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/basket">
          Basket <Badge count={basketCount} />
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default Header;
