import { useParams } from "react-router-dom";
import { useGetCategoryByIdQuery } from "../../api/apiSlice.js";
import { Spin } from "antd";

const Detail = () => {
  const { id } = useParams();
  const { data: category, error, isLoading } = useGetCategoryByIdQuery(id);

  if (isLoading) return <Spin tip="Loading..." />;

  if (error) return <div>Error loading category details</div>;

  return (
    <section>
      <h1>{category.name}</h1>
      <div>{category.description}</div>
    </section>
  );
};

export default Detail;
