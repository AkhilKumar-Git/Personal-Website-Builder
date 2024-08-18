import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";

interface SiteBuilderNavbarProps {
  onSave: () => void;
  onPublish: () => void;
}

const SiteBuilderNavbar = ({ onSave, onPublish }: SiteBuilderNavbarProps) => {
  const [visible, setVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY) {
        // Scrolling up
        setVisible(true);
      } else {
        // Scrolling down
        setVisible(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#333",
        boxShadow: "none",
        transition: "transform 0.3s ease-in-out",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        top: 0,
        zIndex: 1100,
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: "#fff" }}>
          Site Builder
        </Typography>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button sx={{ color: "#fff" }} onClick={onSave}>
            Save
          </Button>
          <Button sx={{ color: "#fff" }} onClick={onPublish}>
            Publish
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default SiteBuilderNavbar;
