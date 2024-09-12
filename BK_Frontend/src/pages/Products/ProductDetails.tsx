import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetProductDetailsQuery,
} from "../../redux/api/productApi";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DefaultImage from "../../assets/defaultBox.png";
import TableElement from "./TableElement";
import { Delete, Edit } from "@mui/icons-material";
import { openSnackbar } from "../../redux/slice/snackbarSlice";
import { useAppDispatch } from "../../redux/hooks";

function ProductDetails({
  quantity,
  productId,
}: {
  quantity?: number;
  productId?: number;
}) {
  const { id } = useParams();
  const finalId = quantity ? productId?.toString() : id;

  // Hooks should always be called in the same order
  const { data: product, isLoading } = useGetProductDetailsQuery({
    id: finalId,
  });
  const [
    deleteProduct,
    { isLoading: isDeleting, error: deleteError, data: deleteResponse },
  ] = useDeleteProductMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const productDet = product?.data;
  const primaryImage = productDet?.images?.filter((x) => x.isPrimary == "1")[0]
    ?.imagePath;

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    if (finalId) {
      deleteProduct({ id: finalId });
      setOpen(false);
    }
  };

  useEffect(() => {
    if (deleteResponse) {
      dispatch(
        openSnackbar({ severity: "success", message: deleteResponse.message })
      );
      navigate("/products");
    }
    if (deleteError) {
      dispatch(
        openSnackbar({
          severity: "error",
          message: (deleteError as any)?.data?.message,
        })
      );
    }
  }, [deleteResponse, deleteError, dispatch, navigate]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid container spacing={4}>
      {/* First Vertical Section */}
      <Grid item xs={12} md={6}>
        {/* Primary Image */}
        <Box mb={2} textAlign={"center"}>
          <img
            src={primaryImage ?? DefaultImage}
            alt="Primary Product"
            style={{ width: "50%", height: "auto", borderRadius: "8px" }}
          />
        </Box>

        {/* Secondary Images */}
        <Grid container spacing={2} textAlign={"center"}>
          {productDet?.images && productDet.images.length > 1
            ? productDet.images
                .filter((x) => x.isPrimary == "0")
                .map((image, index) => (
                  <Grid item xs={6} key={index}>
                    <img
                      src={image?.imagePath}
                      alt={`Secondary Product Image ${index + 1}`}
                      style={{
                        width: "80%", // Adjust width to make images smaller
                        height: "auto",
                        borderRadius: "8px",
                      }}
                    />
                  </Grid>
                ))
            : Array.from({ length: 3 }).map((_, index) => (
                <Grid item xs={4} key={index}>
                  <img
                    src={DefaultImage}
                    alt={`Default Secondary Image ${index + 1}`}
                    style={{
                      width: "80%", // Adjust width for default images
                      height: "auto",
                      borderRadius: "8px",
                    }}
                  />
                </Grid>
              ))}
        </Grid>
        <Box my={2}>
          <Typography variant="h5" gutterBottom>
            Price Breakup
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Component</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Top</TableCell>
                  <TableCell>
                    {productDet?.topPrice.toFixed(2) || "0.00"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Flute</TableCell>
                  <TableCell>
                    {productDet?.flutePrice.toFixed(2) || "0.00"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Back</TableCell>
                  <TableCell>
                    {productDet?.backPrice.toFixed(2) || "0.00"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Printing</TableCell>
                  <TableCell>
                    {productDet?.printRate.toFixed(2) || "0.00"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Lamination</TableCell>
                  <TableCell>
                    {productDet?.laminationPrice?.toFixed(2) || "0.00"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jobworker Rates</TableCell>
                  <TableCell>
                    {productDet?.jobWorkerPrice.toFixed(2) || "0.00"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    Your Profit ({productDet?.profitPercent}%)
                  </TableCell>
                  <TableCell>
                    {(
                      (productDet?.finalRate * productDet?.profitPercent) /
                      100
                    ).toFixed(2) || "0.00"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Selling Price</TableCell>
                  <TableCell>
                    {productDet?.finalRate.toFixed(2) || "0.00"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          <Button
            variant="contained"
            onClick={() => {
              navigate(`/products/edit/${id}`);
            }}
          >
            <Edit /> Edit Product
          </Button>
          <Button variant="contained" onClick={handleClickOpen}>
            <Delete /> Delete Product
          </Button>
        </Box>
      </Grid>

      {/* Second Vertical Section */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h4" gutterBottom>
            {productDet?.boxName || "Product Title"}
          </Typography>
          <Box>
            <Typography variant="h6" gutterBottom>
              Client: {productDet?.clientName || "Client Name"}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Jobworker: {productDet?.jobWorkerName || "Jobworker Name"}
            </Typography>
            {quantity && (
              <Typography variant="h6" gutterBottom>
                Quantity: {quantity}
              </Typography>
            )}
          </Box>
        </Paper>

        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Specifications
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Specification</TableCell>
                  <TableCell>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableElement
                  field={"L x W x H ( Inch )"}
                  value={`${productDet?.length || "-"} X ${
                    productDet?.width || "-"
                  } X
                    ${productDet?.height || "-"}`}
                />
                <TableElement
                  field={"Flap-1 ( Inch )"}
                  value={productDet?.flap1}
                />
                <TableElement
                  field={"Flap-2 ( Inch )"}
                  value={productDet?.flap2}
                />
                <TableElement
                  field={"Deckle ( Inch )"}
                  value={productDet?.deckle}
                />
                <TableElement
                  field={"Cutting ( Inch )"}
                  value={productDet?.cutting}
                />
                <TableElement
                  field={"Top Paper Type"}
                  value={productDet?.topPaperTypeName}
                />
                <TableElement field={"Top"} value={productDet?.top} />
                <TableElement
                  field={"Flute Paper Type"}
                  value={productDet?.flutePaperTypeName}
                />
                <TableElement
                  field={"Flute ( GSM )"}
                  value={productDet?.flute}
                />
                <TableElement
                  field={"Back Paper Type"}
                  value={productDet?.backPaperTypeName}
                />
                <TableElement field={"Back ( GSM )"} value={productDet?.back} />
                <TableElement field={"Ply"} value={productDet?.ply} />
                <TableElement
                  field={"Sheet Required per Box"}
                  value={productDet?.noOfSheetPerBox}
                />
                <TableElement field={"Die Code"} value={productDet?.dieCode} />
                <TableElement
                  field={"Printing Type"}
                  value={productDet?.printTypeName}
                />
                <TableElement
                  field={"Print Plate code"}
                  value={productDet?.printingPlate}
                />
                <TableElement
                  field={"Lamination"}
                  value={productDet?.isLamination ? "Yes" : "No"}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this product?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone. Please confirm if you want to delete
            the product.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default ProductDetails;
