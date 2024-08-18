import { useState, useEffect } from "react";
import { Box, Typography, IconButton, InputBase, Button } from "@mui/material";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ToolbarPlugin } from "./ToolbarPlugin";
import { $getRoot, $createParagraphNode, $createTextNode } from "lexical";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { $generateHtmlFromNodes } from "@lexical/html";
import { LexicalEditor } from "lexical";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface SkillBoxProps {
  title: string;
  description: string;
  richTextInput: string;
  isEditing: boolean; // Global editing mode
  isBoxEditing: boolean; // Individual box editing mode
  onUpdate?: (updatedSkill: {
    title: string;
    description: string;
    richTextInput: string;
  }) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
}

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

function UpdatePlugin({ content }: { content: string }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.update(() => {
      const root = $getRoot();
      root.clear();
      const paragraph = $createParagraphNode();
      paragraph.append($createTextNode(content));
      root.append(paragraph);
    });
  }, [editor, content]);
  return null;
}

const SkillBox = ({
  title,
  description,
  richTextInput,
  isEditing,
  isBoxEditing,
  onUpdate,
  onEdit,
  onDelete,
  onSave,
  onCancel,
}: SkillBoxProps) => {
  const [localTitle, setLocalTitle] = useState(title);
  const [localDescription, setLocalDescription] = useState(description);
  const [editor, setEditor] = useState<LexicalEditor | null>(null);

  const initialConfig = {
    namespace: "SkillBoxEditor",
    onError: (error: Error) => console.error(error),
  };

  const handleSaving = () => {
    if (editor) {
      editor.update(() => {
        const htmlString = $generateHtmlFromNodes(editor);
        onUpdate?.({
          title: localTitle,
          description: localDescription,
          richTextInput: htmlString,
        });
      });
    }
    onSave?.();
  };

  const handleCancel = () => {
    setLocalTitle(title);
    setLocalDescription(description);
    onCancel?.();
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        padding: "12%",
        borderRadius: "25px",
        border: "1px solid #dadada",
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      {isEditing && !isBoxEditing && (
        <Box sx={{ position: "absolute", top: 8, right: 8 }}>
          <IconButton onClick={onDelete} size="small">
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={onEdit} size="small">
            <EditIcon />
          </IconButton>
        </Box>
      )}

      {isBoxEditing ? (
        <>
          <InputBase
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
            sx={{ mb: 2, fontWeight: 700 }}
            fullWidth
          />
          <InputBase
            value={localDescription}
            onChange={(e) => setLocalDescription(e.target.value)}
            placeholder="Write description here..."
            sx={{ mb: 2 }}
            fullWidth
          />
          <LexicalComposer initialConfig={initialConfig}>
            <UpdatePlugin content={richTextInput} />
            <ToolbarPlugin />
            <Box sx={{ borderRadius: "16px", padding: "10px" }}>
              <RichTextPlugin
                placeholder={<div>Start writing...</div>}
                contentEditable={
                  <ContentEditable
                    style={{
                      minHeight: "200px",
                      outline: "none",
                      border: "none",
                    }}
                  />
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
            </Box>
            <HistoryPlugin />
            <OnChangePlugin onChange={setEditor} />
          </LexicalComposer>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleCancel} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSaving}>
              Save
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, marginBottom: "20px" }}
          >
            {localTitle}
          </Typography>
          <Typography sx={{ marginBottom: "30px" }}>
            {localDescription}
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: richTextInput }} />
        </>
      )}
    </Box>
  );
};

export default SkillBox;
