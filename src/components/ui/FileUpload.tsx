import { useRef, DragEvent } from 'react'
import { Paperclip, X, FileText, Image } from 'lucide-react'
import toast from 'react-hot-toast'

const ACCEPTED_MIME = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
]
const MAX_MB = 5
const MAX_FILES = 5

function formatBytes(bytes: number) {
  return bytes < 1024 * 1024
    ? `${Math.round(bytes / 1024)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

interface Props {
  files: File[]
  onChange: (files: File[]) => void
  label?: string
}

export default function FileUpload({ files, onChange, label }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  function addFiles(incoming: FileList | null) {
    if (!incoming) return
    const valid: File[] = []
    const errors: string[] = []

    Array.from(incoming).forEach((file) => {
      if (files.length + valid.length >= MAX_FILES) {
        errors.push(`Maximum ${MAX_FILES} files allowed`)
        return
      }
      if (!ACCEPTED_MIME.includes(file.type)) {
        errors.push(`${file.name}: unsupported file type`)
        return
      }
      if (file.size > MAX_MB * 1024 * 1024) {
        errors.push(`${file.name} exceeds ${MAX_MB} MB limit`)
        return
      }
      valid.push(file)
    })

    errors.forEach((msg) => toast.error(msg))
    if (valid.length) onChange([...files, ...valid])
  }

  function remove(index: number) {
    onChange(files.filter((_, i) => i !== index))
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    addFiles(e.dataTransfer.files)
  }

  return (
    <div>
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      )}

      <div
        role="button"
        tabIndex={0}
        aria-label="Upload attachments"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-6 transition hover:border-primary-500 hover:bg-primary-50/40"
      >
        <Paperclip size={20} className="text-gray-400" />
        <span className="text-sm text-gray-500">Click to browse or drag files here</span>
        <span className="text-xs text-gray-400">
          PDF, DOC, DOCX, JPG, PNG · max {MAX_MB} MB each · up to {MAX_FILES} files
        </span>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          data-testid="file-input"
          className="hidden"
          onChange={(e) => { addFiles(e.target.files); (e.target as HTMLInputElement).value = '' }}
        />
      </div>

      {files.length > 0 && (
        <ul className="mt-3 space-y-2" aria-label="Selected files">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
            >
              <div className="flex min-w-0 items-center gap-2">
                {file.type.startsWith('image/') ? (
                  <Image size={15} className="shrink-0 text-primary-400" />
                ) : (
                  <FileText size={15} className="shrink-0 text-primary-400" />
                )}
                <span className="truncate text-xs font-medium text-gray-700">{file.name}</span>
                <span className="shrink-0 text-xs text-gray-400">{formatBytes(file.size)}</span>
              </div>
              <button
                type="button"
                onClick={() => remove(i)}
                aria-label={`Remove ${file.name}`}
                className="ml-2 shrink-0 rounded p-0.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
              >
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
