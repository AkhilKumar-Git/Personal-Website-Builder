import { Box, Typography, Grid } from "@mui/material";
import { useState, useEffect } from "react";

interface Experience {
  image: string;
  company: string;
  designation: string;
  location: string;
  timeline: string;
  description: string;
}

interface ExperienceBarProps {
  experiences: Experience[];
}

const ExperienceBar = ({ experiences }: ExperienceBarProps) => {
  const [currentExperience, setCurrentExperience] = useState<Experience | null>(
    null
  );
  const [previousExperiences, setPreviousExperiences] = useState<Experience[]>(
    []
  );

  useEffect(() => {
    const current = experiences.find((exp) =>
      exp.timeline.toLowerCase().includes("present")
    );
    const previous = experiences.filter(
      (exp) => !exp.timeline.toLowerCase().includes("present")
    );

    setCurrentExperience(current || null);
    setPreviousExperiences(previous);
  }, [experiences]);

  return (
    <Box sx={{ width: "100%", marginTop: "3em" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography
              variant="h6"
              sx={{ color: "#666", marginBottom: "15px" }}
            >
              Currently
            </Typography>
            {currentExperience && (
              <Box sx={{ display: "flex", alignItems: "right" }}>
                <Box
                  component="img"
                  src={currentExperience.image}
                  alt={currentExperience.company}
                  sx={{
                    width: "40px",
                    height: "40px",
                    marginRight: "15px",
                    borderRadius: "5px",
                  }}
                />
                <Typography variant="body1" sx={{ color: "#333" }}>
                  {currentExperience.designation}, {currentExperience.company}
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography
              variant="h6"
              sx={{
                color: "#666",
                marginBottom: "15px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              Previously
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
            >
              {previousExperiences.map((experience, index) => (
                <Box key={index} sx={{ position: "relative" }}>
                  <Box
                    component="img"
                    src={experience.image}
                    alt={experience.company}
                    sx={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "5px",
                      filter: "grayscale(100%)",
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExperienceBar;
