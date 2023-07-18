import React , { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/keymap/sublime';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/meta';
import 'codemirror/theme/monokai.css';

import { ban, keyWords, operators } from './config';

import './index.less';

interface IProps {
  options?: object;
  value: string;
  ref?: any;
  width?: string;
  height?: string;
  onShiftEnter?: () => void;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  onChangeLine?: () => void;
}

 const ReactCodeMirror = (props: IProps)=> {
  const { options: myOptions={ 
     keyMap: 'sublime',
  fullScreen: true,
  mode: 'nebula'} } = props;
  const editor = useRef<any>();
  const textarea = useRef<any>();
 
  useEffect(()=>{
    CodeMirror.defineMode('nebula', (): any => {
      return {
        token: (stream:any) => {
          if (stream.eatSpace()) {
            return null;
          }
          stream.eatWhile(/[\$:\w\u4e00-\u9fa5]/);
          const cur = stream.current();
          if (keyWords.some(item => item === cur)) {
            return 'keyword';
          } else if (operators.some(item => item === cur)) {
            return 'def';
          } else if (ban.some(item => item === cur)) {
            return 'error';
          }
          stream.next();
        },
      };
    });

    CodeMirror.registerHelper('hint', 'nebula', (cm:any) => {
      const cur = cm.getCursor();
      const token = cm.getTokenAt(cur);
      const str = token.string;
      const start = token.start;
      const end = cur.ch;

      if (str === '') {
        return;
      }

      const list = [...keyWords, ...operators, ...ban].filter(item => {
        return item.indexOf(str) === 0;
      });

      if (list.length) {
        return {
          list,
          from: CodeMirror.Pos(cur.line, start),
          to: CodeMirror.Pos(cur.line, end),
        };
      }
    
    });
    renderCodeMirror();
  } ,[])

  
  const renderCodeMirror =()=> {
    const options = {
      tabSize: 2,
      fontSize: '16px',
      autoCloseBrackets: true,
      matchBrackets: true,
      showCursorWhenSelecting: true,
      lineWrapping: true,
      lineNumbers: true,
      fullScreen: true,
      mode: 'nebula',
      ...myOptions,
    };
   editor.current = CodeMirror.fromTextArea(textarea.current, options);
   
   editor.current.on('change', codemirrorValueChange);
   editor.current.on('keydown', keydown);
   editor.current.on('blur', blur);
    const { value, width, height } = props;
   editor.current.setValue(value || '');
    if (width || height) {
     editor.current.setSize(width, height);
    }
  }
 const  blur = (instance:any) => {
    if (props.onBlur) {
      props.onBlur(instance.doc.getValue());
    }
  };

  const keydown = (_:any, change:any) => {
    if (change.shiftKey === true && change.keyCode === 13) {
      if (props.onShiftEnter) {
        props.onShiftEnter();
      }
      change.preventDefault();
    }
  };

  const codemirrorValueChange = (doc:any, change:any) => {
    doc.eachLine((line:any) => {
      if(line.text.startsWith('//') || line.text.startsWith('#')) {
        doc.addLineClass(line, 'wrap', 'notes');
      } else if (line.wrapClass === 'notes') {
        doc.removeLineClass(line, 'wrap', 'notes');
      }
    });
    if (change.origin !== 'setValue') {
      if (props.onChange) {
        props.onChange(doc.getValue());
      }
    }
    if (change.origin === '+input') {
      CodeMirror.commands.autocomplete(editor.current, undefined, {
        completeSingle: false,
      });
    }

    const tip = document.getElementsByClassName('CodeMirror-hints');
    console.log("dgvdf", tip);
    
    if (
      props.onChangeLine &&
      (change.origin === '+delete' || change.origin === '+input')
    ) {
      props.onChangeLine();
    }
  };
    return (
      <textarea
        ref={textarea}
      />
    );
  
}

export default ReactCodeMirror;