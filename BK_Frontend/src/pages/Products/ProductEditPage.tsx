import { useParams } from "react-router-dom";
import AddEditProducts from "./AddEditProducts";
import { useGetProductDetailsQuery } from "../../redux/api/productApi";
import { CircularProgress } from "@mui/material";

const ProductEditPage = () => {
  const { id } = useParams();

  const {
    data: productData,
    isLoading,
    error,
  } = useGetProductDetailsQuery({ id });

  if (isLoading)
    return (
      <CircularProgress
        size={24}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          marginTop: "-12px",
          marginLeft: "-12px",
        }}
      />
    );
  if (error) return <div>Error loading product</div>;

  return <AddEditProducts isEdit={true} productData={productData?.data} />;
};

export default ProductEditPage;
