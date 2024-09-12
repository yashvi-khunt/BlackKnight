import React, { useEffect, useState } from "react";
import {
  useGetProductsQuery,
  useUpdateProfitPercentMutation,
} from "../../redux/api/productApi";
import Table from "../../components/dynamicTable/DynamicTable";
import { EditOutlined, InfoOutlined } from "@mui/icons-material";
import { Box, Typography, Button, Grid, Modal, TextField } from "@mui/material";
import { GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { useNavigate, useSearchParams } from "react-router-dom";
import DefaultImage from "../../assets/defaultBox.png";
import SearchField from "../../components/dynamicTable/SearchField";
import { openSnackbar } from "../../redux/slice/snackbarSlice";
import { useAppDispatch } from "../../redux/hooks";

function Products() {
  const [searchParams] = useSearchParams();
  const { data: products, isLoading } = useGetProductsQuery({
    ...Object.fromEntries(searchParams.entries()),
  });

  const [updateProfitPercent, { error: updateError, data: updateResponse }] =
    useUpdateProfitPercentMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<any>(null);
  const [profitPercent, setProfitPercent] = useState<number>(0);
  const [finalRate, setFinalRate] = useState<string>("");

  const handleOpenModal = (row: any) => {
    setEditingRow(row);
    setProfitPercent(row.profitPercent);
    setFinalRate(row.finalRate);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setEditingRow(null);
  };

  useEffect(() => {
    if (updateResponse) {
      dispatch(
        openSnackbar({
          severity: "success",
          message: updateResponse?.message,
        })
      );

      handleCloseModal();
    }
    if (updateError) {
      dispatch(
        openSnackbar({
          severity: "error",
          message: (updateError as any)?.data?.message,
        })
      );
      console.log("error");
      handleCloseModal();
    }
    navigate("/products");
  }, [updateResponse, (updateError as any)?.data]);

  const handleProfitPercentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newProfitPercent = Number(event.target.value);
    setProfitPercent(newProfitPercent);

    // Recalculate finalRate based on the new profitPercent
    const newFinalRate = (
      editingRow.jobWorkerPrice *
      (1 + newProfitPercent / 100)
    ).toFixed(1);
    setFinalRate(newFinalRate);
  };

  const handleSave = () => {
    if (editingRow) {
      console.log({
        id: editingRow.id,
        profitPercent: profitPercent,
      });
      updateProfitPercent({
        id: editingRow.id,
        profitPercent: profitPercent,
      });
    }
  };

  const columns: GridColDef[] = [
    {
      field: "primaryImage",
      headerName: "Image",
      minWidth: 200,
      sortable: false,
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
      field: "jobWorkerPrice",
      headerName: "JobWorker Price",
      headerAlign: "center",
      minWidth: 150,
      flex: 1,
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
    },
    {
      field: "profitPercent",
      headerName: "Profit Percentage",
      headerAlign: "center",
      renderCell: (params) => (
        <Grid
          container
          height="100%"
          direction="row"
          justifyContent="center"
          alignItems="center"
          onClick={() => handleOpenModal(params.row)}
        >
          {params.value + "%"}
        </Grid>
      ),
      minWidth: 150,
      flex: 1,
      // renderCell: (params) => (
      //   <Typography onClick={() => handleOpenModal(params.row)}>
      //     {params.value}%
      //   </Typography>
      // ),
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
      align: "center",
      headerAlign: "center",
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
        <Box>
          <SearchField
            label="Search here ..."
            size={"small"}
            placeholder="BoxName"
          />
        </Box>
        <Box>
          <Button variant="contained" onClick={() => navigate("add")}>
            + Add Product
          </Button>
        </Box>
      </Box>
      <Table {...pageInfo} />

      {/* Modal for editing profit percent */}
      <Modal open={open} onClose={handleCloseModal}>
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
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Edit Profit Percent
          </Typography>
          <Box mt={2}>
            <TextField
              label="Profit Percent"
              type="number"
              value={profitPercent}
              onChange={handleProfitPercentChange}
              fullWidth
              variant="outlined"
            />
          </Box>
          <Box mt={2}>
            <TextField
              label="Final Rate"
              value={finalRate}
              disabled
              fullWidth
              variant="outlined"
            />
          </Box>
          <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={handleCloseModal} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default Products;
