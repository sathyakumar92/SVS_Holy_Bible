import React, { useState, useEffect } from 'react';
import { useBible } from '../context/BibleContext';
import { X, Save, Trash2, BookOpen } from 'lucide-react';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookId: string;
  bookName: string;
  chapterNumber: number;
  verseNumber: number;
  verseText: string;
}

export const NoteModal: React.FC<NoteModalProps> = ({
  isOpen,
  onClose,
  bookId,
  bookName,
  chapterNumber,
  verseNumber,
  verseText,
}) => {
  const { saveNote, deleteNote, getVerseNote } = useBible();
  const [noteText, setNoteText] = useState('');
  const existingNote = getVerseNote(bookId, chapterNumber, verseNumber);

  useEffect(() => {
    if (existingNote) {
      setNoteText(existingNote.noteText);
    } else {
      setNoteText('');
    }
  }, [existingNote, isOpen]);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!noteText.trim()) {
      if (existingNote) {
        await deleteNote(existingNote.id);
      }
      onClose();
      return;
    }
    await saveNote(bookId, chapterNumber, verseNumber, noteText.trim(), verseText);
    onClose();
  };

  const handleDelete = async () => {
    if (existingNote) {
      await deleteNote(existingNote.id);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-[#1A1C22] border border-[#2F3443] p-5 shadow-2xl text-[#EDE8DF] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#252834]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="font-semibold text-sm">
              Note · {bookName} {chapterNumber}:{verseNumber}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#A9A397] hover:text-[#EDE8DF] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Verse preview (Read-only authoritative text) */}
        <div className="mt-3 p-3 rounded-xl bg-[#121316] border border-[#252834] text-xs text-[#A9A397] italic line-clamp-3 leading-relaxed">
          "{verseText}"
        </div>

        {/* Note Editor */}
        <div className="mt-4 flex-1 flex flex-col">
          <label className="text-xs font-medium text-[#EDE8DF] mb-1.5">
            Your Personal Reflection / Note:
          </label>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Type your study notes, reflections, or sermon points here..."
            className="w-full h-40 p-3 bg-[#121316] border border-[#2F3443] rounded-xl text-sm text-[#EDE8DF] placeholder-[#6E6A62] focus:outline-none focus:border-[#D4AF37] resize-none leading-relaxed"
            autoFocus
          />
          <p className="mt-1.5 text-[11px] text-[#78746B]">
            Notes are personal to you and securely stored in your device. They never alter the authoritative Scripture text.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-5 pt-3 border-t border-[#252834] flex items-center justify-between">
          {existingNote ? (
            <button
              onClick={handleDelete}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Note</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs text-[#A9A397] hover:text-[#EDE8DF] rounded-lg transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#D4AF37] hover:bg-[#E5C158] text-[#121316] font-semibold text-xs rounded-xl shadow transition"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Note</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
