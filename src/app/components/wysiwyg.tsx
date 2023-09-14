'use client'

import { EditorState } from 'draft-js';
import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default function WYSIWYG() {
    const [editorState, setEditorState] = useState(
        EditorState.createEmpty()
    )

    const onChange = (state: EditorState) => {
        setEditorState(state)
    }

    return <Editor
        editorState={editorState}
        onEditorStateChange={onChange}></Editor>
}