import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
  useGetJobWorkerOptionsQuery,
  useGetPaperTypesQuery,
  useGetPrintTypesQuery,
} from "../../redux/api/helperApi";
import ClientBrandSelect from "./ClientBrandSelect/ClientBrandSelect";
import { FormInputText, FormImageUpload } from "../../components/form";
import SelectField from "./SelectField";
import { openSnackbar } from "../../redux/slice/snackbarSlice";
import { useAppDispatch } from "../../redux/hooks";
import PaperSelectField from "./PaperDD/PaperSelectField";

const AddEditProducts = ({ isEdit, productData }) => {
  const { control, register, handleSubmit, setValue } = useForm({
    defaultValues: productData || {},
  });

  const [addProductMutation, { error: addError, data: addResponse }] =
    useAddProductMutation();
  const [updateProductMutation, { error: updateError, data: updateResponse }] =
    useUpdateProductMutation();
  const { data: clients } = useGetClientOptionsQuery();
  const { data: jobWorkers } = useGetJobWorkerOptionsQuery();
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
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (addResponse) {
      dispatch(
        openSnackbar({
          severity: "success",
          message: addResponse.message,
        })
      );
      navigate("/products");
    }
    if (addError) {
      dispatch(
        openSnackbar({
          severity: "error",
          message: (addError as any)?.data?.message,
        })
      );
      console.log("error"); /// toast
    }
  }, [addResponse, (addError as any)?.data]);

  useEffect(() => {
    if (updateResponse) {
      dispatch(
        openSnackbar({
          severity: "success",
          message: updateResponse?.message,
        })
      );
      navigate("/products");
    }
    if (updateError) {
      dispatch(
        openSnackbar({
          severity: "error",
          message: (updateError as any)?.data?.message,
        })
      );
      console.log("error");
    }
  }, [updateResponse, (updateError as any)?.data]);
  // Fetch paper types
  const { data: paperTypesData } = useGetPaperTypesQuery();

  // Fetch print types
  const { data: printTypesData } = useGetPrintTypesQuery();

  const handleSubmitForm = (data) => {
    console.log(data);
    const formData = {
      ...data,
      topPaperTypeId: data.topPaperTypeId.value as number,
      flutePaperTypeId: data.flutePaperTypeId.value,
      backPaperTypeId: data.backPaperTypeId.value,
      jobWorkerId: data.jobWorkerId.value,
      linerJobWorkerId: data.linerJobWorkerId?.value || null,
      printTypeId: data.printTypeId.value,
      images: images
        .map((image, idx) => ({ imagePath: image, isPrimary: idx === 0 }))
        .filter((image) => image.imagePath),
    };

    console.log(formData);

    // if (isEdit) {
    //   console.log("edit");
    //   updateProductMutation({ data: formData, id: productData.id });
    // } else {
    //   console.log("add", formData);
    //   addProductMutation(formData);
    // }
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
            <PaperSelectField
              value={productData?.topPaperTypeId}
              control={control}
              name="topPaperTypeId"
              label="Top Paper Type"
              options={
                (paperTypesData?.data as Global.EditableDDOptions[]) || []
              }
              {...register("topPaperTypeId", {
                required: {
                  value: true,
                  message: "Top Paper type is required.",
                },
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PaperSelectField
              value={productData?.topPaperTypeId}
              control={control}
              name="flutePaperTypeId"
              label="Flute Paper Type"
              options={
                (paperTypesData?.data as Global.EditableDDOptions[]) || []
              }
              {...register("flutePaperTypeId", {
                required: {
                  value: true,
                  message: "Flute Paper type is required.",
                },
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PaperSelectField
              value={productData?.backPaperTypeId}
              control={control}
              name="backPaperTypeId"
              label="Back Paper Type"
              options={
                (paperTypesData?.data as Global.EditableDDOptions[]) || []
              }
              {...register("backPaperTypeId", {
                required: {
                  value: true,
                  message: "Back Paper type is required.",
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
              options={jobWorkers?.data || []}
              label="Job Worker"
              {...register("jobWorkerId", {
                required: {
                  value: true,
                  message: "JobWorker is required.",
                },
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectField
              control={control}
              options={jobWorkers?.data || []}
              label="Liner JobWorker"
              value={productData?.linerJobWorkerId}
              {...register("linerJobWorkerId", {
                // required: {
                //   value: true,
                //   message: "JobWorker is required.",
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
              // setSelectedClient={setSelectedClient}
              isEdit={isEdit}
              productData={productData}
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
