import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/api/productApi";

function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductDetailsQuery({ id: id });
  const productDet = product?.data;
  console.log(product);
  return <div>{}</div>;
}

export default ProductDetails;
