import React, { useState } from 'react';
import { useBible } from '../context/BibleContext';
import { BibleService } from '../services/bibleService';
import {
  SlidersHorizontal,
  Globe,
  BookOpen,
  Palette,
  HardDrive,
  Info,
  ShieldCheck,
  RotateCcw,
  Database,
  ExternalLink,
  Check,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const {
    currentLanguage,
    setLanguage,
    currentVersionId,
    setVersionId,
    readingSettings,
    updateReadingSettings,
    resetReadingProgress,
    setActiveTab,
  } = useBible();

  const [confirmReset, setConfirmReset] = useState(false);
  const versions = BibleService.getVersions();
  const currentMeta = BibleService.getVersionMeta(currentVersionId);

  const handleResetProgress = async () => {
    await resetReadingProgress();
    setConfirmReset(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-28 md:pb-12 space-y-8">
      {/* Title */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-[#EDE8DF]">
          {currentLanguage === 'ta' ? 'அமைப்புகள்' : 'Settings'}
        </h2>
        <p className="text-xs text-[#A9A397]">
          {currentLanguage === 'ta'
            ? 'வாசிப்பு விருப்பத்தேர்வுகள், மொழிகள் மற்றும் வேதாகமப் பதிப்புகள்'
            : 'Configure your reading experience, version metadata, and local data'}
        </p>
      </div>

      {/* 1. Language & Bible Version (Section 3 & 4) */}
      <section className="p-5 sm:p-6 rounded-2xl bg-[#181A22] border border-[#272B38] space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#252834]">
          <Globe className="w-4 h-4 text-[#D4AF37]" />
          <h3 className="text-sm font-semibold text-[#EDE8DF]">Language & Translation</h3>
        </div>

        {/* Language selector */}
        <div>
          <label className="text-xs font-semibold text-[#8C877D] uppercase tracking-wider block mb-2">
            Primary Scripture Language
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setLanguage('en')}
              className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-between transition ${
                currentLanguage === 'en'
                  ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]'
                  : 'bg-[#14161C] border-[#252834] text-[#A9A397] hover:text-[#EDE8DF]'
              }`}
            >
              <div>
                <span className="font-semibold block text-[#EDE8DF]">English</span>
                <span className="text-[11px] text-[#8C877D]">King James Version</span>
              </div>
              {currentLanguage === 'en' && <Check className="w-4 h-4 text-[#D4AF37]" />}
            </button>

            <button
              onClick={() => setLanguage('ta')}
              className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-between transition ${
                currentLanguage === 'ta'
                  ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]'
                  : 'bg-[#14161C] border-[#252834] text-[#A9A397] hover:text-[#EDE8DF]'
              }`}
            >
              <div>
                <span className="font-semibold font-tamil block text-[#EDE8DF]">தமிழ்</span>
                <span className="text-[11px] text-[#8C877D]">பரிசுத்த வேதாகமம்</span>
              </div>
              {currentLanguage === 'ta' && <Check className="w-4 h-4 text-[#D4AF37]" />}
            </button>
          </div>
        </div>

        {/* Selected Version Metadata Card (Mandatory Section 2) */}
        {currentMeta && (
          <div className="p-4 rounded-xl bg-[#14161C] border border-[#252834] space-y-2 text-xs">
            <span className="font-semibold text-[#D4AF37] block">
              Active Version Metadata
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#A9A397]">
              <div><strong>Version Name:</strong> {currentMeta.name}</div>
              <div><strong>Language:</strong> {currentMeta.language === 'ta' ? 'Tamil' : 'English'}</div>
              <div><strong>License:</strong> {currentMeta.license}</div>
              <div><strong>Publisher:</strong> {currentMeta.publisher}</div>
              <div><strong>Source:</strong> {currentMeta.source}</div>
              <div><strong>Version ID:</strong> <span className="font-mono text-[#D4AF37]">{currentMeta.versionId}</span></div>
            </div>
            {currentMeta.description && (
              <p className="pt-2 text-[11px] text-[#7C776E] border-t border-[#20232D]">
                {currentMeta.description}
              </p>
            )}
          </div>
        )}
      </section>

      {/* 2. Reading Display Preferences (Section 11) */}
      <section className="p-5 sm:p-6 rounded-2xl bg-[#181A22] border border-[#272B38] space-y-5">
        <div className="flex items-center gap-2 pb-2 border-b border-[#252834]">
          <Palette className="w-4 h-4 text-[#D4AF37]" />
          <h3 className="text-sm font-semibold text-[#EDE8DF]">Visual & Reading Preferences</h3>
        </div>

        {/* Theme */}
        <div>
          <label className="text-xs font-semibold text-[#8C877D] uppercase tracking-wider block mb-2">
            Color Theme
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['dark', 'light', 'system'] as const).map((t) => (
              <button
                key={t}
                onClick={() => updateReadingSettings({ theme: t })}
                className={`py-2 px-3 rounded-xl border text-xs font-medium capitalize transition ${
                  readingSettings.theme === t
                    ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]'
                    : 'bg-[#14161C] border-[#252834] text-[#A9A397] hover:text-[#EDE8DF]'
                }`}
              >
                {t} Mode
              </button>
            ))}
          </div>
        </div>

        {/* Font Size slider */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-[#8C877D] uppercase tracking-wider">
              Default Font Size
            </label>
            <span className="font-mono text-xs text-[#D4AF37]">{readingSettings.fontSize}px</span>
          </div>
          <input
            type="range"
            min="14"
            max="28"
            value={readingSettings.fontSize}
            onChange={(e) => updateReadingSettings({ fontSize: Number(e.target.value) })}
            className="w-full accent-[#D4AF37] h-1.5 bg-[#252834] rounded cursor-pointer"
          />
        </div>

        {/* Line spacing & width */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <label className="font-semibold text-[#8C877D] uppercase tracking-wider block mb-1.5">
              Line Spacing
            </label>
            <select
              value={readingSettings.lineHeight}
              onChange={(e) => updateReadingSettings({ lineHeight: e.target.value as any })}
              className="w-full p-2 bg-[#14161C] border border-[#252834] rounded-xl text-[#EDE8DF] focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="compact">Compact</option>
              <option value="comfortable">Comfortable</option>
              <option value="spacious">Spacious</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-[#8C877D] uppercase tracking-wider block mb-1.5">
              Reading Width
            </label>
            <select
              value={readingSettings.readingWidth}
              onChange={(e) => updateReadingSettings({ readingWidth: e.target.value as any })}
              className="w-full p-2 bg-[#14161C] border border-[#252834] rounded-xl text-[#EDE8DF] focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="narrow">Narrow (Centered)</option>
              <option value="standard">Standard</option>
              <option value="wide">Wide Screen</option>
            </select>
          </div>
        </div>
      </section>

      {/* 3. Data & Storage Management (Section 35 & 41) */}
      <section className="p-5 sm:p-6 rounded-2xl bg-[#181A22] border border-[#272B38] space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#252834]">
          <HardDrive className="w-4 h-4 text-[#D4AF37]" />
          <h3 className="text-sm font-semibold text-[#EDE8DF]">Local Storage & Privacy</h3>
        </div>

        <div className="text-xs text-[#A9A397] space-y-2">
          <p>
            All user data (bookmarks, highlights, personal notes, reading history, and favorites) is stored exclusively on your device using IndexedDB.
          </p>
          <p>
            No private data or annotations are sent to external analytics or AI servers.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('admin')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#222530] hover:bg-[#2C3040] text-xs font-semibold text-[#EDE8DF] border border-[#2F3444] transition"
          >
            <Database className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Dataset Validator & Importer</span>
          </button>

          {!confirmReset ? (
            <button
              onClick={() => setConfirmReset(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-xs font-semibold text-rose-300 border border-rose-500/30 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Reading Progress</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-rose-400 font-medium">Are you sure?</span>
              <button
                onClick={handleResetProgress}
                className="px-3 py-1.5 bg-rose-500 text-white rounded-lg text-xs font-bold"
              >
                Yes, Reset
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="px-3 py-1.5 bg-[#222530] text-[#A9A397] rounded-lg text-xs"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. About (Section 43) */}
      <section className="p-5 sm:p-6 rounded-2xl bg-[#181A22] border border-[#272B38] space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#252834]">
          <Info className="w-4 h-4 text-[#D4AF37]" />
          <h3 className="text-sm font-semibold text-[#EDE8DF]">About</h3>
        </div>

        <div className="space-y-3 text-xs leading-relaxed text-[#A9A397]">
          {/* Owner & Contact Information */}
          <div className="p-3.5 rounded-xl bg-[#14161C] border border-[#252834] space-y-2 text-xs">
            <p className="text-[#EDE8DF]">
              <strong className="text-[#A9A397]">Owner:</strong> Sathya Kumar A
            </p>
            <p className="text-[#EDE8DF]">
              <strong className="text-[#A9A397]">Contact:</strong>{' '}
              <a
                href="tel:+919042171585"
                className="text-[#D4AF37] hover:underline font-medium"
              >
                +91 90421 71585
              </a>
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#14161C] border border-[#252834]">
            <h4 className="font-cinzel text-base font-bold text-[#EDE8DF]">SVS Bible</h4>
            <p className="text-[11px] text-[#C5A059] font-medium mt-0.5">
              Accurate Scripture. Beautiful Reading. Simple Faith.
            </p>
            <p className="mt-2 text-xs text-[#EDE8DF]">
              “A Bible reading application designed for clear, accessible and distraction-free Scripture reading.”
            </p>
          </div>

          <div className="space-y-1.5 pt-1">
            <h5 className="font-semibold text-[#EDE8DF]">Scripture Integrity Declaration:</h5>
            <p>
              The Bible text in SVS Bible is never generated, paraphrased, summarized, or invented by artificial intelligence. Every verse is preserved in its authentic canonical public domain form.
            </p>
          </div>

          <div className="space-y-1 pt-1 text-[11px] text-[#7C776E]">
            <p><strong>App Version:</strong> 1.0.0</p>
            <p>
              <strong>Disclaimer:</strong> SVS Bible is an independent Christian reading software. It does not claim official affiliation with any single church, publisher, denomination, or Bible society.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
