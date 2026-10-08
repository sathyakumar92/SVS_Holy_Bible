import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  Send,
  Mail,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';

interface ShareVerseModalProps {
  isOpen: boolean;
  onClose: () => void;
  verse: {
    bookId: string;
    bookName: string;
    chapterNumber: number;
    verseNumber: number;
    text: string;
  };
  language: 'en' | 'ta';
}

export const ShareVerseModal: React.FC<ShareVerseModalProps> = ({
  isOpen,
  onClose,
  verse,
  language,
}) => {
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  if (!isOpen) return null;

  const reference = `${verse.bookName} ${verse.chapterNumber}:${verse.verseNumber}`;
  const formattedShareText = `“${verse.text}”\n— ${reference} (SVS Bible)`;

  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  const handleNativeShare = async () => {
    if (!hasNativeShare) {
      await handleCopy();
      return;
    }

    try {
      await navigator.share({
        title: `Verse of the Day · ${reference}`,
        text: formattedShareText,
      });
      setShareSuccess(true);
      setTimeout(() => {
        setShareSuccess(false);
        onClose();
      }, 1500);
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        // Fallback to clipboard
        await handleCopy();
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedShareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = formattedShareText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareViaWhatsApp = () => {
    const encoded = encodeURIComponent(formattedShareText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const shareViaTwitter = () => {
    const encoded = encodeURIComponent(formattedShareText);
    window.open(`https://twitter.com/intent/tweet?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Verse of the Day · ${reference}`);
    const body = encodeURIComponent(formattedShareText);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-[#1A1C22] border border-[#2F3443] p-5 sm:p-6 shadow-2xl text-[#EDE8DF] space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#252834]">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="font-semibold text-sm sm:text-base">
              {language === 'ta' ? 'வசனத்தைப் பகிர்க' : 'Share Verse of the Day'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#A9A397] hover:text-[#EDE8DF] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Verse Card Preview */}
        <div className="p-4 rounded-xl bg-[#121316] border border-[#262A37] space-y-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-full blur-xl pointer-events-none" />
          <p
            className={`text-sm text-[#EDE8DF] leading-relaxed italic ${
              language === 'ta' ? 'font-tamil' : 'font-serif-reading'
            }`}
          >
            “{verse.text}”
          </p>
          <div className="pt-2 flex items-center justify-between text-xs text-[#D4AF37] border-t border-[#1F222D]">
            <span className="font-semibold">{reference}</span>
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#8C877D]">
              SVS BIBLE
            </span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="space-y-2 pt-1">
          {/* Web Share API Button */}
          {hasNativeShare && (
            <button
              onClick={handleNativeShare}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#121316] font-semibold text-xs sm:text-sm shadow-md transition active:scale-98"
            >
              {shareSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{language === 'ta' ? 'பகிரப்பட்டது!' : 'Shared Successfully!'}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>
                    {language === 'ta'
                      ? 'செயலிகளுக்குப் பகிர்க (Web Share)'
                      : 'Send to Other Apps (WhatsApp, Messages...)'}
                  </span>
                </>
              )}
            </button>
          )}

          {/* Copy to Clipboard Button */}
          <button
            onClick={handleCopy}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-xs sm:text-sm font-semibold transition active:scale-98 ${
              copied
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                : 'bg-[#222530] hover:bg-[#2C3040] border-[#2E3342] text-[#EDE8DF]'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>
                  {language === 'ta' ? 'கிளிப்போர்டில் நகலெடுக்கப்பட்டது!' : 'Copied to Clipboard!'}
                </span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#D4AF37]" />
                <span>
                  {language === 'ta' ? 'வசனத்தை நகலெடுக்க (Copy Text)' : 'Copy Verse Text to Clipboard'}
                </span>
              </>
            )}
          </button>
        </div>

        {/* Direct App Share Links */}
        <div className="pt-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C877D] block mb-2">
            {language === 'ta' ? 'விரைவுப் பகிர்வு' : 'Quick Share via'}
          </span>
          <div className="grid grid-cols-3 gap-2">
            {/* WhatsApp */}
            <button
              onClick={shareViaWhatsApp}
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#17231C] hover:bg-[#1E2E25] border border-[#234230] text-emerald-300 text-xs font-medium transition active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>

            {/* Twitter / X */}
            <button
              onClick={shareViaTwitter}
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#1B1F2A] hover:bg-[#232938] border border-[#2D364A] text-sky-300 text-xs font-medium transition active:scale-95"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Twitter / X</span>
            </button>

            {/* Email */}
            <button
              onClick={shareViaEmail}
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#222129] hover:bg-[#2D2A37] border border-[#3A3549] text-[#EDE8DF] text-xs font-medium transition active:scale-95"
            >
              <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Email</span>
            </button>
          </div>
        </div>

        {/* Quiet disclaimer */}
        <p className="text-[11px] text-[#78746B] text-center pt-2">
          {language === 'ta'
            ? 'அதிகாரப்பூர்வ வேத வார்த்தைகள் எவ்வித மாற்றமுமின்றி பகிரப்படுகின்றன.'
            : 'Authoritative Scripture shared without modification.'}
        </p>
      </div>
    </div>
  );
};
