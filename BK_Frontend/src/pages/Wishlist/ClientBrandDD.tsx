import { Grid, Autocomplete, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import {
  useGetBrandsQuery,
  useGetProductOptionsQuery,
} from "../../redux/api/helperApi";
import { useAppSelector } from "../../redux/hooks";

const ClientBrandDD = ({
  control,
  setValue,
  clients,
  sClient,
  isEdit,
  productData,
}) => {
  const userRole = useAppSelector((state) => state.auth?.userData?.role);
  const userId = useAppSelector((state) => state.auth?.userData?.id);
  const [selectedClient, setSelectedClient] = useState(
    productData?.clientId || null
  );
  const [brandOptions, setBrandOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(
    productData?.brandId || null
  );
  const [selectedProduct, setSelectedProduct] = useState(
    productData?.productId || null
  );

  // Conditionally use userId or selectedClient for fetching brands
  const { data: brands, refetch: refetchBrands } = useGetBrandsQuery(
    userRole === "Admin" ? selectedClient : userId, // Fetch based on role
    {
      skip: userRole === "Admin" && !selectedClient, // Only skip if admin and no client is selected
    }
  );

  const { data: products } = useGetProductOptionsQuery(selectedBrand, {
    skip: !selectedBrand,
  });

  useEffect(() => {
    if (products) {
      setProductOptions(products?.data);
    }
  }, [products]);

  useEffect(() => {
    if (brands) {
      setBrandOptions(brands?.data);
    }
  }, [brands]);

  const handleProductChange = (_, newValue) => {
    setSelectedProduct(newValue ? newValue.value : "");
    setValue("productId", newValue ? newValue.value : "");
  };

  const handleClientChange = (_, newValue) => {
    setSelectedClient(newValue ? newValue.value : "");
    setValue("clientId", newValue ? newValue.value : "");
    refetchBrands(); // Refetch brands when client changes
  };

  const handleBrandChange = (_, newValue) => {
    setSelectedBrand(newValue ? newValue.value : "");
    setValue("brandId", newValue ? newValue.value : "");
  };

  return (
    <Grid container spacing={2}>
      {/* Conditionally render the client dropdown if the user is an admin */}
      {userRole === "Admin" && (
        <Grid item xs={12}>
          <Controller
            name="clientId"
            control={control}
            render={({ field }) => (
              <Autocomplete
                disabled={isEdit}
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
      )}

      {/* The brand dropdown is always shown, but disabled for admin until a client is selected */}
      <Grid item xs={12}>
        <Controller
          name="brandId"
          control={control}
          render={({ field }) => (
            <Autocomplete
              disabled={isEdit || (userRole === "admin" && !selectedClient)} // Disable if admin and no client
              {...field}
              options={brandOptions}
              value={brandOptions.find((x) => x.value === selectedBrand) || ""}
              getOptionLabel={(option) => option.label || ""}
              onChange={handleBrandChange}
              renderInput={(params) => (
                <TextField {...params} label="Brand" variant="outlined" />
              )}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          name="productId"
          control={control}
          disabled={isEdit}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={productOptions}
              value={
                productOptions.find((x) => x.value === selectedProduct) || ""
              }
              getOptionLabel={(option) => option.label || ""}
              onChange={handleProductChange}
              renderInput={(params) => (
                <TextField {...params} label="Product" variant="outlined" />
              )}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default ClientBrandDD;
