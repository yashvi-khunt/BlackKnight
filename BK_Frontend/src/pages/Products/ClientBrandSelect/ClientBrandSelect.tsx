import { Controller } from "react-hook-form";
import {
  Autocomplete,
  Grid,
  TextField,
  IconButton,
  Box,
  createFilterOptions,
} from "@mui/material";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import BrandSelectModal from "./BrandSelectModal"; // Import the modal component
import { useGetBrandsQuery } from "../../../redux/api/helperApi";
const filter = createFilterOptions<Global.EditableDDOptions>();
const ClientBrandSelect = ({
  control,
  setValue,
  clients,
  sClient,
  isEdit,
  productData,
}) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [brandOptions, setBrandOptions] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  const { data: brands, refetch } = useGetBrandsQuery(selectedClient);

  useEffect(() => {
    if (sClient || (isEdit && productData?.clientId)) {
      const client = clients.find(
        (client) => client.value === (sClient || productData.clientId)
      );
      setSelectedClient(client ? client.value : "");
    }
  }, [sClient, isEdit, productData, clients]);

  useEffect(() => {
    if (brands) {
      setBrandOptions(brands?.data);
    }
  }, [brands]);

  useEffect(() => {
    if (isEdit && productData?.brandId) {
      const brand = brands?.data.find(
        (brand) => brand.value == productData.brandId
      );
      setSelectedBrand(brand ? brand : "");
    }
  }, [isEdit, productData, brands]);

  const handleClientChange = (_, newValue) => {
    setSelectedClient(newValue ? newValue.value : "");
    setValue("clientId", newValue ? newValue.value : "");
    refetch();
  };

  const handleBrandChange = (_, newValue) => {
    setSelectedBrand(newValue ? newValue : "");
    setValue("brandId", newValue ? newValue.value : "");
  };

  const handleAddBrand = () => {
    setModalMode("add");
    setOpenModal(true);
  };

  const handleEditBrand = (option) => {
    setModalData(option);
    setModalMode("edit");
    setOpenModal(true);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="clientId"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={clients}
                value={clients.find((x) => x.value === selectedClient) || ""}
                getOptionLabel={(option) => option.label || ""}
                onChange={handleClientChange}
                renderInput={(params) => (
                  <TextField {...params} label="Client" variant="outlined" />
                )}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="brandId"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={brandOptions}
                value={brandOptions.find((x) => x.value == field.value) || ""}
                getOptionLabel={(option) => option.label || ""}
                //onChange={handleBrandChange}
                onChange={(event, newValue) => {
                  if (newValue && newValue.inputValue) {
                    handleAddBrand();
                  } else {
                    handleBrandChange(event, newValue);
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Brand" variant="outlined" />
                )}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  if (params.inputValue !== "") {
                    filtered.push({
                      inputValue: params.inputValue,
                      label: `Add "${params.inputValue}"`,
                    });
                  }
                  return filtered;
                }}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <span>{option.label}</span>
                      {!option.inputValue && (
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => handleEditBrand(option)}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                    </Box>
                  </li>
                )}
              />
            )}
          />
        </Grid>
      </Grid>
      {openModal && (
        <BrandSelectModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
          clientId={selectedClient}
          mode={modalMode}
          brandData={modalData}
          options={clients}
        />
      )}
    </>
  );
};

export default ClientBrandSelect;
