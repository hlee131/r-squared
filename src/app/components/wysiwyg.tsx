'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { EditorState, convertToRaw } from 'draft-js';
import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Database } from '../../../types/supabase';


export default function WYSIWYG({ mode, closeFn, parent_comment }: { mode: 'primary' | 'reply', closeFn?: () => void, parent_comment?: string }) {
    const [editorState, setEditorState] = useState(
        EditorState.createEmpty()
    )

    const onChange = (state: EditorState) => {
        setEditorState(state)
    }

    const supabase = createClientComponentClient<Database>();

    const onClick = async () => {
        const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        await supabase.from('comments').insert({ content, article: window.location.href.slice(-10), parent_comment }).select();
    }

    return <div className={mode == 'primary' ? '' : 'reply-box'}>
        <Editor
            editorState={editorState}
            onEditorStateChange={onChange}
            toolbarClassName={mode == 'primary' ? 'wysiwyg-toolbar-primary' : 'wysiwyg-toolbar-reply'}
            wrapperClassName={mode == 'primary' ? 'wysiwyg-wrapper-primary' : 'wysiwyg-wrapper-reply'}
            editorClassName={mode == 'primary' ? 'wysiwyg-editor-primary' : 'wysiwyg-editor-reply'}
            toolbar={{
                options: ['inline', 'fontSize', 'fontFamily', 'colorPicker', 'emoji']
            }} />
        <div>
            <button onClick={onClick} className="selected round-border p-1 ml-3">Post!</button>
            {closeFn ? <button onClick={closeFn} className="selected round-border p-1 ml-3">Cancel</button> : ''}
        </div>
    </div>
}