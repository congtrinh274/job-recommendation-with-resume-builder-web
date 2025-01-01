import { useContext, useState } from 'react';
import {
    BtnBold,
    BtnBulletList,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnStrikeThrough,
    BtnUnderline,
    Editor,
    EditorProvider,
    Separator,
    Toolbar,
} from 'react-simple-wysiwyg';

const RichTextEditor = ({ value, onChange, placeholder = 'Nhập nội dung...' }) => {
    const handleChange = (newValue) => {
        onChange(newValue);
    };

    return (
        <div>
            <EditorProvider>
                <Editor value={value} onChange={(e) => handleChange(e.target.value)} placeholder={placeholder}>
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    );
};

export default RichTextEditor;
