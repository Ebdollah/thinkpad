'use client'

import dynamic from 'next/dynamic';

const EditorContent = dynamic(() => import('@tiptap/react').then(mod => mod.EditorContent), {
    ssr: false,
});
import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import {
    FaBold,
    FaItalic,
    FaUnderline,
    FaStrikethrough,
    FaListUl,
    FaPalette
} from 'react-icons/fa';

interface TipTapEditorProps {
    content?: string;
    onChange?: (html: string) => void;
}

const TagsEditor: React.FC<TipTapEditorProps> = ({ content = '', onChange }) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: false, 
            }),
            Underline,
            TextStyle,
            Color.configure({ types: ['textStyle'] }), 
            BulletList.configure({
                HTMLAttributes: {
                    class: 'list-disc pl-6',
                },
            }),
            ListItem,
        ],
        content: content || '<p></p>',
        onUpdate: ({ editor }) => {
            if(onChange){
                onChange(editor.getHTML());   
            }
        },
        editorProps: {
            attributes: {
                class: 'prose min-h-[200px] h-full outline-none',
            },
        },
    });

    const editorRef = useRef<HTMLDivElement>(null);
    const [showColorPalette, setShowColorPalette] = useState(false);
    const colorPaletteRef = useRef<HTMLDivElement>(null);
    const colorButtonRef = useRef<HTMLButtonElement>(null);

    const handleEditorClick = useCallback((e: React.MouseEvent) => {
        if (!editor) return;

        const editorElement = editorRef.current;
        if (!editorElement) return;

        const { top, height } = editorElement.getBoundingClientRect();
        const { clientY } = e;

        if (clientY > top + height) {
            editor.commands.focus('end');
        }
    }, [editor]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                colorPaletteRef.current &&
                colorButtonRef.current &&
                !colorPaletteRef.current.contains(event.target as Node) &&
                !colorButtonRef.current.contains(event.target as Node)
            ) {
                setShowColorPalette(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleBold = useCallback(() => {
        editor?.chain().focus().toggleBold().run();
    }, [editor]);

    const toggleItalic = useCallback(() => {
        editor?.chain().focus().toggleItalic().run();
    }, [editor]);

    const toggleUnderline = useCallback(() => {
        editor?.chain().focus().toggleUnderline().run();
    }, [editor]);

    const toggleStrikethrough = useCallback(() => {
        editor?.chain().focus().toggleStrike().run();
    }, [editor]);

    const toggleBulletList = useCallback(() => {
        editor?.chain().focus().toggleBulletList().run();
    }, [editor]);

    const toggleColorPalette = useCallback(() => {
        setShowColorPalette(prev => !prev);
    }, []);

    const setColor = useCallback((color: string) => {
        editor?.chain().focus().setMark('textStyle', { color }).run();
        setShowColorPalette(false);
    }, [editor]);


    if (!editor) {
        return null;
    }

    return (
        <div className="border border-[#b0cbe8] rounded-md shadow-md bg-[#8dc1e9]">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2 p-3 border-b border-[#b0cbe8] bg-[#4c8bc5] rounded-t-md">
                <button
                    onClick={toggleBold}
                    className={`p-2 rounded-md transition ${editor.isActive('bold') ? 'bg-[#a9d2ff]' : 'hover:bg-[#d0e7ff]'}`}
                    title="Bold"
                    type="button"
                >
                    <FaBold />
                </button>
                <button
                    onClick={toggleItalic}
                    className={`p-2 rounded-md transition ${editor.isActive('italic') ? 'bg-[#a9d2ff]' : 'hover:bg-[#d0e7ff]'}`}
                    title="Italic"
                    type="button"
                >
                    <FaItalic />
                </button>
                <button
                    onClick={toggleUnderline}
                    className={`p-2 rounded-md transition ${editor.isActive('underline') ? 'bg-[#a9d2ff]' : 'hover:bg-[#d0e7ff]'}`}
                    title="Underline"
                    type="button"
                >
                    <FaUnderline />
                </button>
                <button
                    onClick={toggleStrikethrough}
                    className={`p-2 rounded-md transition ${editor.isActive('strike') ? 'bg-[#a9d2ff]' : 'hover:bg-[#d0e7ff]'}`}
                    title="Strikethrough"
                    type="button"
                >
                    <FaStrikethrough />
                </button>
                <button
                    onClick={toggleBulletList}
                    className={`p-2 rounded-md transition ${editor.isActive('bulletList') ? 'bg-[#a9d2ff]' : 'hover:bg-[#d0e7ff]'}`}
                    title="Bullet List"
                    type="button"
                >
                    <FaListUl />
                </button>

                {/* Color Picker */}
                <div className="relative">
                    <button
                        ref={colorButtonRef}
                        onClick={toggleColorPalette}
                        className={`p-2 rounded-md transition ${showColorPalette ? 'bg-[#a9d2ff]' : 'hover:bg-[#d0e7ff]'}`}
                        title="Text Color"
                        type="button"
                    >
                        <FaPalette />
                    </button>
                    {showColorPalette && (
                        <div
                            ref={colorPaletteRef}
                            className="absolute top-full left-0 mt-1 bg-white p-2 border border-gray-300 rounded shadow-lg flex flex-wrap gap-1 z-50"
                        >

                            {['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'].map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setColor(color)}
                                    className="w-6 h-6 rounded border border-gray-300"
                                    style={{ backgroundColor: color }}
                                    title={color}
                                    type="button"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Editor Content */}
            <div
                ref={editorRef}
                className="relative flex flex-col min-h-[200px] bg-[#aad2f0]"
                onClick={handleEditorClick}
            >
                {!showColorPalette && (
                    <div className="absolute inset-0" onClick={() => editor.commands.focus()}></div>
                )}


                <EditorContent
                    editor={editor}
                    className="p-4 min-h-[200px] relative z-10 text-black"
                />
            </div>
        </div>
    );
};

export default TagsEditor;