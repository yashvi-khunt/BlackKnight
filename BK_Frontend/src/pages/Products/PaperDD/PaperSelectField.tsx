// PaperSelectField.tsx
import { Controller } from "react-hook-form";
import {
  Autocomplete,
  createFilterOptions,
  TextField,
  IconButton,
} from "@mui/material";
import { useEffect, useState, forwardRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import PaperSelectFieldModal from "./PaperSelectFieldModal"; // Import the modal component

const filter = createFilterOptions<paperTypes.PaperTypeOptions>();

const PaperSelectField = forwardRef<
  unknown,
  {
    name: string;
    control: any;
    options: paperTypes.PaperTypeOptions[];
    label: string;
    value?: string | null;
    onAddClick?: () => void;
    onEditClick?: (option: paperTypes.PaperTypeOptions) => void;
  }
>(({ name, control, options, label, value, onAddClick, onEditClick }, ref) => {
  const [selectedValue, setValue] =
    useState<paperTypes.PaperTypeOptions | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] =
    useState<paperTypes.PaperTypeOptions | null>(null);
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

  const handleEditClick = (option: paperTypes.PaperTypeOptions) => {
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
              if (typeof newValue === "string") {
                setTimeout(() => {
                  if (onAddClick) onAddClick();
                });
              } else if (newValue && newValue.inputValue) {
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
                {option.label}
                {option.inputValue ? null : (
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEditClick(option)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
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
