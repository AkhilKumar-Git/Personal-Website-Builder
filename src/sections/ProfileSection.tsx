import { useState } from "react";
import {
  Box,
  Avatar,
  IconButton,
  Typography,
  TextField,
  Popover,
  Button,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

interface Profile {
  name: string;
  image: string;
  email: string;
  socials: { [key: string]: string };
}

interface ProfileProps {
  profileObject: Profile;
  isEditing: boolean;
  setData: (data: Profile) => void;
}

const ProfileSection = ({
  profileObject,
  isEditing,
  setData,
}: ProfileProps) => {
  const [hover, setHover] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [newPlatform, setNewPlatform] = useState("");
  const [newLink, setNewLink] = useState("");

  const handleChange = (name: string, value: string) => {
    setData({ ...profileObject, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (upload) => {
        if (upload.target?.result) {
          const base64Image = upload.target.result as string;
          setData({ ...profileObject, image: base64Image });
        }
      };
      reader.readAsDataURL(file); // This will read the image file as a base64 encoded string
    }
  };

  const handleSocialChange = () => {
    if (newPlatform && newLink) {
      setData({
        ...profileObject,
        socials: {
          ...profileObject.socials,
          [newPlatform.toLowerCase()]: newLink,
        },
      });
    }
    setAnchorEl(null);
    setNewPlatform("");
    setNewLink("");
  };

  const handleSocialDelete = (platform: string) => {
    const updatedSocials = { ...profileObject.socials };
    delete updatedSocials[platform];
    setData({
      ...profileObject,
      socials: updatedSocials,
    });
  };

  const handleSocialButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const getIcon = (platform: string) => {
    switch (platform) {
      case "linkedin":
        return <LinkedInIcon />;
      case "twitter":
        return <TwitterIcon />;
      case "github":
        return <GitHubIcon />;
      case "instagram":
        return <InstagramIcon />;
      case "youtube":
        return <YouTubeIcon />;
      default:
        return null;
    }
  };

  const getIconStyle = (platform: string) => {
    switch (platform) {
      case "linkedin":
        return { backgroundColor: "#0077b5", color: "#fff" };
      case "twitter":
        return { backgroundColor: "#1DA1F2", color: "#fff" };
      case "github":
        return { backgroundColor: "#333", color: "#fff" };
      case "instagram":
        return {
          background: "linear-gradient(45deg, #833ab4, #fd1d1d, #fcb045)",
          color: "#fff",
        };
      case "youtube":
        return { backgroundColor: "#FF0000", color: "#fff" };
      default:
        return { backgroundColor: "#000", color: "#fff" };
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 295,
          height: 295,
          borderRadius: "25px",
          boxShadow: hover
            ? "0 4px 8px rgba(0,0,0,0.3)"
            : "0 4px 8px rgba(0,0,0,0.1)",
          marginBottom: "1em",
          overflow: "hidden",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Avatar
          alt={profileObject.name || "Your name here"}
          src={profileObject.image || "/path/to/default-image.png"}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "15px",
          }}
        />
        {isEditing && hover && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="image-upload"
              onChange={handleImageUpload}
            />
            <label
              htmlFor="image-upload"
              style={{ color: "#fff", cursor: "pointer" }}
            >
              Upload Image
            </label>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", pr: "2em" }}>
          {isEditing ? (
            <TextField
              value={profileObject.name || "Your name here"}
              onChange={(e) => handleChange("name", e.target.value)}
              variant="standard"
              fullWidth
              InputProps={{
                disableUnderline: true,
                style: { fontSize: "18px", cursor: "pointer" },
              }}
              placeholder="Your name here"
            />
          ) : (
            <Typography variant="h6">
              {profileObject.name || "Your name here"}
            </Typography>
          )}
          {isEditing ? (
            <TextField
              value={profileObject.email || "Enter email"}
              onChange={(e) => handleChange("email", e.target.value)}
              variant="standard"
              fullWidth
              InputProps={{
                disableUnderline: true,
                style: { fontSize: "14px", cursor: "pointer" },
              }}
              placeholder="Enter email"
            />
          ) : (
            <Typography variant="body1" color="textSecondary">
              {profileObject.email || "Enter email"}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {Object.keys(profileObject.socials).map((platform) => (
            <Box key={platform} sx={{ position: "relative", display: "flex" }}>
              <IconButton
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  marginRight: "0.5rem",
                  ...getIconStyle(platform),
                }}
                onClick={() =>
                  window.open(profileObject.socials[platform], "_blank")
                }
              >
                {getIcon(platform)}
              </IconButton>
              {isEditing && (
                <IconButton
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    position: "absolute",
                    top: -5,
                    right: -5,
                    backgroundColor: "#ff0000",
                    color: "#fff",
                  }}
                  onClick={() => handleSocialDelete(platform)}
                >
                  <DeleteIcon sx={{ fontSize: "12px" }} />
                </IconButton>
              )}
            </Box>
          ))}
          {isEditing && Object.keys(profileObject.socials).length < 4 && (
            <IconButton
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: "#000",
                color: "#fff",
              }}
              onClick={handleSocialButtonClick}
            >
              <AddIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 2 }}>
          <TextField
            label="Social Platform"
            value={newPlatform}
            onChange={(e) => setNewPlatform(e.target.value)}
            fullWidth
          />
          <TextField
            label="Social Link"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
          <Button
            onClick={handleSocialChange}
            sx={{ mt: 2 }}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </Box>
      </Popover>
    </Box>
  );
};

export default ProfileSection;
