import {H1, H2, H3, H4, H5, H6} from '@styled-icons/remix-editor'
import clsx from 'clsx'
import {Editor, EditorContent} from '@tiptap/react'
import classNames from 'classnames'
import {DetailedHTMLProps, FC, HTMLAttributes} from 'react'
import {IconType} from 'react-icons'
import {
  BiAlignJustify,
  BiAlignLeft,
  BiAlignMiddle,
  BiAlignRight,
  BiBold,
  BiItalic,
  BiListOl,
  BiListUl,
  BiParagraph,
  BiRedo,
  BiStrikethrough,
  BiUnderline,
  BiUndo,
} from 'react-icons/bi'
import {BlockquoteLeft} from 'styled-icons/bootstrap'
import {ClearFormatting} from 'styled-icons/fluentui-system-regular'
import {StyledIcon} from 'styled-icons/types'
import {Tooltip} from './Tooltip'

const alignIcons: Record<string, IconType> = {
  left: BiAlignLeft,
  justify: BiAlignJustify,
  center: BiAlignMiddle,
  right: BiAlignRight,
}

const headingIcons: Record<number, StyledIcon> = {
  [1]: H1,
  [2]: H2,
  [3]: H3,
  [4]: H4,
  [5]: H5,
  [6]: H6,
}

interface ToggleButtonProps
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'onClick'
  > {
  isEnabled?: boolean
  onToggle: () => void
  tooltip: string
  Icon: IconType | StyledIcon
}
export const ToggleButton: FC<ToggleButtonProps> = ({
  isEnabled = false,
  onToggle,
  tooltip,
  Icon,
  ...props
}) => (
  <Tooltip content={tooltip} placement="bottom" arrow={false} trigger="hover">
    <button
      aria-label={tooltip}
      onClick={onToggle}
      className={clsx(
        props.className,
        'flex items-center justify-center no-tap-highlight appearance-none size-6',
        'bg-gray-100 dark:bg-gray-700 dark:text-gray-200',
        'first-of-type:rounded-l-[4px] last-of-type:rounded-r-[4px]',
        'focus:outline-none',
        'transition-colors ease-in duration-200',
        isEnabled
          ? clsx(
              'hover:bg-gray-200 hover:text-black',
              'dark:hover:bg-gray-600 dark:hover:text-white ',
              'focus-visible:bg-gray-200 focus-visible:text-black',
              'dark:focus-visible:bg-gray-600 dark:focus-visible:text-white'
            )
          : 'bg-blue-200 text-blue-500 dark:bg-blue-500/30 dark:text-blue-400'
      )}
      {...props}
    >
      <Icon width={15} height={15} className="size-[18px]" />
    </button>
  </Tooltip>
)
const MenuBarGroup: FC = ({children}) => <div className="flex">{children}</div>

interface MenuBarProps {
  editor: Editor
}
export const MenuBar: FC<MenuBarProps> = ({editor}) => (
  <div className="flex flex-wrap gap-4 px-4 py-3 border-b border-b-gray-100 dark:border-b-gray-600 ">
    <MenuBarGroup>
      <ToggleButton
        Icon={BiBold}
        tooltip="Bold"
        isEnabled={editor?.isActive('bold')}
        onToggle={() => {
          editor.chain().focus().toggleBold().run()
        }}
      />
      <ToggleButton
        Icon={BiItalic}
        tooltip="Italic"
        isEnabled={editor?.isActive('italic')}
        onToggle={() => {
          editor.chain().focus().toggleItalic().run()
        }}
      />
      <ToggleButton
        Icon={BiStrikethrough}
        tooltip="Strikethrough"
        isEnabled={editor?.isActive('strike')}
        onToggle={() => {
          editor.chain().focus().toggleStrike().run()
        }}
      />
      <ToggleButton
        Icon={BiUnderline}
        tooltip="Underline"
        isEnabled={editor?.isActive('underline')}
        onToggle={() => {
          editor.chain().focus().toggleUnderline().run()
        }}
      />
      <ToggleButton
        Icon={ClearFormatting}
        tooltip="Clear Formatting"
        onToggle={() => {
          editor
            .chain()
            .focus()
            .unsetAllMarks()
            .setParagraph()
            .unsetBlockquote()
            .run()
        }}
      />
    </MenuBarGroup>
    <MenuBarGroup>
      {Object.entries(alignIcons).map(([align, Icon]) => (
        <ToggleButton
          key={align}
          tooltip={`Align ${align}`}
          Icon={Icon}
          isEnabled={editor?.isActive({textAlign: align})}
          onToggle={() => {
            editor.chain().setTextAlign(align).run()
          }}
        />
      ))}
    </MenuBarGroup>
    <MenuBarGroup>
      {([1, 2, 3, 4, 5, 6] as const).map(level => (
        <ToggleButton
          key={level}
          tooltip={`Heading level ${level}`}
          Icon={headingIcons[level]}
          isEnabled={editor?.isActive('heading', {level})}
          onToggle={() => {
            editor.chain().focus().toggleHeading({level}).run()
          }}
        />
      ))}
      <ToggleButton
        Icon={BiParagraph}
        tooltip="Paragraph"
        isEnabled={editor?.isActive('paragraph')}
        onToggle={() => {
          editor.chain().focus().setParagraph().run()
        }}
      />
      <ToggleButton
        Icon={BlockquoteLeft}
        tooltip="Blockquote"
        isEnabled={editor?.isActive('blockquote')}
        onToggle={() => {
          editor.chain().focus().toggleBlockquote().run()
        }}
      />
    </MenuBarGroup>
    <MenuBarGroup>
      <ToggleButton
        Icon={BiListUl}
        tooltip="Bullet list"
        isEnabled={editor?.isActive('bulletList')}
        onToggle={() => {
          editor.chain().focus().toggleBulletList().run()
        }}
      />
      <ToggleButton
        Icon={BiListOl}
        tooltip="Numbered list"
        isEnabled={editor?.isActive('orderedList')}
        onToggle={() => {
          editor.chain().focus().toggleOrderedList().run()
        }}
      />
    </MenuBarGroup>
    <MenuBarGroup>
      <ToggleButton
        Icon={BiUndo}
        tooltip="Undo"
        onToggle={() => {
          editor.chain().focus().undo().run()
        }}
      />
      <ToggleButton
        Icon={BiRedo}
        tooltip="Redo"
        onToggle={() => {
          editor.chain().focus().redo().run()
        }}
      />
    </MenuBarGroup>
  </div>
)

interface TiptapProps {
  editor: Editor
}
export const Tiptap: FC<TiptapProps> = ({editor}) => {
  return (
    <div className="max-w-4xl mx-auto border border-gray-100 rounded-md dark:border-gray-600">
      <MenuBar editor={editor} />
      <EditorContent
        id="editor"
        className="px-4 py-1 prose-sm prose prose-slate sm:prose dark:prose-invert max-w-unset"
        editor={editor}
      />
    </div>
  )
}
