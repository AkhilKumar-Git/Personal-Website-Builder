import { Box, Typography, InputBase, IconButton } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { handleSave } from "../components/GlobalFunctions";

interface ConnectData {
  title: string;
  description: string;
  platform: {
    name: string;
    logo: string;
    link: string;
  };
}

interface ConnectProps {
  connect: ConnectData;
  isEditing: boolean;
  setData: (data: ConnectData) => void;
}

const ConnectSection = ({ connect, isEditing, setData }: ConnectProps) => {
  const [localConnect, setLocalConnect] = useState(connect);
  const [isBoxEditing, setIsBoxEditing] = useState(false);

  const handleChange = async (field: string, value: string) => {
    if (field.startsWith("platform.")) {
      const platformField = field.split(".")[1];
      setLocalConnect((prevState) => ({
        ...prevState,
        platform: { ...prevState.platform, [platformField]: value },
      }));

      if (platformField === "link") {
        try {
          const response = await axios.get(
            `https://favicongrabber.com/api/grab/${new URL(value).hostname}`
          );
          const favicons = response.data.icons;
          const titleResponse = await axios.get(value);
          const parser = new DOMParser();
          const doc = parser.parseFromString(titleResponse.data, "text/html");
          const title = doc.querySelector("title")?.textContent || "No Title";

          setLocalConnect((prevState) => ({
            ...prevState,
            platform: {
              ...prevState.platform,
              name: title,
              logo: favicons[0]?.src || "",
            },
          }));
        } catch (error) {
          console.error("Failed to fetch favicon or title:", error);
        }
      }
    } else {
      setLocalConnect((prevState) => ({ ...prevState, [field]: value }));
    }
  };

  const handleEditClick = () => {
    setIsBoxEditing(true);
  };

  const handleSaveClick = () => {
    handleSave();
    setIsBoxEditing(false);
    setData(localConnect);
  };

  const handleCancelClick = () => {
    setIsBoxEditing(false);
    setLocalConnect(connect);
  };

  return (
    <Box sx={{ padding: "40px 0", position: "relative" }}>
      {isEditing && (
        <Box sx={{ position: "absolute", top: -40, right: 0, display: "flex" }}>
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
            <IconButton onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
          )}
        </Box>
      )}
      {isBoxEditing ? (
        <>
          <InputBase
            value={localConnect.title}
            onChange={(e) => handleChange("title", e.target.value)}
            fullWidth
            sx={{
              fontSize: "30px",
              fontWeight: 700,
              lineHeight: "28px",
              borderRadius: "5px",
              padding: "5px",
            }}
          />
          <InputBase
            value={localConnect.description}
            onChange={(e) => handleChange("description", e.target.value)}
            fullWidth
            sx={{
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "30px",
              borderRadius: "5px",
              padding: "5px",
            }}
          />
        </>
      ) : (
        <>
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: 700,
              lineHeight: "28px",
              marginBottom: "20px",
            }}
          >
            {localConnect.title}
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "30px",
              marginBottom: "40px",
            }}
          >
            {localConnect.description}
          </Typography>
        </>
      )}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            width: "72px",
            height: "72px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            marginRight: "16px",
          }}
        >
          <img
            src={localConnect.platform.logo}
            alt={localConnect.platform.name}
            style={{ width: "72px", height: "72px" }}
          />
        </Box>
        {isBoxEditing ? (
          <>
            <InputBase
              value={localConnect.platform.link}
              onChange={(e) => handleChange("platform.link", e.target.value)}
              fullWidth
              sx={{
                fontSize: "16px",
                fontWeight: 400,
                marginTop: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "5px",
              }}
            />
          </>
        ) : (
          <a
            href={localConnect.platform.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                color: "black",
                lineHeight: "30px",
                marginRight: "8px",
              }}
            >
              See you there
            </Typography>
            <span>
              <OpenInNewIcon />
            </span>
          </a>
        )}
      </Box>
    </Box>
  );
};

export default ConnectSection;
