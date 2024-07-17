import { useState } from "react";
import { Box, Typography, Button, Icon } from "@mui/material";
import { useGetJobworkersQuery } from "../../redux/api/jobworkerApi";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import Table from "../../components/dynamicTable/DynamicTable";
import { EditOutlined, InfoOutlined } from "@mui/icons-material";
import JobworkerModal from "./JobworkerModel";

function Jobworkers() {
  const { data: jobworkers, isLoading } = useGetJobworkersQuery(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add", "edit", "view"
  const [selectedJobworker, setSelectedJobworker] = useState(null);

  const handleOpenModal = (mode, jobworkerData = null) => {
    console.log(jobworkerData);
    setModalMode(mode);
    setSelectedJobworker(jobworkerData);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedJobworker(null);
  };

  const columns: GridColDef[] = [
    {
      field: "companyName",
      headerName: "Company Name",
      minWidth: 150,
    },
    {
      field: "userName",
      headerName: "Username",
      minWidth: 150,
    },
    {
      field: "userPassword",
      headerName: "Password",
      minWidth: 150,
    },
    {
      field: "phoneNumber",
      headerName: "Phone",
      minWidth: 150,
    },
    {
      field: "fluteRate",
      headerName: "Flute Rate",
      minWidth: 150,
    },
    {
      field: "linerRate",
      headerName: "Liner Rate",
      renderCell: ({ value }) => {
        return value === null ? "-" : value;
      },
      minWidth: 150,
    },
    {
      field: "gstNumber",
      headerName: "GST Number",
      renderCell: ({ value }) => {
        return value === null || value === "" ? "-" : value;
      },
      minWidth: 150,
    },
    {
      field: "actions",
      type: "actions",
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
    rows: jobworkers?.data.data,
    rowCount: jobworkers?.data.count,
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
            + Add Jobworker
          </Button>
        </Box>
      </Box>
      <Table {...pageInfo}></Table>
      <JobworkerModal
        open={modalOpen}
        handleClose={handleCloseModal}
        jobworkerData={selectedJobworker}
        mode={modalMode}
      />
    </>
  );
}

export default Jobworkers;
