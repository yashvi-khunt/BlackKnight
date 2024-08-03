import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Grid,
  Typography,
  Button,
  Switch,
  FormControlLabel,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from "../../redux/api/productApi";
import {
  useGetClientOptionsQuery,
  useGetJobworkerOptionsQuery,
  useGetPaperTypesQuery,
  useGetPrintTypesQuery,
} from "../../redux/api/helperApi";
import ClientBrandSelect from "./ClientBrandSelect";
import { FormInputText, FormImageUpload } from "../../components/form";
import SelectField from "./SelectField";

const AddEditProducts = ({ isEdit, productData }) => {
  const { control, register, handleSubmit, setValue } = useForm({
    defaultValues: productData || {},
  });

  const [addProductMutation] = useAddProductMutation();
  const [updateProductMutation] = useUpdateProductMutation();
  const { data: clients } = useGetClientOptionsQuery();
  const { data: jobworkers } = useGetJobworkerOptionsQuery();
  const [selectedClient, setSelectedClient] = useState(
    productData?.clientId || null
  );

  const [images, setImages] = useState(
    productData?.images?.map((img) => img.imagePath) || [null, null, null, null]
  );
  const [previewImages, setPreviewImages] = useState(
    productData?.images?.map((img) => img.imagePath) || ["", "", "", ""]
  );

  const navigate = useNavigate();

  // Fetch paper types
  const { data: paperTypesData } = useGetPaperTypesQuery();

  // Fetch print types
  const { data: printTypesData } = useGetPrintTypesQuery();

  const handleSubmitForm = async (data) => {
    console.log(data);
    const formData = {
      ...data,
      topPaperTypeId: data.topPaperTypeId.value as number,
      flutePaperTypeId: data.flutePaperTypeId.value,
      backPaperTypeId: data.backPaperTypeId.value,
      jobWorkerId: data.jobWorkerId.value,
      linerJobworkerId: data.linerJobworkerId?.value || null,
      printTypeId: data.printTypeId.value,
      images: images
        .map((image, idx) => ({ imagePath: image, isPrimary: idx === 0 }))
        .filter((image) => image.imagePath),
    };

    console.log(formData);

    if (isEdit) {
      console.log("edit");
      await updateProductMutation({ data: formData, id: productData.id });
    } else {
      console.log("add");
      await addProductMutation(formData);
    }

    //navigate("/products");
  };

  return (
    <Container
      maxWidth="lg"
      component="form"
      noValidate
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <Box p={2}>
        <Typography variant="h4">
          {isEdit ? "Edit Product" : "Add Product"}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormInputText
              control={control}
              label="Box Name"
              value={productData?.boxName}
              placeholder="Enter Box Name"
              {...register("boxName", {
                required: { value: true, message: "Box name is required." },
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectField
              value={productData?.topPaperTypeId}
              control={control}
              options={paperTypesData?.data || []}
              label="Top Paper Type"
              {...register("topPaperTypeId", {
                required: {
                  value: true,
                  message: "Top Paper type is required.",
                },
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectField
              value={productData?.flutePaperTypeId}
              control={control}
              options={paperTypesData?.data || []}
              label="Flute Paper Type"
              {...register("flutePaperTypeId", {
                required: {
                  value: true,
                  message: "Top Paper type is required.",
                },
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectField
              value={productData?.backPaperTypeId}
              control={control}
              options={paperTypesData?.data || []}
              label="Back Paper Type"
              {...register("backPaperTypeId", {
                required: {
                  value: true,
                  message: "Top Paper type is required.",
                },
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInputText
              name="length"
              control={control}
              label="Length"
              value={productData?.length}
              placeholder="Enter Length"
              // {...register("flutePaperTypeId", {
              //   pattern: {
              //     value: ,
              //     message: "Enter a decimal value",
              //   },
              // })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInputText
              name="width"
              control={control}
              label="Width"
              value={productData?.width}
              placeholder="Enter Width"
              // {...register("flutePaperTypeId", {
              //   pattern: {
              //     value: ,
              //     message: "Enter a decimal value",
              //   },
              // })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInputText
              name="height"
              control={control}
              label="Height"
              value={productData?.height}
              placeholder="Enter Height"
              // {...register("flutePaperTypeId", {
              //   pattern: {
              //     value: ,
              //     message: "Enter a decimal value",
              //   },
              // })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInputText
              name="flap1"
              control={control}
              label="Flap 1"
              value={productData?.flap1}
              placeholder="Enter Flap 1"
              // {...register("flutePaperTypeId", {
              //   pattern: {
              //     value: ,
              //     message: "Enter a decimal value",
              //   },
              // })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInputText
              name="flap2"
              control={control}
              label="Flap 2"
              value={productData?.flap2}
              placeholder="Enter Flap 2"
              // {...register("flutePaperTypeId", {
              //   pattern: {
              //     value: ,
              //     message: "Enter a decimal value",
              //   },
              // })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInputText
              control={control}
              label="Deckle"
              value={productData?.deckle}
              placeholder="Enter Deckle"
              {...register("deckle", {
                required: {
                  value: true,
                  message: "Deckle is required.",
                },
                // pattern: {
                //   value: ,
                //   message: "Enter a decimal value",
                // },
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInputText
              control={control}
              label="Cutting"
              value={productData?.cutting}
              placeholder="Enter Cutting"
              {...register("cutting", {
                required: {
                  value: true,
                  message: "Cutting is required.",
                },
                // pattern: {
                //   value: ,
                //   message: "Enter a decimal value",
                // },
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInputText
              control={control}
              label="Top(GSM)"
              value={productData?.top}
              placeholder="Enter Top"
              {...register("top", {
                required: {
                  value: true,
                  message: "Top is required.",
                },
                // pattern: {
                //   value: ,
                //   message: "Enter a decimal value",
                // },
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInputText
              control={control}
              label="Flute(GSM)"
              value={productData?.flute}
              placeholder="Enter Flute"
              {...register("flute", {
                required: {
                  value: true,
                  message: "Flute is required.",
                },
                // pattern: {
                //   value: ,
                //   message: "Enter a decimal value",
                // },
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInputText
              control={control}
              label="Bottom(GSM)"
              value={productData?.back}
              placeholder="Enter Bottom"
              {...register("back", {
                required: {
                  value: true,
                  message: "Bottom is required.",
                },
                // pattern: {
                //   value: ,
                //   message: "Enter a decimal value",
                // },
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInputText
              type="number"
              control={control}
              label="Sheets per Box"
              value={productData?.noOfSheetPerBox}
              placeholder="Enter Sheets per Box"
              {...register("noOfSheetPerBox", {
                required: {
                  value: true,
                  message: "No of Sheets per Box is required.",
                },
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectField
              value={productData?.printTypeId}
              control={control}
              options={printTypesData?.data || []}
              label="Print Type"
              {...register("printTypeId", {
                required: {
                  value: true,
                  message: "Print type is required.",
                },
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInputText
              name="printingPlate"
              control={control}
              label="Printing Plate"
              value={productData?.printingPlate}
              placeholder="Enter Printing Plate"
              //{...register("back", {

              // pattern: {
              //   value: ,
              //   message: "Enter a decimal value",
              // },
              // })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInputText
              control={control}
              label="Ply"
              value={productData?.ply}
              placeholder="Enter Ply"
              type="number"
              {...register("ply", {
                required: {
                  value: true,
                  message: "Ply is required.",
                },
                // pattern: {
                //   value: ,
                //   message: "Enter a decimal value",
                // },
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInputText
              control={control}
              label="Print Rate"
              value={productData?.printRate}
              placeholder="Enter Print Rate"
              {...register("printRate", {
                required: {
                  value: true,
                  message: "Bottom is required.",
                },
                // pattern: {
                //   value: ,
                //   message: "Enter a decimal value",
                // },
              })}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <SelectField
              value={productData?.jobWorkerId}
              control={control}
              options={jobworkers?.data || []}
              label="Job Worker"
              {...register("jobWorkerId", {
                required: {
                  value: true,
                  message: "Jobworker is required.",
                },
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectField
              control={control}
              options={jobworkers?.data || []}
              label="Liner Jobworker"
              value={productData?.linerJobworkerId}
              {...register("linerJobworkerId", {
                // required: {
                //   value: true,
                //   message: "Jobworker is required.",
                // },
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInputText
              control={control}
              label="Profit Percent"
              value={productData?.profitPercent}
              placeholder="Enter Profit Percent"
              {...register("profitPercent", {
                required: {
                  value: true,
                  message: "Profit percent is required.",
                },
                // pattern: {
                //   value: ,
                //   message: "Enter a decimal value",
                // },
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <FormInputText
              name="remarks"
              control={control}
              label="Remarks"
              value={productData?.remarks}
              placeholder="Enter Remarks"
            />
          </Grid>
          <Grid item xs={12}>
            <ClientBrandSelect
              control={control}
              setValue={setValue}
              clients={clients?.data || []}
              sClient={selectedClient}
              setSelectedClient={setSelectedClient}
            />
          </Grid>
          <Grid item xs={12}>
            <FormImageUpload
              images={images}
              setImages={setImages}
              previewImages={previewImages}
              setPreviewImages={setPreviewImages}
              initialImages={
                productData?.images?.map((img) => img.imagePath) || []
              }
              initialPreviewImages={
                productData?.images?.map((img) => img.imagePath) || []
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Switch {...register("isLamination")} />}
              label="Is Lamination"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {isEdit ? "Update Product" : "Add Product"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AddEditProducts;
