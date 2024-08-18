import { Box, IconButton, InputBase, Typography, Button } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface ProjectBoxProps {
  project: Project;
  isEditing: boolean; // Global editing mode
  isBoxEditing: boolean; // Individual box editing mode
  onUpdate: (updatedProject: Project) => void;
  onEdit: () => void;
  onDelete: () => void;
  onSave: () => void;
  onCancel: () => void;
}

interface Project {
  image: string;
  title: string;
  link: string;
  description: string;
}

const ProjectBox = ({
  project,
  isEditing,
  isBoxEditing,
  onUpdate,
  onEdit,
  onDelete,
  onSave,
  onCancel,
}: ProjectBoxProps) => {
  const [localTitle, setLocalTitle] = useState(project.title);
  const [localLink, setLocalLink] = useState(project.link);
  const [localDescription, setLocalDescription] = useState(project.description);

  const handleSave = () => {
    onUpdate({
      ...project,
      title: localTitle,
      link: localLink,
      description: localDescription,
    });
    onSave();
  };

  const handleCancel = () => {
    setLocalTitle(project.title);
    setLocalLink(project.link);
    setLocalDescription(project.description);
    onCancel();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        padding: "5%",
        borderRadius: "16px",
        border: "1px solid #DADADA",
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      {isEditing && !isBoxEditing && (
        <Box sx={{ position: "absolute", top: 8, right: 8 }}>
          <IconButton onClick={onDelete} size="small">
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={onEdit} size="small">
            <EditIcon />
          </IconButton>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Box
          sx={{
            width: "60px",
            height: "60px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            marginRight: "16px",
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            style={{ width: "32px", height: "32px" }}
          />
        </Box>
        {isBoxEditing ? (
          <InputBase
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
            sx={{ fontSize: "15px", fontWeight: 500, width: "100%" }}
          />
        ) : (
          <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
            {localTitle}
          </Typography>
        )}
      </Box>

      {isBoxEditing ? (
        <>
          <InputBase
            value={localLink}
            onChange={(e) => setLocalLink(e.target.value)}
            sx={{ fontSize: "14px", fontWeight: 400, color: "#999999" }}
          />
          <InputBase
            value={localDescription}
            onChange={(e) => setLocalDescription(e.target.value)}
            sx={{
              fontSize: "13px",
              fontWeight: 500,
              lineHeight: "28px",
              letterSpacing: "-2%",
              textAlign: "center",
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleCancel} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography
            sx={{ fontSize: "14px", fontWeight: 400, color: "#999999" }}
          >
            {localLink}
          </Typography>
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 500,
              lineHeight: "28px",
              letterSpacing: "-2%",
              textAlign: "center",
            }}
          >
            {localDescription}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default ProjectBox;
