import React from "react";
import { Paper, Typography } from "@mui/material";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  height?: string;
  language?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  title,
  value,
  onChange,
  height = "230px",
  language = "verilog"
}) => {
  return (
    <Paper
      elevation={3}
      sx={{ p: 2, flex: 1, display: "flex", flexDirection: "column" }}
    >
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>
      <Editor
        height={height}
        defaultLanguage={language}
        value={value}
        onChange={(val) => onChange(val || "")}
        theme="vs-dark"
      />
    </Paper>
  );
};

export default CodeEditor;
