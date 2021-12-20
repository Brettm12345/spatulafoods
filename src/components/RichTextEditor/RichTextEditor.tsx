import {Editor, EditorContent} from '@tiptap/react'
import {FC} from 'react'
import {MenuBar} from './Menubar'

interface RichTextEditorProps {
  editor: Editor
}
export const RichTextEditor: FC<RichTextEditorProps> = ({editor}) => (
  <div className="max-w-4xl mx-auto border border-gray-100 rounded-md dark:border-gray-600">
    <MenuBar editor={editor} />
    <EditorContent
      id="editor"
      className="px-4 py-1 prose-sm prose prose-slate sm:prose dark:prose-invert max-w-unset"
      editor={editor}
    />
  </div>
)