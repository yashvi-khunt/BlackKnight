import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
} from "../../redux/api/orderApi";
import Table from "../../components/dynamicTable/DynamicTable";
import {
  Add,
  DeleteOutlined,
  EditOutlined,
  InfoOutlined,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  Grid,
  DialogTitle,
  DialogContent,
  Dialog,
  DialogActions,
} from "@mui/material";
import { GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { useNavigate, useSearchParams } from "react-router-dom";
import DefaultImage from "../../assets/defaultBox.png";
import SearchField from "../../components/dynamicTable/SearchField";
import dayjs from "dayjs";
import DatePickerField from "../../components/dynamicTable/DatePickerField";
import { useEffect, useState } from "react";
import WishlistModal from "../Wishlist/WishlistItemModal";
import { openSnackbar } from "../../redux/slice/snackbarSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

function orders() {
  const userRole = useAppSelector((state) => state.auth.userData?.role);

  const [searchParams] = useSearchParams();
  const { data: orders, isLoading } = useGetOrdersQuery({
    ...Object.fromEntries(searchParams.entries()),
  });

  const [isWishlistModalOpen, setWishlistModalOpen] = useState(false);
  const [wishlistMode, setWishlistMode] = useState<"add" | "edit">("add");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOpenWishlistModal = (mode: "add" | "edit", order = null) => {
    console.log(order);
    setWishlistMode(mode);
    setSelectedOrder({
      ...order,
      clientId: order.clientId,
      brandId: order.brandId.toString(),
      productId: order.id.toString(),
    });
    setWishlistModalOpen(true);
  };

  const handleCloseWishlistModal = () => {
    setWishlistModalOpen(false);
    setSelectedOrder(null);
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
          {userRole === "Admin" && (
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
              onClick={() => handleOpenWishlistModal("edit", params.row)}
            />
          )}
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
          {userRole === "Admin" && (
            <GridActionsCellItem
              sx={{
                border: "1px solid",
                borderRadius: "5px",
                borderColor: "secondary.main",
              }}
              color="error"
              icon={<DeleteOutlined />}
              label="Delete"
              onClick={() => handleDelete(params.row.id)}
            />
          )}
        </Box>
      ),
      minWidth: 150,
      flex: 1,
    },
  ];

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState<number | null>(null);

  const [deleteOrder, { error: deleteError, data: deleteResponse }] =
    useDeleteOrderMutation();

  // Handle delete button click
  const handleDelete = (id: number) => {
    setDeleteOrderId(id);
    setOpenDeleteDialog(true);
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    if (deleteOrderId !== null) {
      deleteOrder({ id: deleteOrderId });
    }
    setOpenDeleteDialog(false);
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  // Handle delete response
  useEffect(() => {
    if (deleteResponse) {
      dispatch(
        openSnackbar({
          severity: "success",
          message: deleteResponse?.message,
        })
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
  }, [deleteResponse, deleteError]);
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
          <Button
            variant="contained"
            onClick={() => handleOpenWishlistModal("add")}
          >
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
        mode={wishlistMode}
        wishlistItem={selectedOrder}
      />

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this product?</Typography>
          <Typography>
            Please make sure the jobworker is informed about this change.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default orders;
