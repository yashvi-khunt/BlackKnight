import { Container, Box, Typography, Button } from "@mui/material";
import AutoCompleteField from "../../components/dynamicTable/AutoCompleteField";
import { useGetClientsQuery } from "../../redux/api/clientApi";
import { useNavigate } from "react-router-dom";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Table from "../../components/dynamicTable/DynamicTable";

function Clients() {
  const { data: clients } = useGetClientsQuery(null);
  const navigate = useNavigate();
  console.log(clients?.data.data);

  const columns: GridColDef[] = [
    {
      field: "companyName",
      headerName: "Company Name",
    },
    {
      field: "userName",
      headerName: "Username",
    },
    {
      field: "userPassword",
      headerName: "Password",
    },
    {
      field: "phoneNumber",
      headerName: "Phone",
    },
  ];

  const rows = clients?.data.data.map((row, index) => ({ ...row, id: index }));

  const pageInfo: DynamicTable.TableProps = {
    columns: columns,
    rows: rows,
    rowCount: clients?.data.count,
  };
  return (
    <Container>
      <Box
        mb={4}
        display="flex"
        justifyContent="space-between"
        alignItems="right"
      >
        <Typography variant="h5" color="initial"></Typography>
        <Box>
          <Button variant="contained" onClick={() => navigate("/add-client")}>
            Add
          </Button>
        </Box>
      </Box>
      <Table {...pageInfo}>
        {/* <Box
          sx={{
            paddingBottom: 2,
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        ></Box> */}
      </Table>
    </Container>
  );
}

export default Clients;
