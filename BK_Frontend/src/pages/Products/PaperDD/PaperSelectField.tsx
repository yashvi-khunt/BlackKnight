// PaperSelectField.tsx
import { Controller } from "react-hook-form";
import {
  Autocomplete,
  createFilterOptions,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import { useEffect, useState, forwardRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import PaperSelectFieldModal from "./PaperSelectFieldModal"; // Import the modal component

const filter = createFilterOptions<Global.EditableDDOptions>();

const PaperSelectField = forwardRef<
  unknown,
  {
    name: string;
    control: any;
    options: Global.EditableDDOptions[];
    label: string;
    value?: string | null;
    onAddClick?: () => void;
    onEditClick?: (option: Global.EditableDDOptions) => void;
  }
>(({ name, control, options, label, value, onAddClick, onEditClick }, ref) => {
  const [selectedValue, setValue] = useState<Global.EditableDDOptions | null>(
    null
  );
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState<Global.EditableDDOptions | null>(
    null
  );
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  useEffect(() => {
    if (!value || !options) return;
    const vl = options.find((x) => x.value == value);
    setValue(vl || null);
  }, [value, options]);

  const handleAddClick = () => {
    setModalMode("add");
    setOpenModal(true);
  };

  const handleEditClick = (option: Global.EditableDDOptions) => {
    setModalData(option);
    setModalMode("edit");
    setOpenModal(true);
    if (onEditClick) onEditClick(option);
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={options}
            value={selectedValue}
            getOptionLabel={(option) => option.label || ""}
            renderInput={(params) => <TextField {...params} label={label} />}
            onChange={(event, newValue) => {
              // if (typeof newValue === "string") {
              //   setTimeout(() => {
              //     if (onAddClick) onAddClick();
              //   });
              // } else
              if (newValue && newValue.inputValue) {
                handleAddClick();
              } else {
                setValue(newValue);
                field.onChange(newValue);
              }
            }}
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
                      onClick={() => handleEditClick(option)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </Box>
              </li>
            )}
            ref={ref}
          />
        )}
      />
      {openModal && (
        <PaperSelectFieldModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
          paperTypeId={parseInt(modalData?.value)}
          mode={modalMode}
        />
      )}
    </>
  );
});

export default PaperSelectField;
