import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import ExperienceBox from "../components/ExperienceBox";
import { handleSave } from "../components/GlobalFunctions";

interface Experience {
  image: string;
  company: string;
  designation: string;
  location: string;
  timeline: string;
  description: string;
}

interface ExperiencesSectionProps {
  experiences: Experience[];
  isEditing: boolean;
  setData: (data: Experience[]) => void;
}

const ExperiencesSection = ({
  experiences,
  isEditing,
  setData,
}: ExperiencesSectionProps) => {
  const [localExperiences, setLocalExperiences] =
    useState<Experience[]>(experiences);

  const handleAddExperience = () => {
    setLocalExperiences([
      ...localExperiences,
      {
        image: "",
        company: "Enter company title",
        designation: "Enter designation",
        location: "Enter location",
        timeline: "Enter timeline",
        description: "Add description...",
      },
    ]);
  };

  const handleUpdateExperience = (
    index: number,
    updatedExperience: Experience
  ) => {
    const updatedExperiences = localExperiences.map((experience, i) =>
      i === index ? updatedExperience : experience
    );
    setLocalExperiences(updatedExperiences);
  };

  const handleDeleteExperience = (index: number) => {
    const updatedExperiences = localExperiences.filter((_, i) => i !== index);
    setLocalExperiences(updatedExperiences);
  };

  const handleSaveSection = () => {
    setData(localExperiences);
    handleSave();
  };

  const handleCancel = () => {
    setLocalExperiences(experiences);
  };

  return (
    <Box sx={{ mt: "15%", mb: "15%", position: "relative" }}>
      {isEditing && (
        <Box sx={{ position: "absolute", top: -40, right: 0 }}>
          <Button onClick={handleCancel} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveSection}
            sx={{
              borderRadius: "50px",
              backgroundColor: "#0085FF",
              color: "#fff",
            }}
          >
            Save
          </Button>
        </Box>
      )}
      <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: "20px" }}>
        Experiences
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: "20px",
          justifyContent: "space-between",
        }}
      >
        {localExperiences.map((experience, index) => (
          <ExperienceBox
            key={index}
            image={experience.image}
            company={experience.company}
            designation={experience.designation}
            location={experience.location}
            timeline={experience.timeline}
            description={experience.description}
            isEditing={isEditing}
            onUpdate={(updatedExperience) =>
              handleUpdateExperience(index, updatedExperience)
            }
            onDelete={() => handleDeleteExperience(index)}
            isFirst={index === 0}
          />
        ))}
        {isEditing && (
          <Box sx={{ width: "359px", marginTop: "20px" }}>
            <Button
              onClick={handleAddExperience}
              variant="contained"
              sx={{ marginTop: "10px" }}
            >
              Add Experience
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ExperiencesSection;
