import { useGetProductsQuery } from "../../redux/api/productApi";
import Table from "../../components/dynamicTable/DynamicTable";
import { EditOutlined, InfoOutlined } from "@mui/icons-material";
import { Box, Typography, Button, Grid } from "@mui/material";
import { GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import DefaultImage from "../../assets/defaultBox.png";

function Products() {
  const { data: products, isLoading } = useGetProductsQuery(null);

  const navigate = useNavigate();

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
            alt="Product Image"
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
      headerName: "Jobworker Name",
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
      field: "jobWorkerPrice",
      headerName: "Jobworker Price",
      renderCell: ({ value }) => (
        <Grid
          container
          height="100%"
          direction="row"
          //justifyContent="center"
          alignItems="center"
        >
          {Math.round(value)}
        </Grid>
      ),
      minWidth: 150,
      flex: 1,
    },
    {
      field: "profitPercent",
      headerName: "Profit Percentage",
      renderCell: ({ value }) => (
        <Grid
          container
          height="100%"
          direction="row"
          //justifyContent="center"
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
      field: "actions",
      type: "actions",
      align: "left",
      headerAlign: "left",
      headerName: "Actions",
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <GridActionsCellItem
            sx={{
              border: "1px solid",
              borderRadius: "5px",
              borderColor: "secondary.main",
            }}
            color="primary"
            icon={<EditOutlined />}
            label="Edit"
            className="textPrimary"
            onClick={() => navigate(`edit/${params.row.id}`)}
          />
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
    rows: products?.data.data,
    rowCount: products?.data.count,
    isLoading: isLoading,
    getRowHeight: () => "auto",
  };

  return (
    <>
      <Box
        mb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="right"
      >
        <Typography variant="h5" color="initial"></Typography>
        <Box>
          <Button variant="contained" onClick={() => navigate("add")}>
            + Add Product
          </Button>
        </Box>
      </Box>
      <Table {...pageInfo}></Table>
    </>
  );
}

export default Products;
