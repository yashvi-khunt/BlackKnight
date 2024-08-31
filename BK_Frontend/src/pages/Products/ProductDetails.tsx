import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/api/productApi";

function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductDetailsQuery({ id: id });
  console.log(product);
  return <div>ProductDetails</div>;
}

export default ProductDetails;
