import { useEffect, useState } from "react";
import {
  Drawer,
  IconButton,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Divider,
  Box,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useGetWishlistQuery } from "../../redux/api/wishlistApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Loader from "../../components/Loader";
import WishlistModal from "./WishlistItemModal";
import { useAddOrderMutation } from "../../redux/api/orderApi";
import { useNavigate } from "react-router-dom";
import { openSnackbar } from "../../redux/slice/snackbarSlice";

interface ShoppingCartProps {
  open: boolean;
  onClose: () => void;
}

export default function ShoppingCart({ open, onClose }: ShoppingCartProps) {
  const { data, error, isLoading } = useGetWishlistQuery();
  const userRole = useAppSelector((state) => state.auth?.userData?.role);
  const [subtotal, setSubtotal] = useState(0);
  const [editItem, setEditItem] = useState<wishListTypes.VMGetCartItem | null>(
    null
  ); // New state for editing
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (data?.data) {
      const total = data.data.reduce(
        (acc, product) => acc + product.finalRate * product.quantity,
        0
      );
      setSubtotal(parseInt(total.toFixed(2)));
    }
  }, [data?.data]);

  const handleAddOrder = () => {
    addOrder(null);
  };

  const handleEdit = (item: wishListTypes.VMGetCartItem) => {
    setEditItem(item); // Set the item to edit
    setModalOpen(true); // Open the modal
  };

  const handleModalClose = () => {
    setEditItem(null);
    setModalOpen(false);
  };

  const [addOrder, { error: addError, data: addResponse }] =
    useAddOrderMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (addResponse) {
      dispatch(
        openSnackbar({
          severity: "success",
          message: addResponse.message,
        })
      );
      navigate("/orders");
      handleModalClose();
    }
    if (addError) {
      dispatch(
        openSnackbar({
          severity: "error",
          message: (addError as any)?.data?.message,
        })
      );
      console.log("error"); /// toast
    }
  }, [addResponse, (addError as any)?.data]);

  if (isLoading) {
    return (
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: 360,
            height: "calc(100vh - 64px)",
            top: 64,
          },
        }}
      >
        <Loader />
      </Drawer>
    );
  }

  if (error) {
    return (
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: 360,
            height: "calc(100vh - 64px)",
            top: 64,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography variant="h6" color="error">
            Error loading wishlist
          </Typography>
        </Box>
      </Drawer>
    );
  }

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        //   PaperProps={{
        //     sx: {
        //       width: 400,
        //       height: "100%", // Full height of parent
        //       display: "flex",
        //       flexDirection: "column",
        //     },
        //   }}
        PaperProps={{
          sx: {
            width: 420,
            height: "calc(100vh - 64px)", // Ensure it fills remaining height below AppBar
            top: 64, // Offset by the height of the AppBar
          },
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
          }}
        >
          <Typography variant="h6">Cart Items</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Content Section (Scrollable) */}
        <Box
          sx={{
            flex: 1, // Takes available space
            overflowY: "auto", // Scroll if content overflows
            padding: "16px",
          }}
        >
          <Grid container spacing={2}>
            {data.data.map((product) => (
              <Grid item xs={12} key={product.id}>
                <Card sx={{ display: "flex" }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 100 }}
                    image={product.image}
                    alt={product.boxName}
                  />

                  <CardContent sx={{ flex: 1 }}>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Typography variant="subtitle1">
                        {product.boxName.toUpperCase()}
                      </Typography>
                      <Typography variant="body1">
                        ₹{parseFloat(product.finalRate.toString()).toFixed(2)}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {`${
                        userRole === "Admin" ? product.clientName + " - " : null
                      }${product.brandName} `}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Qty {product.quantity}
                    </Typography>
                    <Button
                      size="small"
                      color="primary"
                      sx={{ marginTop: 2 }}
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider />

        {/* Footer Section */}
        <Box sx={{ padding: "16px" }}>
          <Typography variant="subtitle1">Subtotal: ₹{subtotal}</Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            onClick={handleAddOrder}
          >
            Checkout
          </Button>
        </Box>
      </Drawer>
      {/* Wishlist Modal for Editing */}

      {editItem && (
        <WishlistModal
          open={isModalOpen}
          handleClose={handleModalClose}
          wishlistItem={editItem} // Pass the item for editing
          mode="edit"
        />
      )}
    </>
  );
}
