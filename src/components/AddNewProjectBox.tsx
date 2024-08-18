import { Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface AddNewProjectBoxProps {
  onClick: () => void;
}

const AddNewProjectBox = ({ onClick }: AddNewProjectBoxProps) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: "100%",
        height: "100%",
        minHeight: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "25px",
        border: "1px dashed #dadada",
        backgroundColor: "#f5f5f5",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#e0e0e0",
        },
      }}
    >
      <AddIcon sx={{ fontSize: 40, color: "#757575" }} />
      <Typography sx={{ color: "#757575", mt: 1 }}>Add new card</Typography>
    </Box>
  );
};

export default AddNewProjectBox;
