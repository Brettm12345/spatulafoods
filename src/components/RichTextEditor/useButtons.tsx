import {PropsOf} from '@headlessui/react/dist/types'
import {H1, H2, H3, H4, H5, H6} from '@styled-icons/remix-editor'
import {Editor} from '@tiptap/react'
import {DetailedHTMLProps, HTMLAttributes, useMemo} from 'react'
import {IconType} from 'react-icons'
import {
  BiBold,
  BiItalic,
  BiStrikethrough,
  BiUnderline,
  BiParagraph,
  BiListUl,
  BiListOl,
  BiUndo,
  BiAlignJustify,
  BiAlignLeft,
  BiAlignMiddle,
  BiAlignRight,
} from 'react-icons/bi'
import {BlockquoteLeft} from 'styled-icons/bootstrap'
import {ClearFormatting} from 'styled-icons/fluentui-system-regular'
import {StyledIcon} from 'styled-icons/types'

const headingIcons: Record<number, StyledIcon> = {
  [1]: H1,
  [2]: H2,
  [3]: H3,
  [4]: H4,
  [5]: H5,
  [6]: H6,
}

const headingLevels = [1, 2, 3, 4, 5, 6] as const

const alignIcons: Record<string, IconType> = {
  left: BiAlignLeft,
  justify: BiAlignJustify,
  center: BiAlignMiddle,
  right: BiAlignRight,
}

type Icon = IconType | StyledIcon
interface EditorButtonProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isEnabled?: boolean
  iconProps?: PropsOf<Icon>
  tooltip: string
  Icon: Icon
}

type UseButtons = (editor: Editor) => Array<EditorButtonProps[]>

export const useButtons: UseButtons = editor =>
  useMemo(
    () => [
      [
        {
          Icon: BiBold,
          tooltip: 'Bold',
          isEnabled: editor?.isActive('bold'),
          onClick() {
            editor.chain().focus().toggleBold().run()
          },
        },
        {
          Icon: BiItalic,
          tooltip: 'Italic',
          isEnabled: editor?.isActive('italic'),
          onClick() {
            editor.chain().focus().toggleItalic().run()
          },
        },
        {
          Icon: BiStrikethrough,
          tooltip: 'Strikethrough',
          isEnabled: editor?.isActive('strike'),
          onClick() {
            editor.chain().focus().toggleStrike().run()
          },
        },
        {
          Icon: BiUnderline,
          tooltip: 'Underline',
          isEnabled: editor?.isActive('underline'),
          onClick() {
            editor.chain().focus().toggleUnderline().run()
          },
        },
        {
          Icon: ClearFormatting,
          tooltip: 'Clear Formatting',
          onClick() {
            editor
              .chain()
              .focus()
              .unsetAllMarks()
              .setParagraph()
              .unsetBlockquote()
              .run()
          },
        },
      ],
      Object.entries(alignIcons).map(([align, Icon]) => ({
        Icon,
        tooltip: `Align ${align}`,
        isEnabled: editor?.isActive({textAlign: align}),
        onClick() {
          editor.chain().setTextAlign(align).run()
        },
      })),
      [
        ...headingLevels.map(level => ({
          Icon: headingIcons[level],
          tooltip: `Heading level ${level}`,
          isEnabled: editor?.isActive('heading', {level}),
          onClick() {
            editor.chain().focus().toggleHeading({level}).run()
          },
        })),
        {
          Icon: BiParagraph,
          tooltip: 'Paragraph',
          isEnabled: editor?.isActive('paragraph'),
          onClick() {
            editor.chain().focus().setParagraph().run()
          },
        },
        {
          Icon: BlockquoteLeft,
          tooltip: 'Blockquote',
          isEnabled: editor?.isActive('blockquote'),
          onClick() {
            editor.chain().focus().toggleBlockquote().run()
          },
        },
      ],
      [
        {
          Icon: BiListUl,
          tooltip: 'Bullet list',
          isEnabled: editor?.isActive('bulletList'),
          onClick() {
            editor.chain().focus().toggleBulletList().run()
          },
        },
        {
          Icon: BiListOl,
          tooltip: 'Numbered list',
          isEnabled: editor?.isActive('orderedList'),
          onClick() {
            editor.chain().focus().toggleOrderedList().run()
          },
        },
      ],
      [
        {
          Icon: BiUndo,
          tooltip: 'Undo',
          onClick() {
            editor.chain().focus().undo().run()
          },
        },
      ],
    ],
    [editor]
  )
