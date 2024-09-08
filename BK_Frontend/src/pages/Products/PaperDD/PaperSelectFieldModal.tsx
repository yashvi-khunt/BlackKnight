// PaperSelectFieldModal.tsx
import { Box, Typography, Modal, Button } from "@mui/material";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormInputText } from "../../../components/form";
import {
  useAddPaperTypeMutation,
  useGetPaperTypeByIdQuery,
  useUpdatePaperTypeMutation,
} from "../../../redux/api/paperApi";
import { useAppDispatch } from "../../../redux/hooks";
import { openSnackbar } from "../../../redux/slice/snackbarSlice";

interface PaperSelectFieldModalProps {
  open: boolean;
  handleClose: () => void;
  paperTypeId?: number;
  mode: "add" | "edit";
}

function PaperSelectFieldModal({
  open,
  handleClose,
  paperTypeId,
  mode,
}: PaperSelectFieldModalProps) {
  const { control, register, handleSubmit, reset } = useForm();
  const [addPaperType, { error: addError, data: addResponse }] =
    useAddPaperTypeMutation();
  const [updatePaperType, { error: updateError, data: updateResponse }] =
    useUpdatePaperTypeMutation();
  const { data: paperTypeData } = useGetPaperTypeByIdQuery(paperTypeId!, {
    skip: mode === "add",
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (paperTypeId && mode === "edit" && paperTypeData) {
      reset({ ...paperTypeData?.data });
    } else if (mode === "add") {
      reset({
        type: "",
        bf: "",
        price: 0,
        laminationPercent: 0,
      });
    }
  }, [paperTypeData, reset]);

  useEffect(() => {
    if (addResponse) {
      dispatch(
        openSnackbar({ severity: "success", message: addResponse.message })
      );
      handleClose();
    }
    if (addError) {
      dispatch(
        openSnackbar({
          severity: "error",
          message: (addError as any).data?.message,
        })
      );
    }
  }, [addResponse, addError, dispatch, handleClose]);

  useEffect(() => {
    if (updateResponse) {
      dispatch(
        openSnackbar({ severity: "success", message: updateResponse.message })
      );
      handleClose();
    }
    if (updateError) {
      dispatch(
        openSnackbar({
          severity: "error",
          message: (updateError as any).data?.message,
        })
      );
    }
  }, [updateResponse, updateError, dispatch, handleClose]);

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    if (mode === "add") {
      addPaperType(data);
    } else if (mode === "edit" && paperTypeId) {
      updatePaperType({ id: paperTypeId, data });
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          {`${mode === "add" ? "Add" : "Edit"} Paper Type`}
        </Typography>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: "100%" } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInputText
            control={control}
            label="Type"
            value={paperTypeData?.data?.type}
            {...register("type", { required: "Type is required" })}
          />
          <FormInputText
            control={control}
            value={paperTypeData?.data?.bf}
            label="BF"
            type="number"
            placeholder="16"
            // {...register("bf", { required: "BF is required" })}
            {...register("bf", {})}
          />
          <FormInputText
            control={control}
            label="Price"
            type="number"
            value={paperTypeData?.data?.price.toString()}
            {...register("price", { required: "Price is required" })}
          />
          <FormInputText
            name="laminationPercent"
            control={control}
            label="Lamination Percent"
            type="number"
            value={paperTypeData?.data?.laminationPercent.toString()}
            // {...register("laminationPercent", { required: "Price is required" })}
          />
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button color="inherit" variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ ml: 2 }}
              type="submit"
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default PaperSelectFieldModal;
