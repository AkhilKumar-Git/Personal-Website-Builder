import React, { useState, useEffect, useRef } from "react";
import { ThemeProvider } from "@mui/material/styles";
import NavigationBar from "../components/NavigationBar";
import ProfileSection from "../sections/ProfileSection";
import IntroSection from "../sections/IntroSection";
import ExperienceBar from "../components/ExperienceBar";
import EditIcon from "@mui/icons-material/Edit";
import AboutMeSection from "../sections/AboutMeSection";
import SkillsSection from "../sections/SkillsSection";
import ProjectsSection from "../sections/ProjectsSection";
import ExperiencesSection from "../sections/ExperiencesSection";
import BlogsSection from "../sections/BlogsSection";
import ConnectSection from "../sections/ConnectSection";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { Box, Container, IconButton, Typography } from "@mui/material";
import theme from "../theme/theme";
import portfolioData from "../data/portfolio.json";
import writeFile from "vite-plugin-fs/browser";
import AddSectionButton from "../components/AddSectionButton";
import SiteBuilderNavbar from "../components/SiteBuilderNavbar";

const HomePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(portfolioData);
  const [sections, setSections] = useState(data.sections || []);
  const scrollPosition = useRef(0);

  useEffect(() => {
    setSections(data.sections || []);
  }, [data.sections]);

  const handleSave = async () => {
    try {
      const updatedData = { ...data, sections };
      console.log("Saving data...");
      await writeFile.writeFile(
        "src/data/portfolio.json",
        JSON.stringify(updatedData, null, 2)
      );
      alert("Changes saved successfully");
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes");
    }
  };

  const handlePublish = async () => {
    try {
      const updatedData = { ...data, sections };
      console.log("Publishing data...");
      await writeFile.writeFile(
        "src/data/portfolio.json",
        JSON.stringify(updatedData, null, 2)
      );
      alert("Changes published successfully");
      setIsEditing(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Error publishing changes:", error);
      alert("Failed to publish changes");
    }
  };

  const handleAddSection = (sectionType: string) => {
    const updatedSections = [...sections, sectionType];
    setSections(updatedSections);
    setData((prevData) => ({
      ...prevData,
      sections: updatedSections,
    }));
  };

  // const handleDeleteSection = (index: number) => {
  //   const updatedSections = sections.filter((_, i) => i !== index);
  //   setSections(updatedSections);
  //   setData((prevData) => ({
  //     ...prevData,
  //     sections: updatedSections,
  //   }));
  // };

  const handleScroll = () => {
    scrollPosition.current = window.scrollY;
  };

  const handleEditModeToggle = () => {
    if (!isEditing) {
      window.addEventListener("scroll", handleScroll);
      scrollPosition.current = window.scrollY;
    } else {
      window.removeEventListener("scroll", handleScroll);
    }
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    if (!isEditing && scrollPosition.current) {
      window.scrollTo(0, scrollPosition.current);
    }
  }, [isEditing]);

  const renderSection = (
    sectionType: string | undefined,
    index: React.Key | null | undefined
  ) => {
    return (
      <div id={sectionType} key={index}>
        {(() => {
          switch (sectionType) {
            case "about":
              return (
                <AboutMeSection
                  content={data.aboutMe.content}
                  isEditing={isEditing}
                  setData={(content) =>
                    setData({ ...data, aboutMe: { ...data.aboutMe, content } })
                  }
                />
              );
            case "skills":
              return (
                <SkillsSection
                  skills={data.skills}
                  isEditing={isEditing}
                  setData={(skills) => setData({ ...data, skills })}
                />
              );
            case "projects":
              return (
                <ProjectsSection
                  projects={data.projects}
                  isEditing={isEditing}
                  setData={(projects) => setData({ ...data, projects })}
                />
              );
            case "experience":
              return (
                <ExperiencesSection
                  experiences={data.experiences}
                  isEditing={isEditing}
                  setData={(experiences) => setData({ ...data, experiences })}
                />
              );
            case "blogs":
              return (
                <BlogsSection
                  blogs={data.blogs}
                  isEditing={isEditing}
                  setData={(blogs) => setData({ ...data, blogs })}
                />
              );
            case "connect":
              return (
                <ConnectSection
                  connect={data.connect}
                  isEditing={isEditing}
                  setData={(connect) => setData({ ...data, connect })}
                />
              );
            default:
              return null;
          }
        })()}
      </div>
    );
  };

  const allSectionsAdded =
    sections.length ===
    ["about", "skills", "projects", "experience", "blogs", "connect"].length;

  return (
    <ThemeProvider theme={theme}>
      {isEditing && (
        <SiteBuilderNavbar onSave={handleSave} onPublish={handlePublish} />
      )}

      {!isEditing && (
        <IconButton
          sx={{ position: "fixed", top: 16, right: 16, zIndex: 1000 }}
          onClick={handleEditModeToggle}
        >
          <EditIcon />
        </IconButton>
      )}
      <Container sx={{ maxWidth: "100%", marginTop: isEditing ? "64px" : "0" }}>
        <NavigationBar
          sections={data.sections}
          profileName={data.profile.name}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginTop: "5em",
          }}
        >
          <ProfileSection
            profileObject={data.profile}
            isEditing={isEditing}
            setData={(profile) =>
              setData({
                ...data,
                profile: {
                  ...profile,
                  image: profile.image,
                  socials: { ...profile.socials },
                },
              })
            }
          />
          <IntroSection
            intro={data.intro}
            isEditing={isEditing}
            setData={(updatedIntro) =>
              setData({ ...data, intro: updatedIntro })
            }
          />
        </Box>
        <ExperienceBar experiences={data.experiences} />
        <Box sx={{ margin: "10% 5% 10% 35%", width: "60%" }}>
          {sections.map((section, index) => renderSection(section, index))}
          {isEditing &&
            (allSectionsAdded ? (
              <Typography
                variant="h6"
                sx={{
                  textAlign: "center",
                  color: "#333",
                  fontWeight: "bold",
                  margin: "20px 0",
                }}
              >
                All sections added! Looks good.
              </Typography>
            ) : (
              <AddSectionButton onAddSection={handleAddSection} />
            ))}
        </Box>
      </Container>
      <ScrollToTopButton />
    </ThemeProvider>
  );
};

export default HomePage;
