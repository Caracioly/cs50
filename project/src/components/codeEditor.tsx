import { Editor } from "@monaco-editor/react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import * as monaco from "monaco-editor";

interface CodeEditorProps {
  onMount?: (
    editor: monaco.editor.IStandaloneCodeEditor | null,
    monaco: any
  ) => void;
  defaultValue: string;
}

export const CodeEditor = forwardRef((props: CodeEditorProps, ref) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useImperativeHandle(ref, () => ({
    getEditorValue: () => {
      return editorRef.current?.getValue();
    },
    setEditorValue: (value: string) => {
      editorRef.current?.setValue(value);
    },
  }));

  function handleEditorDidMount(
    editor: monaco.editor.IStandaloneCodeEditor | null,
    monaco: any
  ) {
    editorRef.current = editor;
    if (props.onMount) {
      props.onMount(editor, monaco);
    }
  }

  return (
    <div className="h-full w-full flex flex-nowrap flex-col">
      <Editor
        height="100%"
        width="100%"
        defaultLanguage="python"
        defaultValue={props.defaultValue}
        theme="vs-dark"
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          scrollbar: {
            vertical: "hidden",
            horizontal: "hidden",
          },
          lineNumbers: "on",
          folding: false,
          glyphMargin: false,
          padding: { top: 10, bottom: 10 },
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          renderLineHighlight: "line",
          fontSize: 18,
        }}
      />
    </div>
  );
});
