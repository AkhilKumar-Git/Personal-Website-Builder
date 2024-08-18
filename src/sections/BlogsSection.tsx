import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import BlogBox from "../components/BlogBox";

interface Blog {
  image: string;
  title: string;
  link: string;
}

interface BlogsSectionProps {
  blogs: Blog[];
  isEditing: boolean;
  setData: (data: Blog[]) => void;
}

const BlogsSection = ({ blogs, isEditing, setData }: BlogsSectionProps) => {
  const [localBlogs, setLocalBlogs] = useState<Blog[]>(blogs);
  const [, setIsSectionEditing] = useState(false);

  const handleChange = (index: number, field: string, value: string) => {
    const updatedBlogs = localBlogs.map((blog, i) =>
      i === index ? { ...blog, [field]: value } : blog
    );
    setLocalBlogs(updatedBlogs);
  };

  const handleAddBlog = () => {
    setLocalBlogs([
      ...localBlogs,
      { image: "", title: "New Blog Title", link: "New Blog Link" },
    ]);
  };

  const handleDeleteBlog = (index: number) => {
    const updatedBlogs = localBlogs.filter((_, i) => i !== index);
    setLocalBlogs(updatedBlogs);
  };

  const handleSaveSection = () => {
    setData(localBlogs);
    setIsSectionEditing(false);
  };

  const handleCancelSection = () => {
    setLocalBlogs(blogs);
    setIsSectionEditing(false);
  };

  return (
    <Box sx={{ padding: "40px 0", position: "relative" }}>
      {isEditing && (
        <Box sx={{ position: "absolute", top: -40, right: 0 }}>
          <Button onClick={handleCancelSection} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSaveSection}>
            Save
          </Button>
        </Box>
      )}
      <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: "20px" }}>
        Blogs & resources
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
        {localBlogs.map((blog, index) => (
          <BlogBox
            key={index}
            blog={blog}
            isEditing={isEditing}
            onChange={(field, value) => handleChange(index, field, value)}
            onDelete={() => handleDeleteBlog(index)}
          />
        ))}
        {isEditing && (
          <Box sx={{ width: "359px", marginTop: "20px" }}>
            <Button
              onClick={handleAddBlog}
              variant="contained"
              sx={{ marginTop: "10px" }}
            >
              Add Blog
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BlogsSection;
