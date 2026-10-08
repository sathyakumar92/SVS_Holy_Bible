import React from 'react';
import { useBible } from '../context/BibleContext';
import { getBookMeta, getBookName } from '../data/canonicalBooks';
import { X, Check } from 'lucide-react';

interface ChapterSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetBookId?: string;
}

export const ChapterSelectorModal: React.FC<ChapterSelectorModalProps> = ({
  isOpen,
  onClose,
  targetBookId,
}) => {
  const {
    currentBookId,
    currentChapterNumber,
    goToScripture,
    currentLanguage,
    getBookProgress,
  } = useBible();

  if (!isOpen) return null;

  const bookId = targetBookId || currentBookId;
  const meta = getBookMeta(bookId);
  if (!meta) return null;

  const bookName = getBookName(bookId, currentLanguage);
  const totalChapters = meta.totalChapters;
  const progressPercent = getBookProgress(bookId);

  const chapters = Array.from({ length: totalChapters }, (_, i) => i + 1);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-[#1A1C22] border border-[#2E3340] p-5 shadow-2xl text-[#EDE8DF] flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#252834]">
          <div>
            <h3 className="font-semibold text-base text-[#EDE8DF]">
              {bookName}
            </h3>
            <p className="text-xs text-[#A9A397]">
              {totalChapters} Chapters · {progressPercent}% Read
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#A9A397] hover:text-[#EDE8DF] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chapters Grid (Section 7) */}
        <div className="mt-4 overflow-y-auto pr-1">
          <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
            {chapters.map((chNum) => {
              const isCurrent = bookId === currentBookId && chNum === currentChapterNumber;

              return (
                <button
                  key={chNum}
                  onClick={() => {
                    goToScripture(bookId, chNum);
                    onClose();
                  }}
                  className={`h-12 rounded-xl flex items-center justify-center font-medium text-sm transition active:scale-95 border ${
                    isCurrent
                      ? 'bg-[#D4AF37] text-[#121316] font-bold border-[#E5C158] shadow-md shadow-[#D4AF37]/20'
                      : 'bg-[#15171D] text-[#EDE8DF] border-[#2A2E3B] hover:bg-[#222633] hover:border-[#3D4355]'
                  }`}
                >
                  {chNum}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
