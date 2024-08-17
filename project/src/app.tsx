import { Editor } from '@monaco-editor/react';
import { useRef } from 'react';

type EditorInstance = {
  getValue(): string;
}

export function App() {
  const editorRef = useRef<EditorInstance | null>(null);

  function handleEditorDidMount(editor: EditorInstance) {
    editorRef.current = editor;
  }

  function showValue() {
    alert(editorRef.current?.getValue() ?? "null");
  }

  return (
    <>
      <button onClick={showValue}>Show value</button>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// insert your code here"
        theme='vs-dark'
        onMount={handleEditorDidMount}
      />
    </>
  );
}
