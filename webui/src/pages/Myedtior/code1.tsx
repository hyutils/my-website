import React, { useState } from 'react';
import CodeMirrorEditor from '../../components/CodeMirror/code';

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState<string>('');

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  return (
    <div>
      <CodeMirrorEditor
        value={code}
        language="javascript"
        onChange={handleCodeChange}
      />
      <pre>{code}</pre>
    </div>
  );
};

export default CodeEditor;
