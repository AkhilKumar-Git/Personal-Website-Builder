import writeFile from "vite-plugin-fs/browser";
import portfolioData from "../data/portfolio.json";

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

export { handlePublish, handleSave };
