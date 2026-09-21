import { useEffect, useRef, useState, useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import UnderlineExt from '@tiptap/extension-underline'
import LinkExt from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Code,
  Minus,
  Link,
  Undo2,
  Redo2,
} from 'lucide-react'
import toast from 'react-hot-toast'
import api from '@/lib/api'

const PAGES = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'counseling', label: 'Counseling' },
  { id: 'social-consulting', label: 'Social Consulting' },
  { id: 'student-visa', label: 'Student Visa' },
  { id: 'book', label: 'Book' },
  { id: 'contact', label: 'Contact' },
]

function ToolbarBtn({
  active,
  disabled,
  onClick,
  title,
  children,
}: {
  active?: boolean
  disabled?: boolean
  onClick: () => void
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`flex h-8 min-w-[2rem] items-center justify-center rounded px-1.5 text-sm transition-colors disabled:opacity-30 ${
        active
          ? 'bg-primary-100 text-primary-700'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  )
}

export default function Content() {
  const [activePage, setActivePage] = useState('home')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const isLoadingRef = useRef(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExt,
      LinkExt.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Start writing page content here…' }),
    ],
    content: '',
    onUpdate: () => {
      if (!isLoadingRef.current) setDirty(true)
    },
  })

  const loadPage = useCallback(
    async (pageId: string) => {
      if (!editor) return
      setLoading(true)
      setDirty(false)
      isLoadingRef.current = true
      try {
        const { data } = await api.get<{ data: { content: string } }>(`/content/${pageId}`)
        editor.commands.setContent(data.data?.content ?? '')
      } catch {
        editor.commands.setContent('')
      } finally {
        isLoadingRef.current = false
        setLoading(false)
      }
    },
    [editor],
  )

  useEffect(() => {
    loadPage(activePage)
  }, [activePage, loadPage])

  async function save() {
    if (!editor) return
    setSaving(true)
    try {
      await api.put(`/content/${activePage}`, { content: editor.getHTML() })
      setDirty(false)
      setLastSaved(new Date())
      toast.success('Content saved.')
    } catch {
      toast.error('Failed to save content.')
    } finally {
      setSaving(false)
    }
  }

  function insertLink() {
    if (!editor) return
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run()
      return
    }
    const url = window.prompt('Enter URL:')
    if (!url) return
    editor.chain().focus().setLink({ href: url }).run()
  }

  if (!editor) return null

  return (
    <div className="flex h-[calc(100vh-3rem)] flex-col">
      {/* Header */}
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content</h1>
          <p className="mt-0.5 text-sm text-gray-500">Edit public page content.</p>
        </div>
        <div className="mb-0.5 flex items-center gap-1.5 text-xs">
          {dirty ? (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span className="text-amber-600">Unsaved changes</span>
            </>
          ) : lastSaved ? (
            <span className="text-gray-400">Saved {lastSaved.toLocaleTimeString()}</span>
          ) : null}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl bg-white shadow-sm">
        {/* Page tabs */}
        <div className="flex overflow-x-auto border-b border-gray-100">
          {PAGES.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                if (p.id !== activePage) setActivePage(p.id)
              }}
              className={`shrink-0 px-5 py-3 text-sm font-medium transition-colors ${
                activePage === p.id
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-100 px-3 py-2">
          <ToolbarBtn
            title="Undo"
            disabled={!editor.can().undo()}
            onClick={() => editor.chain().focus().undo().run()}
          >
            <Undo2 size={15} />
          </ToolbarBtn>
          <ToolbarBtn
            title="Redo"
            disabled={!editor.can().redo()}
            onClick={() => editor.chain().focus().redo().run()}
          >
            <Redo2 size={15} />
          </ToolbarBtn>

          <span className="mx-1 h-5 w-px bg-gray-200" />

          <ToolbarBtn
            title="Bold"
            active={editor.isActive('bold')}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold size={15} />
          </ToolbarBtn>
          <ToolbarBtn
            title="Italic"
            active={editor.isActive('italic')}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic size={15} />
          </ToolbarBtn>
          <ToolbarBtn
            title="Underline"
            active={editor.isActive('underline')}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <Underline size={15} />
          </ToolbarBtn>

          <span className="mx-1 h-5 w-px bg-gray-200" />

          {([1, 2, 3] as const).map((level) => (
            <ToolbarBtn
              key={level}
              title={`Heading ${level}`}
              active={editor.isActive('heading', { level })}
              onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
            >
              <span className="text-xs font-bold">H{level}</span>
            </ToolbarBtn>
          ))}

          <span className="mx-1 h-5 w-px bg-gray-200" />

          <ToolbarBtn
            title="Bullet list"
            active={editor.isActive('bulletList')}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List size={15} />
          </ToolbarBtn>
          <ToolbarBtn
            title="Ordered list"
            active={editor.isActive('orderedList')}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered size={15} />
          </ToolbarBtn>

          <span className="mx-1 h-5 w-px bg-gray-200" />

          <ToolbarBtn
            title="Blockquote"
            active={editor.isActive('blockquote')}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quote size={15} />
          </ToolbarBtn>
          <ToolbarBtn
            title="Code block"
            active={editor.isActive('codeBlock')}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          >
            <Code size={15} />
          </ToolbarBtn>
          <ToolbarBtn
            title="Horizontal rule"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <Minus size={15} />
          </ToolbarBtn>

          <span className="mx-1 h-5 w-px bg-gray-200" />

          <ToolbarBtn
            title={editor.isActive('link') ? 'Remove link' : 'Insert link'}
            active={editor.isActive('link')}
            onClick={insertLink}
          >
            <Link size={15} />
          </ToolbarBtn>
        </div>

        {/* Editor area */}
        <div className="relative flex-1 overflow-y-auto">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-start justify-center bg-white pt-10">
              <div className="w-2/3 space-y-3">
                {[82, 94, 71, 60, 88, 76].map((w, i) => (
                  <div
                    key={i}
                    className="h-4 animate-pulse rounded bg-gray-100"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
            </div>
          )}
          <EditorContent editor={editor} className="kisa-editor h-full" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">
          <p className="text-xs text-gray-400">
            HTML content is saved per page and served via the API.
          </p>
          <button
            onClick={save}
            disabled={saving || !dirty}
            className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
