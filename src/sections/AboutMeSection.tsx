import { useState, useEffect } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { ListItemNode, ListNode } from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ToolbarPlugin } from "../components/ToolbarPlugin";
import { $getRoot } from "lexical";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { LexicalEditor } from "lexical";
import { handleSave } from "../components/GlobalFunctions";

interface Props {
  content: string;
  isEditing: boolean;
  setData: (content: string) => void;
}

// Plugin to handle changes in the editor
function OnChangePlugin({
  onChange,
}: {
  onChange: (editor: LexicalEditor) => void;
}) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    onChange(editor);
  }, [editor, onChange]);
  return null;
}

// Plugin to load existing HTML content into the editor
function UpdatePlugin({ content }: { content: string }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.update(() => {
      const root = $getRoot();
      root.clear();
      const parser = new DOMParser();
      const dom = parser.parseFromString(content, "text/html");
      const nodes = $generateNodesFromDOM(editor, dom);
      root.append(...nodes);
    });
  }, [editor, content]);
  return null;
}

const AboutMeSection = ({ content, isEditing, setData }: Props) => {
  const [editor, setEditor] = useState<LexicalEditor | null>(null);
  const [editorContent, setEditorContent] = useState(content);

  const initialConfig = {
    namespace: "MyEditor",
    editorState: null,
    onError: (error: Error) => console.error(error),
    nodes: [ListItemNode, ListNode], // Ensure list nodes are included
  };

  const handleSaving = () => {
    if (editor) {
      editor.update(() => {
        const htmlString = $generateHtmlFromNodes(editor);
        console.log("Generated HTML String:", htmlString);
        setData(htmlString); // Update the parent state with new content
        setEditorContent(htmlString); // Update the internal state to reflect the changes
      });
    }
    console.log("Publishing content");
    handleSave();
  };

  const handleCancel = () => {
    console.log("Cancel clicked, resetting content");
    setEditorContent(content);
    if (editor) {
      editor.setEditorState(editor.parseEditorState(content));
    }
  };

  return (
    <Box sx={{ position: "relative", mt: 4 }}>
      {isEditing && (
        <Box sx={{ position: "absolute", top: -40, right: 0 }}>
          <Button onClick={handleCancel} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaving}
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
          paddingBottom: isEditing ? "none" : "5em",
          paddingTop: "2em",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontSize: "28px", fontWeight: 700, marginBottom: "1rem" }}
        >
          About Me
        </Typography>
        {isEditing ? (
          <LexicalComposer initialConfig={initialConfig}>
            <UpdatePlugin content={editorContent} />
            <ToolbarPlugin />
            <Box
              sx={{
                borderRadius: "16px",
                padding: "10px",
              }}
            >
              <RichTextPlugin
                contentEditable={
                  <ContentEditable
                    style={{
                      minHeight: "200px",
                      outline: "none",
                      border: "none",
                    }}
                  />
                }
                placeholder={
                  editorContent ? (
                    <div>{editorContent}</div>
                  ) : (
                    <div>Start Writing here..</div>
                  )
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
            </Box>
            <HistoryPlugin />
            <ListPlugin /> {/* Ensure ListPlugin is included */}
            <OnChangePlugin onChange={setEditor} />
          </LexicalComposer>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: editorContent }} />
        )}
      </Paper>
    </Box>
  );
};

export default AboutMeSection;
