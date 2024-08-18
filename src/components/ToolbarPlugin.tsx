import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  FORMAT_TEXT_COMMAND,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_NORMAL,
  TextFormatType,
} from "lexical";
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { useCallback, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isUL, setIsUL] = useState(false);
  const [isOL, setIsOL] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const nativeSelection = window.getSelection();
      const rangeRect = nativeSelection?.getRangeAt(0).getBoundingClientRect();
      if (rangeRect) {
        setPosition({
          top: rangeRect.top - 40,
          left: rangeRect.left + rangeRect.width / 2,
        });
      }
      setIsVisible(!selection.isCollapsed());
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      // List states are more complex and might require additional logic
    } else {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  const formatText = (format: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const formatList = (format: "ul" | "ol") => {
    if (format === "ul") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else if (format === "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    }
  };

  useEffect(() => {
    editor.registerCommand(
      INSERT_UNORDERED_LIST_COMMAND,
      () => {
        setIsUL(true);
        setIsOL(false);
        return false;
      },
      COMMAND_PRIORITY_NORMAL
    );

    editor.registerCommand(
      INSERT_ORDERED_LIST_COMMAND,
      () => {
        setIsOL(true);
        setIsUL(false);
        return false;
      },
      COMMAND_PRIORITY_NORMAL
    );

    editor.registerCommand(
      REMOVE_LIST_COMMAND,
      () => {
        setIsUL(false);
        setIsOL(false);
        return false;
      },
      COMMAND_PRIORITY_NORMAL
    );
  }, [editor]);

  if (!isVisible) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        borderRadius: "8px",
        border: "1px solid #ccc",
        padding: "4px",
        position: "fixed",
        top: position.top,
        left: position.left,
        transform: "translateX(-50%)",
        backgroundColor: "white",
        zIndex: 1000,
      }}
    >
      <Button
        onClick={() => formatText("bold")}
        sx={{
          minWidth: "40px",
          backgroundColor: isBold ? "#e0e0e0" : "transparent",
        }}
      >
        <FormatBoldIcon />
      </Button>
      <Button
        onClick={() => formatText("italic")}
        sx={{
          minWidth: "40px",
          backgroundColor: isItalic ? "#e0e0e0" : "transparent",
        }}
      >
        <FormatItalicIcon />
      </Button>
      <Button
        onClick={() => formatText("underline")}
        sx={{
          minWidth: "40px",
          backgroundColor: isUnderline ? "#e0e0e0" : "transparent",
        }}
      >
        <FormatUnderlinedIcon />
      </Button>
      <Button
        onClick={() => formatList("ul")}
        sx={{
          minWidth: "40px",
          backgroundColor: isUL ? "#e0e0e0" : "transparent",
        }}
      >
        <FormatListBulletedIcon />
      </Button>
      <Button
        onClick={() => formatList("ol")}
        sx={{
          minWidth: "40px",
          backgroundColor: isOL ? "#e0e0e0" : "transparent",
        }}
      >
        <FormatListNumberedIcon />
      </Button>
    </Box>
  );
}
