import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/api/productApi";
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
} from "@mui/material";
import DefaultImage from "../../assets/defaultBox.png";
import TableElement from "./TableElement";

function ProductDetails({
  quantity,
  productId,
}: {
  quantity?: number;
  productId?: number;
}) {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductDetailsQuery({
    id: quantity ? productId.toString() : id,
  });
  const productDet = product?.data;
  const primaryImage = productDet?.images?.filter((x) => x.isPrimary == "1")[0]
    ?.imagePath;
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
        <Box mt={2}>
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
                    {productDet?.laminationPrice.toFixed(2) || "0.00"}
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
                      (productDet?.finalRate * productDet.profitPercent) /
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
            {quantity !== null && (
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
                  value={productDet?.isLaminatiom ? "Yes" : "No"}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ProductDetails;
