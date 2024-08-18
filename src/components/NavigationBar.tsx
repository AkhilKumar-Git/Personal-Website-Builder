import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";

interface NavigationBarProps {
  sections: string[];
  profileName: string;
}
const capitalize = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const NavigationBar = ({ sections, profileName }: NavigationBarProps) => {
  const handleScroll = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ffffff",
        boxShadow: "none",
        padding: "2%",
      }}
    >
      <Toolbar sx={{ flexGrow: 1, color: "black", paddingLeft: "5%" }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {profileName}
        </Typography>
        <Box>
          {sections.map((section, index) => (
            <Button
              key={index}
              color="inherit"
              onClick={() => handleScroll(section)}
            >
              {capitalize(section)}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
