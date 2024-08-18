import React, { useState } from "react";
import {
  Box,
  Button,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CodeIcon from "@mui/icons-material/Code";
import WorkIcon from "@mui/icons-material/Work";
import LinkIcon from "@mui/icons-material/Link";
import BookmarksIcon from "@mui/icons-material/Bookmarks";

interface AddSectionButtonProps {
  onAddSection: (sectionType: string) => void;
}

const AddSectionButton: React.FC<AddSectionButtonProps> = ({
  onAddSection,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddSection = (sectionType: string) => {
    onAddSection(sectionType);
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ mt: 2, textAlign: "center" }}>
      <Button
        onClick={handleClick}
        sx={{
          border: "2px dashed #ccc",
          borderRadius: "8px",
          padding: "16px",
          width: "100%",
          color: "#666",
        }}
      >
        + Click to add sections
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List>
          <ListItem
            component="button"
            onClick={() => handleAddSection("about")}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Add About you" />
          </ListItem>
          <ListItem
            component="button"
            onClick={() => handleAddSection("skills")}
          >
            <ListItemIcon>
              <CodeIcon />
            </ListItemIcon>
            <ListItemText primary="Add Skillsets" />
          </ListItem>
          <ListItem
            component="button"
            onClick={() => handleAddSection("projects")}
          >
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Add Projects" />
          </ListItem>
          <ListItem
            component="button"
            onClick={() => handleAddSection("experience")}
          >
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Add Experience" />
          </ListItem>
          <ListItem
            component="button"
            onClick={() => handleAddSection("blogs")}
          >
            <ListItemIcon>
              <BookmarksIcon />
            </ListItemIcon>
            <ListItemText primary="Add blogs" />
          </ListItem>
          <ListItem
            component="button"
            onClick={() => handleAddSection("connect")}
          >
            <ListItemIcon>
              <LinkIcon />
            </ListItemIcon>
            <ListItemText primary="Add CTA" />
          </ListItem>
        </List>
      </Popover>
    </Box>
  );
};

export default AddSectionButton;
