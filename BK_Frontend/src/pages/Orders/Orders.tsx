import { useGetOrdersQuery } from "../../redux/api/orderApi";
import Table from "../../components/dynamicTable/DynamicTable";
import { Add, EditOutlined, InfoOutlined } from "@mui/icons-material";
import { Box, Typography, Button, Grid } from "@mui/material";
import { GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { useNavigate, useSearchParams } from "react-router-dom";
import DefaultImage from "../../assets/defaultBox.png";
import SearchField from "../../components/dynamicTable/SearchField";
import dayjs from "dayjs";
import DatePickerField from "../../components/dynamicTable/DatePickerField";
import { useState } from "react";
import WishlistModal from "../Wishlist/WishlistItemModal";

function orders() {
  const [searchParams] = useSearchParams();
  const { data: orders, isLoading } = useGetOrdersQuery({
    ...Object.fromEntries(searchParams.entries()),
  });

  const [isWishlistModalOpen, setWishlistModalOpen] = useState(false);

  const handleOpenWishlistModal = () => {
    setWishlistModalOpen(true);
  };

  const handleCloseWishlistModal = () => {
    setWishlistModalOpen(false);
  };

  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: "orderDate",
      headerName: "Order Date",
      minWidth: 150,
      renderCell: ({ value }) => (
        <Grid
          container
          height="100%"
          direction="row"
          //justifyContent="center"
          alignItems="center"
        >
          {dayjs(value).format("DD/MM/YYYY")}
        </Grid>
      ),
      flex: 1,
    },
    {
      field: "primaryImage",
      headerName: "Image",
      sortable: false,
      minWidth: 200,
      headerAlign: "center",
      flex: 1,
      renderCell: ({ value }) => (
        <Grid
          container
          height="100%"
          direction="row"
          //justifyContent="center"
          alignItems="center"
        >
          <Box
            component="img"
            src={value || DefaultImage}
            alt="order Image"
            sx={{
              width: 150,
              height: 150,
              objectFit: "contain",
              margin: "0 auto",
              borderRadius: "4px",
            }}
          />
        </Grid>
      ),
    },
    {
      field: "boxName",
      headerName: "Box Name",
      minWidth: 150,
      renderCell: ({ value }) => (
        <Grid
          container
          height="100%"
          direction="row"
          //justifyContent="center"
          alignItems="center"
        >
          {value}
        </Grid>
      ),
      flex: 1,
    },
    {
      field: "clientName",
      headerName: "Client Name",
      renderCell: ({ value }) => (
        <Grid
          container
          height="100%"
          direction="row"
          //justifyContent="center"
          alignItems="center"
        >
          {value}
        </Grid>
      ),
      minWidth: 150,
      flex: 1,
    },
    {
      field: "jobWorkerName",
      headerName: "JobWorker Name",
      renderCell: ({ value }) => (
        <Grid
          container
          height="100%"
          direction="row"
          //justifyContent="center"
          alignItems="center"
        >
          {value}
        </Grid>
      ),
      minWidth: 150,
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      headerAlign: "center",
      renderCell: ({ value }) => (
        <Grid
          container
          height="100%"
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {value}
        </Grid>
      ),
      minWidth: 150,
      flex: 1,
    },
    {
      field: "jobWorkerRate",
      headerName: "JobWorker Price",
      headerAlign: "center",
      renderCell: ({ value }) => (
        <Grid
          container
          height="100%"
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {parseFloat(value).toFixed(2)}
        </Grid>
      ),
      minWidth: 150,
      flex: 1,
    },
    {
      field: "profitPercent",
      headerName: "Profit Percentage",
      headerAlign: "center",
      renderCell: ({ value }) => (
        <Grid
          container
          height="100%"
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {value + "%"}
        </Grid>
      ),
      minWidth: 150,
      flex: 1,
    },
    {
      field: "finalRate",
      headerName: "Final Price",
      headerAlign: "center",
      minWidth: 150,
      renderCell: ({ value }) => (
        <Grid
          container
          height="100%"
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {value}
        </Grid>
      ),
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      align: "left",
      headerAlign: "left",
      headerName: "Actions",
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          {/* <GridActionsCellItem
            sx={{
              border: "1px solid",
              borderRadius: "5px",
              borderColor: "secondary.main",
            }}
            color="primary"
            icon={<Add />}
            label="Add"
            className="textPrimary"
            //onClick={() => navigate(`edit/${params.row.id}`)}
          /> */}
          <GridActionsCellItem
            sx={{
              border: "1px solid",
              borderRadius: "5px",
              borderColor: "secondary.main",
            }}
            color="primary"
            icon={<InfoOutlined />}
            label="View"
            onClick={() => navigate(`details/${params.row.id}`)}
          />
        </Box>
      ),
      minWidth: 150,
      flex: 1,
    },
  ];

  const pageInfo: DynamicTable.TableProps = {
    columns: columns,
    rows: orders?.data.data,
    rowCount: orders?.data.count,
    isLoading: isLoading,
    getRowHeight: () => "auto",
  };

  return (
    <>
      <Box
        mb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <SearchField
            size={"small"}
            label="Search here ..."
            placeholder="Company Name"
          />
        </Box>
        <Box>
          <Button variant="contained" onClick={handleOpenWishlistModal}>
            + Add order
          </Button>
        </Box>
      </Box>
      <Table {...pageInfo}>
        <Grid container spacing={2} paddingBottom={2}>
          <Grid item xs={6} md={3}>
            <DatePickerField label="From" />
          </Grid>
          <Grid item xs={6} md={3}>
            <DatePickerField to label="To" />
          </Grid>
        </Grid>
      </Table>
      {/* Add the WishlistModal here */}
      <WishlistModal
        open={isWishlistModalOpen}
        handleClose={handleCloseWishlistModal}
        mode="add" // Pass the mode as "add"
      />
    </>
  );
}

export default orders;
