import { Box, Typography, Modal, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks";
import { openSnackbar } from "../../redux/slice/snackbarSlice";
import { FormInputText } from "../../components/form";
import {
  useAddMultipleToWishlistMutation,
  useUpdateWishlistItemMutation,
} from "../../redux/api/wishlistApi";
import { useGetClientOptionsQuery } from "../../redux/api/helperApi";

import ClientBrandDD from "./ClientBrandDD";

interface WishlistModalProps {
  open: boolean;
  handleClose: () => void;
  wishlistItem?: wishListTypes.VMGetCartItem;
  mode: "add" | "edit";
}

function WishlistModal({
  open,
  handleClose,
  wishlistItem,
  mode,
}: WishlistModalProps) {
  const { control, register, handleSubmit, reset, setValue } = useForm();
  const dispatch = useAppDispatch();

  const { data: clients } = useGetClientOptionsQuery();
  const [addToWishlist, { data: addResponse, error: addError }] =
    useAddMultipleToWishlistMutation();
  const [updateWishlistItem, { data: updateResponse, error: updateError }] =
    useUpdateWishlistItemMutation();

  useEffect(() => {
    if (wishlistItem) {
      reset({ ...wishlistItem });
    } else {
      reset({
        clientId: "",
        brandId: "",
        productId: "",
        quantity: 0,
      });
    }
  }, [wishlistItem, reset]);

  useEffect(() => {
    if (addResponse || updateResponse) {
      dispatch(
        openSnackbar({
          severity: "success",
          message: addResponse ? "Added to wishlist!" : "Wishlist updated!",
        })
      );
      handleClose();
    }

    if (addError || updateError) {
      dispatch(
        openSnackbar({
          severity: "error",
          message: "An error occurred. Please try again.",
        })
      );
    }
  }, [addResponse, updateResponse, addError, updateError]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (mode === "add") {
      console.log([data]);
      addToWishlist([data as wishListTypes.VMWishlistItem]);
    } else {
      updateWishlistItem({
        id: wishlistItem.id,
        quantity: parseInt(data.quantity),
      });
      console.log({ ...data, id: wishlistItem.id });
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6">
          {mode === "add" ? "Add to Cart" : "Edit Cart Item"}
        </Typography>
        <Box
          component="form"
          sx={{ mt: 2 }}
          display={"flex"}
          flexDirection={"column"}
          gap={2}
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Client and Brand Selection */}
          <ClientBrandDD
            control={control}
            setValue={setValue}
            clients={clients?.data || []}
            sClient={wishlistItem?.clientId || ""}
            isEdit={mode === "add" ? false : true}
            productData={wishlistItem}
          />

          {/* Quantity Input */}
          <FormInputText
            control={control}
            label="Quantity"
            {...register("quantity", {
              required: { value: true, message: "Quantity is required" },
              min: { value: 1, message: "Quantity must be at least 1" },
            })}
            type="number"
          />

          {/* Submit and Cancel Buttons */}
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ ml: 2 }}
              type="submit"
            >
              {mode === "add" ? "Add to cart" : "Update"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default WishlistModal;
