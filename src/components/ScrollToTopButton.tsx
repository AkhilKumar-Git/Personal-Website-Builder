import { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 3000) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "8%",
        right: "8%",
        display: isVisible ? "flex" : "none",
        backgroundColor: "#E7E7E7",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <IconButton onClick={handleScrollToTop} sx={{ padding: "12px" }}>
        <ArrowUpwardOutlinedIcon sx={{ fontSize: "24px" }} />
      </IconButton>
    </Box>
  );
};

export default ScrollToTopButton;
