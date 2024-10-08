import { useParams } from "react-router-dom";
import AddEditProducts from "./AddEditProducts";
import { useGetProductDetailsQuery } from "../../redux/api/productApi";
import { CircularProgress } from "@mui/material";
import Loader from "../../components/Loader";

const ProductEditPage = () => {
  const { id } = useParams();

  const {
    data: productData,
    isLoading,
    error,
  } = useGetProductDetailsQuery({ id });

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading product</div>;

  return <AddEditProducts isEdit={true} productData={productData?.data} />;
};

export default ProductEditPage;
