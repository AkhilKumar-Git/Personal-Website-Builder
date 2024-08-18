import { useState } from "react";
import { Box, Paper, Grid, Snackbar, Alert, Button } from "@mui/material";
import SkillBox from "../components/SkillBox";
import AddNewSkillBox from "../components/AddNewSkillBox";
import { handleSave } from "../components/GlobalFunctions";

interface Skill {
  title: string;
  description: string;
  richTextInput: string;
}

interface SkillsSectionProps {
  skills: Skill[];
  isEditing: boolean; // Global editing mode
  setData: (data: Skill[]) => void;
}

const SkillsSection = ({ skills, isEditing, setData }: SkillsSectionProps) => {
  const [localSkills, setLocalSkills] = useState<Skill[]>(skills);
  const [isBoxEditing, setIsBoxEditing] = useState<number | null>(null); // Track which skill box is being edited
  const [showAlert, setShowAlert] = useState(false);

  const handleAddSkill = () => {
    if (localSkills.length < 2) {
      setLocalSkills([
        ...localSkills,
        {
          title: "Untitled",
          description: "Write description here...",
          richTextInput: "Start writing...",
        },
      ]);
    } else {
      setShowAlert(true);
    }
  };

  const handleUpdateSkill = (index: number, updatedSkill: Skill) => {
    const updatedSkills = localSkills.map((skill, i) =>
      i === index ? updatedSkill : skill
    );
    setLocalSkills(updatedSkills);
  };

  const handleDeleteSkill = (index: number) => {
    const updatedSkills = localSkills.filter((_, i) => i !== index);
    setLocalSkills(updatedSkills);
  };

  const handleSaveSection = () => {
    setData(localSkills);
    handleSave();
    setIsBoxEditing(null); // Exit editing mode for all boxes
  };

  const handleCancelSection = () => {
    setLocalSkills(skills); // Revert to the original state
    setIsBoxEditing(null); // Exit editing mode for all boxes
  };

  return (
    <Box sx={{ position: "relative", mt: "10%", mb: "10%" }}>
      {isEditing && (
        <Box sx={{ position: "absolute", top: -40, right: 0 }}>
          <Button onClick={handleCancelSection} sx={{ mr: 1 }}>
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
      <Paper
        elevation={isEditing ? 3 : 0}
        sx={{
          border: isEditing ? "1px solid black" : "none",
          borderRadius: 2,
          padding: isEditing ? "2em" : "none",
          paddingBottom: isEditing ? "none" : "3em",
        }}
      >
        <Grid container spacing={2}>
          {localSkills.map((skill, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <SkillBox
                title={skill.title}
                description={skill.description}
                richTextInput={skill.richTextInput}
                isEditing={isEditing} // Global editing mode
                isBoxEditing={isBoxEditing === index} // Is this box being edited?
                onEdit={() => setIsBoxEditing(index)} // Enter editing mode for this box
                onUpdate={(updatedSkill) =>
                  handleUpdateSkill(index, updatedSkill)
                }
                onDelete={() => handleDeleteSkill(index)} // Delete this box
                onSave={handleSaveSection} // Save at the section level
                onCancel={handleCancelSection} // Cancel at the section level
              />
            </Grid>
          ))}
          {isEditing && localSkills.length < 2 && (
            <Grid item xs={12} sm={6}>
              <AddNewSkillBox onClick={handleAddSkill} />
            </Grid>
          )}
        </Grid>
      </Paper>
      <Snackbar
        open={showAlert}
        autoHideDuration={5000}
        onClose={() => setShowAlert(false)}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Only two cards are allowed in this component.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SkillsSection;
