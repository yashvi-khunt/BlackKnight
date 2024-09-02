import React from "react";
import { useGetOrderDashboardQuery } from "../redux/api/orderApi";
import FlashCard from "./FlashCard";
import { CircularProgress, Box, Typography, Grid } from "@mui/material";
import Table from "../components/dynamicTable/DynamicTable";
import DefaultImage from "../assets/defaultBox.png";
import { GridColDef } from "@mui/x-data-grid";

const Dashboard = () => {
  const { data, error, isLoading } = useGetOrderDashboardQuery({});

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Error loading data</Typography>;
  }

  const columns: GridColDef[] = [
    {
      field: "primaryImage",
      headerName: "Image",
      minWidth: 200,
      headerAlign: "center",
      flex: 1,
      renderCell: ({ value }) => (
        <Grid container height="100%" direction="row" alignItems="center">
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
        <Grid container height="100%" direction="row" alignItems="center">
          {value}
        </Grid>
      ),
      flex: 1,
    },
    {
      field: "clientName",
      headerName: "Client Name",
      renderCell: ({ value }) => (
        <Grid container height="100%" direction="row" alignItems="center">
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
        <Grid container height="100%" direction="row" alignItems="center">
          {value}
        </Grid>
      ),
      minWidth: 150,
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      renderCell: ({ value }) => (
        <Grid container height="100%" direction="row" alignItems="center">
          {value}
        </Grid>
      ),
      minWidth: 150,
      flex: 1,
    },
    {
      field: "jobWorkerRate",
      headerName: "JobWorker Price",
      renderCell: ({ value }) => (
        <Grid container height="100%" direction="row" alignItems="center">
          {parseFloat(value).toFixed(2)}
        </Grid>
      ),
      minWidth: 150,
      flex: 1,
    },
    {
      field: "profitPercent",
      headerName: "Profit Percentage",
      renderCell: ({ value }) => (
        <Grid container height="100%" direction="row" alignItems="center">
          {value + "%"}
        </Grid>
      ),
      minWidth: 150,
      flex: 1,
    },
    {
      field: "finalRate",
      headerName: "Final Price",
      minWidth: 150,
      renderCell: ({ value }) => (
        <Grid container height="100%" direction="row" alignItems="center">
          {value}
        </Grid>
      ),
      flex: 1,
    },
  ];

  const flashCards = data?.data.flashCards || [];
  const pendingOrders = data?.data?.orders?.pending || [];
  const completedOrders = data?.data?.orders?.completed || [];

  const pendingInfo: DynamicTable.TableProps = {
    columns: columns,
    rows: pendingOrders,
    rowCount: pendingOrders.length,
    isLoading: isLoading,
    getRowHeight: () => "auto",
    isHeight: false,
  };

  const completedInfo: DynamicTable.TableProps = {
    columns: columns,
    rows: completedOrders,
    rowCount: completedOrders.length,
    isLoading: isLoading,
    getRowHeight: () => "auto",
    isHeight: false,
  };

  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {flashCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <FlashCard title={card.title} count={card.count} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ my: 4 }}>
        <Typography variant="h6">Pending Orders</Typography>
        <Table {...pendingInfo} />
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Completed Orders</Typography>
        <Table {...completedInfo} />
      </Box>
    </Box>
  );
};

export default Dashboard;
