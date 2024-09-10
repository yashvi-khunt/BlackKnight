import React, { useEffect } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { Upload as UploadIcon, Clear as ClearIcon } from "@mui/icons-material";

const FormImageUpload = ({
  images,
  setImages,
  previewImages,
  setPreviewImages,
  initialImages = [],
  initialPreviewImages = [],
  maxImages = 2,
  primaryImageIndex = 0,
}) => {
  useEffect(() => {
    console.log(
      initialImages,
      initialPreviewImages,
      setImages,
      setPreviewImages
    );
    // Set initial images and preview images when editing
    if (initialImages.length > 0) {
      setImages(initialImages);
    }
    if (initialPreviewImages.length > 0) {
      setPreviewImages(initialPreviewImages);
    }
  }, []);

  const handleImageChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result as string;
        setImages(newImages);

        const newPreviewImages = [...previewImages];
        newPreviewImages[index] = URL.createObjectURL(file);
        setPreviewImages(newPreviewImages);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleRemoveImage = (index: number) => {
  //   const newImages = [...images];
  //   newImages[index] = null;
  //   setImages(newImages);

  //   const newPreviewImages = [...previewImages];
  //   newPreviewImages[index] = "";
  //   setPreviewImages(newPreviewImages);
  // };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);

    const newPreviewImages = previewImages.filter((_, i) => i !== index);
    setPreviewImages(newPreviewImages);
  };

  return (
    <Box display="flex" flexWrap="wrap" gap={5}>
      {[...Array(maxImages)].map((_, index) => (
        <Box position="relative" key={index}>
          <Button
            variant="contained"
            component="label"
            startIcon={<UploadIcon />}
          >
            {index === primaryImageIndex
              ? "Upload Primary Image"
              : `Upload Secondary Image`}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(event) => handleImageChange(index, event)}
            />
          </Button>
          {previewImages[index] && (
            <Box position="relative" mt={1}>
              <IconButton
                size="small"
                style={{ position: "absolute", top: 0, right: 0 }}
                onClick={() => handleRemoveImage(index)}
              >
                <ClearIcon />
              </IconButton>
              <img
                src={previewImages[index]}
                alt={`Preview`}
                style={{
                  maxWidth: "300px",
                  maxHeight: "300px",
                }}
              />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default FormImageUpload;
