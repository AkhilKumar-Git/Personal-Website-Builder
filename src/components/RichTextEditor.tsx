import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { HashtagNode } from "@lexical/hashtag";
import ErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ListItemNode, ListNode } from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";

const theme = {
  hashtag: "text-[#0094ff]",
};

function Placeholder({ text }: { text: string }) {
  return (
    <Typography variant="body2" color="textSecondary">
      {text}
    </Typography>
  );
}

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const toolbarElement = document.querySelector(
      ".toolbar"
    ) as HTMLElement | null;
    const updateToolbar = () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        if (toolbarElement) {
          toolbarElement.style.top = `${
            range.getBoundingClientRect().top - 40
          }px`;
          toolbarElement.style.left = `${range.getBoundingClientRect().left}px`;
          toolbarElement.style.display = "block";
        }
      } else {
        if (toolbarElement) {
          toolbarElement.style.display = "none";
        }
      }
    };

    document.addEventListener("selectionchange", updateToolbar);
    return () => {
      document.removeEventListener("selectionchange", updateToolbar);
    };
  }, [editor]);

  return (
    <Box
      className="toolbar"
      sx={{
        position: "absolute",
        display: "none",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        zIndex: 10,
      }}
    >
      <button className="toolbar-button" style={toolbarButtonStyles}>
        B
      </button>
      <button className="toolbar-button" style={toolbarButtonStyles}>
        i
      </button>
      <button className="toolbar-button" style={toolbarButtonStyles}>
        U
      </button>
      <button className="toolbar-button" style={toolbarButtonStyles}>
        •
      </button>
      <button className="toolbar-button" style={toolbarButtonStyles}>
        1.
      </button>
    </Box>
  );
}

const toolbarButtonStyles = {
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  margin: "0 4px",
};

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder: string;
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder,
}: RichTextEditorProps) {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError: (error: Error) => console.error(error),
    editorState: () => {
      return content;
    },
    nodes: [ListItemNode, ListNode, HashtagNode],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Box sx={{ position: "relative" }}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="editor-input"
              style={{
                minHeight: "200px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "8px",
                outline: "none",
              }}
            />
          }
          placeholder={<Placeholder text={placeholder} />}
          ErrorBoundary={ErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <ListPlugin />
        <HashtagPlugin />
        <OnChangePlugin
          onChange={(editorState) => {
            editorState.read(() => {
              const jsonString = JSON.stringify(editorState.toJSON());
              onChange(jsonString);
            });
          }}
        />
        <ToolbarPlugin />
      </Box>
    </LexicalComposer>
  );
}
