import { Box, Typography, IconButton, InputBase } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

interface Blog {
  image: string;
  title: string;
  link: string;
}

interface BlogBoxProps {
  blog: Blog;
  isEditing: boolean;
  onChange: (field: string, value: string) => void;
  onDelete: () => void;
}

const BlogBox = ({ blog, isEditing, onChange, onDelete }: BlogBoxProps) => {
  const [isBoxEditing, setIsBoxEditing] = useState(false);

  const handleEditClick = () => {
    setIsBoxEditing(true);
  };

  const handleSaveClick = () => {
    setIsBoxEditing(false);
  };

  const handleCancelClick = () => {
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
        backgroundColor: "#fff",
        margin: "20px",
        width: "42%",
        height: "15%",
        position: "relative",
      }}
    >
      {isEditing && (
        <Box sx={{ position: "absolute", top: 8, right: 8, display: "flex" }}>
          {isBoxEditing ? (
            <>
              <IconButton onClick={handleSaveClick}>
                <SaveIcon />
              </IconButton>
              <IconButton onClick={handleCancelClick}>
                <CancelIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton onClick={handleEditClick}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={onDelete}>
                <DeleteIcon />
              </IconButton>
            </>
          )}
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
            width: "120px",
            height: "120px",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            marginRight: "16px",
          }}
        >
          <img
            src={blog.image}
            alt={blog.title}
            style={{ width: "40px", height: "40px", borderRadius: "8px" }}
          />
        </Box>
        {isBoxEditing ? (
          <InputBase
            value={blog.title}
            onChange={(e) => onChange("title", e.target.value)}
            fullWidth
            sx={{ fontSize: "16px", fontWeight: 600 }}
          />
        ) : (
          <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
            {blog.title}
          </Typography>
        )}
      </Box>
      {isBoxEditing ? (
        <InputBase
          value={blog.link}
          onChange={(e) => onChange("link", e.target.value)}
          fullWidth
          sx={{ fontSize: "12px", fontWeight: 500, color: "#dadada" }}
        />
      ) : (
        <Typography
          sx={{ fontSize: "12px", fontWeight: 500, color: "#dadada" }}
        >
          <a href={blog.link} target="_blank" rel="noopener noreferrer">
            {blog.link}
          </a>
        </Typography>
      )}
    </Box>
  );
};

export default BlogBox;
