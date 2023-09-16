'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { EditorState, convertToRaw } from 'draft-js';
import React, { Fragment, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Database } from '../../../types/supabase';

export default function WYSIWYG() {
    const [editorState, setEditorState] = useState(
        EditorState.createEmpty()
    )

    const onChange = (state: EditorState) => {
        setEditorState(state)
    }

    const supabase = createClientComponentClient<Database>();

    const onClick = async () => {
        const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        await supabase.from('comments').insert({ content, article: window.location.href.slice(-10) }).select()
        console.log(content)
    }

    return <Fragment>
        <Editor
            editorState={editorState}
            onEditorStateChange={onChange}
            toolbarClassName="wysiwyg-toolbar"
            wrapperClassName="wysiwyg-wrapper"
            editorClassName="wysiwyg-editor"
            toolbar={{
                options: ['inline', 'blockType', 'fontSize',
                    'fontFamily', 'list', 'textAlign', 'colorPicker', 'link',
                    'embedded', 'emoji', 'remove', 'history']
            }} />
        <button onClick={onClick} className="selected round-border p-1 ml-3">Post!</button>
    </Fragment>
}