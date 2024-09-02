import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../redux/api/orderApi";
import ProductDetails from "../Products/ProductDetails";
import { Typography } from "@mui/material";

function OrderDetails() {
  const { id } = useParams();

  const { data, isLoading } = useGetOrderByIdQuery({ id: parseInt(id) });
  const order = data?.data;
  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  console.log(id, order);
  return (
    order && (
      <ProductDetails productId={order?.productId} quantity={order?.quantity} />
    )
  );
}

export default OrderDetails;
