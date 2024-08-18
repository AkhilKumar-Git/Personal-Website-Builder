import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Grid,
  Alert,
  Snackbar,
  Typography,
} from "@mui/material";
import ProjectBox from "../components/ProjectBox";
import AddNewProjectBox from "../components/AddNewProjectBox";
import { handleSave } from "../components/GlobalFunctions";

interface Project {
  title: string;
  link: string;
  description: string;
  image: string;
}

interface ProjectsSectionProps {
  projects: Project[];
  isEditing: boolean;
  setData: (data: Project[]) => void;
}

const ProjectsSection = ({
  projects,
  isEditing,
  setData,
}: ProjectsSectionProps) => {
  const [localProjects, setLocalProjects] = useState<Project[]>(projects);
  const [showAlert, setShowAlert] = useState(false);
  const [isBoxEditing, setIsBoxEditing] = useState<number | null>(null); // Track the editing state of individual boxes

  const handleAddProject = () => {
    if (localProjects.length < 2) {
      setLocalProjects([
        ...localProjects,
        {
          title: "Enter project title",
          link: "Add link",
          description: "Add description",
          image: "",
        },
      ]);
    } else {
      setShowAlert(true);
    }
  };

  const handleUpdateProject = (index: number, updatedProject: Project) => {
    const updatedProjects = localProjects.map((project, i) =>
      i === index ? updatedProject : project
    );
    setLocalProjects(updatedProjects);
  };

  const handleDeleteProject = (index: number) => {
    const updatedProjects = localProjects.filter((_, i) => i !== index);
    setLocalProjects(updatedProjects);
  };

  const handleSaveSection = () => {
    setData(localProjects);
    handleSave();
    setIsBoxEditing(null); // Exit editing mode for all boxes
  };

  const handleCancelSection = () => {
    setLocalProjects(projects); // Revert to original state
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
          p: 3,
          border: isEditing ? "1px solid black" : "none",
          borderRadius: 2,
          padding: isEditing ? "2em" : "none",
          paddingBottom: isEditing ? "none" : "3em",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          Projects
        </Typography>

        <Grid container spacing={2}>
          {localProjects.map((project, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <ProjectBox
                project={project}
                isEditing={isEditing}
                isBoxEditing={isBoxEditing === index} // Check if this box is being edited
                onEdit={() => setIsBoxEditing(index)} // Enter editing mode for this box
                onUpdate={(updatedProject: Project) =>
                  handleUpdateProject(index, updatedProject)
                }
                onDelete={() => handleDeleteProject(index)} // Delete this box
                onSave={handleSaveSection} // Save at the section level
                onCancel={handleCancelSection} // Cancel at the section level
              />
            </Grid>
          ))}
          {isEditing && localProjects.length < 2 && (
            <Grid item xs={12} sm={6}>
              <AddNewProjectBox onClick={handleAddProject} />
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
          Only two project cards are allowed in this component.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProjectsSection;
