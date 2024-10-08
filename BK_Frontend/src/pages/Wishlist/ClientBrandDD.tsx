import { Controller } from "react-hook-form";
import { Autocomplete, Grid, TextField, Box } from "@mui/material";
import { useState, useEffect } from "react";
import {
  useGetBrandsQuery,
  useGetProductOptionsQuery,
} from "../../redux/api/helperApi";

const ClientBrandDD = ({
  control,
  setValue,
  clients,
  sClient,
  isEdit,
  productData,
}) => {
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

  const { data: brands, refetch } = useGetBrandsQuery(selectedClient, {
    skip: !selectedClient,
  });

  const { data: products } = useGetProductOptionsQuery(selectedBrand, {
    skip: !selectedBrand,
  });

  useEffect(() => {
    if (products) {
      setProductOptions(products?.data);
    }
  }, [products]);
  //   useEffect(() => {
  //     if (sClient || (isEdit && productData?.clientId)) {
  //       const client = clients.find(
  //         (client) => client.value === (sClient || productData.clientId)
  //       );
  //       setSelectedClient(client ? client.value : "");
  //     }
  //   }, [sClient, isEdit, productData, clients]);

  useEffect(() => {
    if (brands) {
      setBrandOptions(brands?.data);
    }
  }, [brands]);

  const handleProductChange = (_, newValue) => {
    setSelectedProduct(newValue ? newValue.value : "");
    setValue("productId", newValue ? newValue.value : "");
  };

  //   useEffect(() => {
  //     if (isEdit && productData?.brandId) {
  //       const brand = brands?.data.find(
  //         (brand) => brand.value == productData.brandId
  //       );
  //       setSelectedBrand(brand ? brand : "");
  //     }
  //   }, [isEdit, productData, brands]);

  const handleClientChange = (_, newValue) => {
    setSelectedClient(newValue ? newValue.value : "");
    setValue("clientId", newValue ? newValue.value : "");
    refetch();
  };

  const handleBrandChange = (_, newValue) => {
    setSelectedBrand(newValue ? newValue.value : "");
    setValue("brandId", newValue ? newValue.value : "");
    refetch();
  };

  return (
    <Grid container spacing={2}>
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
      <Grid item xs={12}>
        <Controller
          name="brandId"
          control={control}
          render={({ field }) => (
            <Autocomplete
              disabled={isEdit}
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
