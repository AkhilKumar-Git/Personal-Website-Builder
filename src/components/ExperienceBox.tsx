import { Box, Typography, InputBase, IconButton } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

interface ExperienceBoxProps {
  image: string;
  company: string;
  designation: string;
  location: string;
  timeline: string;
  description: string;
  isEditing: boolean;
  onUpdate: (updatedExperience: {
    image: string;
    company: string;
    designation: string;
    location: string;
    timeline: string;
    description: string;
  }) => void;
  onDelete: () => void;
  isFirst: boolean;
}

const ExperienceBox = ({
  image,
  company,
  designation,
  location,
  timeline,
  description,
  isEditing,
  onUpdate,
  onDelete,
  isFirst,
}: ExperienceBoxProps) => {
  const [isBoxEditing, setIsBoxEditing] = useState(false);
  const [localImage, setLocalImage] = useState(image);
  const [localCompany, setLocalCompany] = useState(company);
  const [localDesignation, setLocalDesignation] = useState(designation);
  const [localLocation, setLocalLocation] = useState(location);
  const [localTimeline, setLocalTimeline] = useState(timeline);
  const [localDescription, setLocalDescription] = useState(description);

  const handleSaveBox = () => {
    onUpdate({
      image: localImage,
      company: localCompany,
      designation: localDesignation,
      location: localLocation,
      timeline: localTimeline,
      description: localDescription,
    });
    setIsBoxEditing(false);
  };

  const handleCancelBox = () => {
    setLocalImage(image);
    setLocalCompany(company);
    setLocalDesignation(designation);
    setLocalLocation(location);
    setLocalTimeline(timeline);
    setLocalDescription(description);
    setIsBoxEditing(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        padding: "5%",
        borderRadius: "25px",
        border: "1px solid #dadada",
        boxShadow: isFirst ? "0 4px 12px rgba(0, 0, 0, 0.2)" : "none",
        backgroundColor: "#fff",
        margin: "20px",
        width: "100%", // Ensure the box width is consistent
        maxWidth: "800px", // Set a max-width to control the width
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Box
          sx={{
            width: "24px",
            height: "24px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            marginRight: "8px",
          }}
        >
          <img
            src={localImage}
            alt={localCompany}
            style={{ width: "24px", height: "24px" }}
          />
        </Box>
        {isBoxEditing ? (
          <InputBase
            fullWidth
            value={localCompany}
            onChange={(e) => setLocalCompany(e.target.value)}
            sx={{ fontSize: "16px", fontWeight: 600 }}
          />
        ) : (
          <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: 600 }}>
            {localCompany || "Enter company title"}
          </Typography>
        )}
      </Box>
      {isBoxEditing ? (
        <InputBase
          fullWidth
          value={localDesignation}
          onChange={(e) => setLocalDesignation(e.target.value)}
          sx={{ fontSize: "13px", fontWeight: 600 }}
        />
      ) : (
        <Typography
          sx={{
            fontSize: "13px",
            fontWeight: 600,
            lineHeight: "28px",
            letterSpacing: "-2%",
          }}
        >
          {localDesignation || "Enter designation"}
        </Typography>
      )}
      {isBoxEditing ? (
        <InputBase
          fullWidth
          value={localLocation}
          onChange={(e) => setLocalLocation(e.target.value)}
          sx={{ fontSize: "12px", fontWeight: 500, color: "#858585" }}
        />
      ) : (
        <Typography
          sx={{ fontSize: "12px", fontWeight: 500, color: "#858585" }}
        >
          {localLocation ? `+ ${localLocation}` : "+ Add location"} •{" "}
          {localTimeline ? `+ ${localTimeline}` : "+ Add timeline"}
        </Typography>
      )}
      {isBoxEditing ? (
        <InputBase
          fullWidth
          value={localTimeline}
          onChange={(e) => setLocalTimeline(e.target.value)}
          sx={{ fontSize: "12px", fontWeight: 500, color: "#858585", mt: 1 }}
        />
      ) : null}
      {isBoxEditing ? (
        <InputBase
          fullWidth
          value={localDescription}
          onChange={(e) => setLocalDescription(e.target.value)}
          sx={{ fontSize: "14px", fontWeight: 500, marginTop: "16px" }}
          multiline
        />
      ) : (
        <Typography
          sx={{ fontSize: "14px", fontWeight: 500, marginTop: "16px" }}
        >
          {localDescription || "Add description..."}
        </Typography>
      )}
      {isEditing && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          {isBoxEditing ? (
            <>
              <IconButton onClick={handleSaveBox}>
                <SaveIcon />
              </IconButton>
              <IconButton onClick={handleCancelBox}>
                <CancelIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton onClick={() => setIsBoxEditing(true)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={onDelete}>
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ExperienceBox;
