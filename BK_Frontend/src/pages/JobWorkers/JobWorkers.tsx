import { useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useGetJobWorkersQuery } from "../../redux/api/jobWorkerApi";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import Table from "../../components/dynamicTable/DynamicTable";
import { EditOutlined, InfoOutlined } from "@mui/icons-material";
import JobWorkerModal from "./JobWorkerModel";
import { useSearchParams } from "react-router-dom";
import SearchField from "../../components/dynamicTable/SearchField";

type ModalMode = "add" | "edit" | "view";
function JobWorkers() {
  const [searchParams] = useSearchParams();
  const { data: jobWorkers, isLoading } = useGetJobWorkersQuery({
    ...Object.fromEntries(searchParams.entries()),
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("add"); // "add", "edit", "view"
  const [selectedJobWorker, setSelectedJobWorker] = useState(null);

  const handleOpenModal = (
    mode: ModalMode,
    jobWorkerData: jobWorkerTypes.getJobWorkers | null = null
  ) => {
    setModalMode(mode);
    setSelectedJobWorker(jobWorkerData);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedJobWorker(null);
  };

  const columns: GridColDef[] = [
    {
      field: "companyName",
      headerName: "Company Name",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "userName",
      headerName: "Username",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "userPassword",
      headerName: "Password",
      sortable: false,
      minWidth: 150,
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone",
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
      field: "fluteRate",
      headerName: "Flute Rate",
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
      field: "linerRate",
      headerName: "Liner Rate",
      headerAlign: "center",
      renderCell: ({ value }) => (
        <Grid
          container
          height="100%"
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {value === null ? "-" : value}
        </Grid>
      ),
      minWidth: 150,
      flex: 1,
    },
    {
      field: "gstNumber",
      headerAlign: "center",
      sortable: false,
      headerName: "GST Number",
      renderCell: ({ value }) => (
        <Grid
          container
          height="100%"
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {value === null || value === "" ? "-" : value}
        </Grid>
      ),
      minWidth: 150,
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 1,
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
            onClick={() => handleOpenModal("edit", params.row)}
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
            onClick={() => handleOpenModal("view", params.row)}
          />
        </Box>
      ),
    },
  ];

  const pageInfo: DynamicTable.TableProps = {
    columns: columns,
    rows: jobWorkers?.data.data,
    rowCount: jobWorkers?.data.count,
    isLoading: isLoading,
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
            size="small"
            label="Search here ..."
            placeholder="Company Name"
          />
        </Box>
        <Box>
          <Button variant="contained" onClick={() => handleOpenModal("add")}>
            + Add JobWorker
          </Button>
        </Box>
      </Box>
      <Table {...pageInfo}></Table>
      <JobWorkerModal
        open={modalOpen}
        handleClose={handleCloseModal}
        jobWorkerData={selectedJobWorker}
        mode={modalMode}
      />
    </>
  );
}

export default JobWorkers;
