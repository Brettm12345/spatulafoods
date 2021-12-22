import type {FC} from 'react'

import type {Editor} from '@tiptap/react'
import {EditorContent} from '@tiptap/react'
import clsx from 'clsx'

import {MenuBar} from './Menubar'

interface RichTextEditorProps {
  editor: Editor
}

export const RichTextEditor: FC<RichTextEditorProps> = ({editor}) => (
  <div
    className={clsx(
      'max-w-4xl mx-auto',
      'border border-gray-100 rounded-md dark:border-gray-600'
    )}
  >
    <MenuBar editor={editor} />
    <EditorContent
      id="editor"
      className={clsx(
        'px-4 py-1',
        'prose-sm prose prose-slate sm:prose',
        'dark:prose-invert max-w-unset'
      )}
      editor={editor}
    />
  </div>
)
