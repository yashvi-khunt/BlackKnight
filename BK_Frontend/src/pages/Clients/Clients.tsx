import { useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useGetClientsQuery } from "../../redux/api/clientApi";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import Table from "../../components/dynamicTable/DynamicTable";
import ClientModal from "./ClientModal";
import { EditOutlined, InfoOutlined } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import SearchField from "../../components/dynamicTable/SearchField";

function Clients() {
  const [searchParams] = useSearchParams();
  const { data: clients, isLoading } = useGetClientsQuery({
    ...Object.fromEntries(searchParams.entries()),
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add", "edit", "view"
  const [selectedClient, setSelectedClient] = useState(null);

  const handleOpenModal = (mode, clientData = null) => {
    console.log(clientData);
    setModalMode(mode);
    setSelectedClient(clientData);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedClient(null);
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
      headerAlign: "center",
      headerName: "Phone",
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
      field: "gstNumber",
      headerAlign: "center",
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
      minWidth: 150,
      flex: 1,
    },
  ];

  const pageInfo: DynamicTable.TableProps = {
    columns: columns,
    rows: clients?.data.data,
    rowCount: clients?.data.count,
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
            size={"small"}
            label="Search here ..."
            placeholder="Company Name"
          />
        </Box>
        <Box>
          <Button variant="contained" onClick={() => handleOpenModal("add")}>
            + Add Client
          </Button>
        </Box>
      </Box>
      <Table {...pageInfo}></Table>
      <ClientModal
        open={modalOpen}
        handleClose={handleCloseModal}
        clientData={selectedClient}
        mode={modalMode}
        data={null}
      />
    </>
  );
}

export default Clients;
