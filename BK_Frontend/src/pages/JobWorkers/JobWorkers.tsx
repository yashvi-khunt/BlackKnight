import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useGetJobWorkersQuery } from "../../redux/api/jobWorkerApi";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import Table from "../../components/dynamicTable/DynamicTable";
import { EditOutlined, InfoOutlined } from "@mui/icons-material";
import JobWorkerModal from "./JobWorkerModel";

type ModalMode = "add" | "edit" | "view";
function JobWorkers() {
  const { data: jobWorkers, isLoading } = useGetJobWorkersQuery(null);
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
      minWidth: 150,
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "fluteRate",
      headerName: "Flute Rate",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "linerRate",
      headerName: "Liner Rate",
      renderCell: ({ value }) => {
        return value === null ? "-" : value;
      },
      minWidth: 150,
      flex: 1,
    },
    {
      field: "gstNumber",
      headerName: "GST Number",
      renderCell: ({ value }) => {
        return value === null || value === "" ? "-" : value;
      },
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
        alignItems="right"
      >
        <Typography variant="h5" color="initial"></Typography>
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
