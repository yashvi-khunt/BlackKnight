import { Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";
import { useGetBrandsQuery } from "../../redux/api/helperApi";
import { useState, useEffect } from "react";

const ClientBrandSelect = ({ control, setValue, clients }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [brandOptions, setBrandOptions] = useState([]);

  const { data: brands, refetch } = useGetBrandsQuery(selectedClient);
  console.log(selectedClient);

  useEffect(() => {
    if (brands) {
      console.log(brands);
      setBrandOptions(brands?.data);
    }
  }, [brands]);

  const handleClientChange = (event, newValue) => {
    console.log(newValue);
    setSelectedClient(newValue.value);
    refetch();
  };

  return (
    <>
      <Controller
        name="clientId"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={clients}
            getOptionLabel={(option) => option.label}
            onChange={handleClientChange}
            renderInput={(params) => (
              <TextField {...params} label="Client" variant="outlined" />
            )}
          />
        )}
      />
      <Controller
        name="brandId"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={brandOptions}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} label="Brand" variant="outlined" />
            )}
          />
        )}
      />
    </>
  );
};

export default ClientBrandSelect;
