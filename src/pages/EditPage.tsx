import { useState } from "react";
import { Box, Container } from "@mui/material";
import NavigationBar from "../components/NavigationBar";
import EditableProfileSection from "./EditableProfileSection";
import EditableIntroSection from "./EditableIntroSection";
import EditableAboutMeSection from "./EditableAboutMeSection";
import EditableSkillsSection from "./EditableSkillsSection";
import EditableProjectsSection from "./EditableProjectsSection";
import EditableExperiencesSection from "./EditableExperiencesSection";
import EditableBlogsSection from "./EditableBlogsSection";
import EditableConnectSection from "./EditableConnectSection";
import ScrollToTopButton from "../components/ScrollToTopButton";
import SiteBuilderNavbar from "../components/SiteBuilderNavbar";
import initialData from "../data/portfolio.json";
import writeFile from "vite-plugin-fs/browser";
import React from "react";

const EditPage = () => {
  const [portfolioData, setPortfolioData] = useState(initialData);

  const handleSave = async () => {
    try {
      writeFile
        .writeFile(
          "src/data/portfolio.json",
          JSON.stringify(portfolioData, null, 2)
        )
        .then(() => {
          alert("Changes saved successfully");
        });
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes");
    }
  };

  const handlePublish = () => {
    // First, save the changes
    handleSave();
    // Then exit edit mode and redirect to the main page
    window.location.href = "/";
  };

  return (
    <Box>
      <SiteBuilderNavbar onSave={handleSave} onPublish={handlePublish} />
      <NavigationBar />
      <Container sx={{ maxWidth: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginTop: "5em",
          }}
        >
          <EditableProfileSection
            data={portfolioData.profile}
            setData={(data) =>
              setPortfolioData({ ...portfolioData, profile: data })
            }
          />
          <EditableIntroSection
            data={portfolioData.intro}
            setData={(data) =>
              setPortfolioData({ ...portfolioData, intro: data })
            }
          />
        </Box>
        <EditableAboutMeSection
          data={portfolioData.aboutMe}
          setData={(data) =>
            setPortfolioData({ ...portfolioData, aboutMe: data })
          }
        />
        <EditableSkillsSection
          data={portfolioData.skills}
          setData={(data) =>
            setPortfolioData({ ...portfolioData, skills: data })
          }
        />
        <EditableProjectsSection
          data={portfolioData.projects}
          setData={(data) =>
            setPortfolioData({ ...portfolioData, projects: data })
          }
        />
        <EditableExperiencesSection
          data={portfolioData.experiences}
          setData={(data) =>
            setPortfolioData({ ...portfolioData, experiences: data })
          }
        />
        <EditableBlogsSection
          data={portfolioData.blogs}
          setData={(data) =>
            setPortfolioData({ ...portfolioData, blogs: data })
          }
        />
        <EditableConnectSection
          data={portfolioData.connect}
          setData={(data) =>
            setPortfolioData({ ...portfolioData, connect: data })
          }
        />
      </Container>
      <ScrollToTopButton />
    </Box>
  );
};

export default EditPage;
