import { Controller } from "react-hook-form";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useGetBrandsQuery } from "../../redux/api/helperApi";

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
      console.log(productData.brandId, brand);
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

  return (
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
              onChange={handleBrandChange}
              renderInput={(params) => (
                <TextField {...params} label="Brand" variant="outlined" />
              )}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default ClientBrandSelect;
