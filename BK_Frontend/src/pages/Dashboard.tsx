import { useGetOrderDashboardQuery } from "../redux/api/orderApi";
import FlashCard from "./FlashCard";
import { Box, Typography, Grid } from "@mui/material";
import Table, {
  CustomNoRowsOverlay,
} from "../components/dynamicTable/DynamicTable";
import DefaultImage from "../assets/defaultBox.png";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import Loader from "../components/Loader";
import CustomPagination from "../components/dynamicTable/CustomPagination";
import { useState } from "react";

const Dashboard = () => {
  const { data, error, isLoading } = useGetOrderDashboardQuery({});

  if (isLoading) {
    return <Loader />;
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
    // {
    //   field: "actions",
    //   type: "actions",
    //   align: "left",
    //   headerAlign: "left",
    //   headerName: "Actions",
    //   renderCell: (params) => (
    //     <Box display="flex" gap={1}>
    //       {/* <GridActionsCellItem
    //         sx={{
    //           border: "1px solid",
    //           borderRadius: "5px",
    //           borderColor: "secondary.main",
    //         }}
    //         color="primary"
    //         icon={<Add />}
    //         label="Add"
    //         className="textPrimary"
    //         //onClick={() => navigate(`edit/${params.row.id}`)}
    //       /> */}
    //       <GridActionsCellItem
    //         sx={{
    //           border: "1px solid",
    //           borderRadius: "5px",
    //           borderColor: "secondary.main",
    //         }}
    //         color="primary"
    //         icon={<InfoOutlined />}
    //         label="View"
    //         onClick={() => navigate(`details/${params.row.id}`)}
    //       />
    //     </Box>
    //   ),
    //   minWidth: 150,
    //   flex: 1,
    // },
  ];

  const [pendingPaginationModel, setPendingPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const [completedPaginationModel, setCompletedPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  // Separate handler for Pending Orders pagination
  const handlePendingPaginationModelChange = (model: GridPaginationModel) => {
    setPendingPaginationModel(model);
  };

  // Separate handler for Completed Orders pagination
  const handleCompletedPaginationModelChange = (model: GridPaginationModel) => {
    setCompletedPaginationModel(model);
  };

  const flashCards = data?.data.flashCards || [];

  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {flashCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <FlashCard title={card.title} count={card.count} />
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          my: 4,
          height: "800px",
          // overflow: "hidden",
          maxHeight: "800px",
          display: "grid",
        }}
      >
        <Typography variant="h6">Pending Orders</Typography>
        <DataGrid
          pagination
          columns={columns}
          rows={data?.data?.orders?.pending || []}
          loading={isLoading}
          disableColumnResize
          // rowCount={data?.data?.orders?.pending.length || 0}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          slots={{
            pagination: CustomPagination,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          paginationModel={pendingPaginationModel}
          onPaginationModelChange={handlePendingPaginationModelChange}
          sx={{
            fontSize: 17,
            "& .MuiDataGrid-columnHeaderTitle": {
              fontSize: "default",
              overflow: "visible",
              whiteSpace: "normal",
              lineHeight: "normal",
            },
          }}
          autoHeight={false}
          disableColumnMenu={true}
          getRowHeight={() => "auto"}
          disableRowSelectionOnClick
        />
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Completed Orders</Typography>
        <Box
          sx={{
            mb: 4,
            height:
              data?.data?.orders?.completed.length === 0 ? "400px" : "800px",
            // overflow: "hidden",
            maxHeight: "800px",
          }}
        >
          <DataGrid
            pagination
            columns={columns}
            rows={data?.data?.orders?.completed || []}
            loading={isLoading}
            disableColumnResize
            // rowCount={data?.data?.orders?.pending.length || 0}
            pageSizeOptions={[5, 10, 25, 50, 100]}
            slots={{
              pagination: CustomPagination,
              noRowsOverlay: CustomNoRowsOverlay,
            }}
            paginationModel={completedPaginationModel}
            onPaginationModelChange={handleCompletedPaginationModelChange}
            sx={{
              fontSize: 17,
              "& .MuiDataGrid-columnHeaderTitle": {
                fontSize: "default",
                overflow: "visible",
                whiteSpace: "normal",
                lineHeight: "normal",
              },
            }}
            autoHeight={false}
            disableColumnMenu={true}
            getRowHeight={() => "auto"}
            disableRowSelectionOnClick
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
