import React from 'react';
import { useBible } from '../context/BibleContext';
import { X, Moon, Sun, Monitor, Type, AlignLeft, Check } from 'lucide-react';

interface ReadingSettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReadingSettingsDrawer: React.FC<ReadingSettingsDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const { readingSettings, updateReadingSettings, currentLanguage } = useBible();

  if (!isOpen) return null;

  const fontSizes = [
    { label: 'XS', size: 14 },
    { label: 'S', size: 16 },
    { label: 'M', size: 18 },
    { label: 'L', size: 21 },
    { label: 'XL', size: 24 },
    { label: '2XL', size: 28 },
  ];

  const presets = [
    {
      id: 'comfortable',
      name: 'Comfortable',
      apply: () =>
        updateReadingSettings({
          fontSize: 18,
          lineHeight: 'comfortable',
          readingWidth: 'standard',
        }),
    },
    {
      id: 'compact',
      name: 'Compact',
      apply: () =>
        updateReadingSettings({
          fontSize: 15,
          lineHeight: 'compact',
          readingWidth: 'wide',
        }),
    },
    {
      id: 'large',
      name: 'Large Text',
      apply: () =>
        updateReadingSettings({
          fontSize: 24,
          lineHeight: 'spacious',
          readingWidth: 'standard',
        }),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="w-full max-w-sm sm:max-w-md bg-[#16181F] h-full shadow-2xl border-l border-[#2B2E3A] flex flex-col p-5 overflow-y-auto text-[#EDE8DF]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#252834]">
          <div className="flex items-center gap-2">
            <Type className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-semibold text-base">Reading Settings</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#A9A397] hover:text-[#EDE8DF] hover:bg-[#20232E] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reading Presets */}
        <div className="mt-5">
          <label className="text-xs font-semibold text-[#A9A397] uppercase tracking-wider block mb-2">
            Reading Presets
          </label>
          <div className="grid grid-cols-3 gap-2">
            {presets.map((p) => (
              <button
                key={p.id}
                onClick={p.apply}
                className="py-2 px-2.5 rounded-lg text-xs font-medium bg-[#1F222C] hover:bg-[#292D3B] border border-[#2E3340] text-[#EDE8DF] transition active:scale-95"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Font Size Control (Section 10) */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-[#A9A397] uppercase tracking-wider">
              Font Size
            </label>
            <span className="text-xs font-mono text-[#D4AF37]">{readingSettings.fontSize}px</span>
          </div>

          {/* A- / Buttons / A+ */}
          <div className="flex items-center gap-2 bg-[#1B1D25] p-1.5 rounded-xl border border-[#2E3340]">
            <button
              onClick={() =>
                updateReadingSettings({
                  fontSize: Math.max(14, readingSettings.fontSize - 2),
                })
              }
              disabled={readingSettings.fontSize <= 14}
              className="px-2.5 py-1 text-xs font-semibold rounded bg-[#252835] hover:bg-[#313647] disabled:opacity-40 transition"
              title="Decrease Font Size"
            >
              A−
            </button>

            <div className="flex-1 flex justify-between px-1">
              {fontSizes.map((item) => (
                <button
                  key={item.size}
                  onClick={() => updateReadingSettings({ fontSize: item.size })}
                  className={`px-2 py-0.5 rounded text-xs transition ${
                    readingSettings.fontSize === item.size
                      ? 'bg-[#D4AF37] text-[#121316] font-bold'
                      : 'text-[#8C877D] hover:text-[#EDE8DF]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                updateReadingSettings({
                  fontSize: Math.min(28, readingSettings.fontSize + 2),
                })
              }
              disabled={readingSettings.fontSize >= 28}
              className="px-2.5 py-1 text-xs font-semibold rounded bg-[#252835] hover:bg-[#313647] disabled:opacity-40 transition"
              title="Increase Font Size"
            >
              A+
            </button>
          </div>

          {/* Smooth slider */}
          <div className="mt-3 px-1">
            <input
              type="range"
              min="14"
              max="28"
              step="1"
              value={readingSettings.fontSize}
              onChange={(e) => updateReadingSettings({ fontSize: Number(e.target.value) })}
              className="w-full accent-[#D4AF37] h-1.5 bg-[#252834] rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Line Height Control */}
        <div className="mt-6">
          <label className="text-xs font-semibold text-[#A9A397] uppercase tracking-wider block mb-2">
            Line Spacing
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['compact', 'comfortable', 'spacious'] as const).map((lh) => (
              <button
                key={lh}
                onClick={() => updateReadingSettings({ lineHeight: lh })}
                className={`py-2 px-2 rounded-lg text-xs font-medium capitalize border transition ${
                  readingSettings.lineHeight === lh
                    ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]'
                    : 'bg-[#1F222C] border-[#2E3340] text-[#A9A397] hover:text-[#EDE8DF]'
                }`}
              >
                {lh}
              </button>
            ))}
          </div>
        </div>

        {/* Reading Width */}
        <div className="mt-6">
          <label className="text-xs font-semibold text-[#A9A397] uppercase tracking-wider block mb-2">
            Reading Width
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['narrow', 'standard', 'wide'] as const).map((w) => (
              <button
                key={w}
                onClick={() => updateReadingSettings({ readingWidth: w })}
                className={`py-2 px-2 rounded-lg text-xs font-medium capitalize border transition ${
                  readingSettings.readingWidth === w
                    ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]'
                    : 'bg-[#1F222C] border-[#2E3340] text-[#A9A397] hover:text-[#EDE8DF]'
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>

        {/* Font Family (Tamil & English Unicode support) */}
        <div className="mt-6">
          <label className="text-xs font-semibold text-[#A9A397] uppercase tracking-wider block mb-2">
            Typography Style ({currentLanguage === 'ta' ? 'தமிழ் எழுத்துரு' : 'Typeface'})
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => updateReadingSettings({ fontFamily: 'sans' })}
              className={`py-2.5 px-3 rounded-lg text-xs font-medium border flex items-center justify-between ${
                readingSettings.fontFamily === 'sans'
                  ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]'
                  : 'bg-[#1F222C] border-[#2E3340] text-[#A9A397]'
              }`}
            >
              <span>Modern Clean Sans</span>
              {readingSettings.fontFamily === 'sans' && <Check className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => updateReadingSettings({ fontFamily: 'serif' })}
              className={`py-2.5 px-3 rounded-lg text-xs font-serif border flex items-center justify-between ${
                readingSettings.fontFamily === 'serif'
                  ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]'
                  : 'bg-[#1F222C] border-[#2E3340] text-[#A9A397]'
              }`}
            >
              <span>Classic Bible Serif</span>
              {readingSettings.fontFamily === 'serif' && <Check className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Theme (Section 12) */}
        <div className="mt-6">
          <label className="text-xs font-semibold text-[#A9A397] uppercase tracking-wider block mb-2">
            Color Theme
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'dark', label: 'Dark', icon: Moon },
              { id: 'light', label: 'Light', icon: Sun },
              { id: 'system', label: 'System', icon: Monitor },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => updateReadingSettings({ theme: t.id as any })}
                  className={`py-2 px-2.5 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 transition ${
                    readingSettings.theme === t.id
                      ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]'
                      : 'bg-[#1F222C] border-[#2E3340] text-[#A9A397] hover:text-[#EDE8DF]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Toggles */}
        <div className="mt-6 pt-5 border-t border-[#252834] space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-xs font-medium text-[#EDE8DF]">Show Verse Numbers</span>
            <input
              type="checkbox"
              checked={readingSettings.showVerseNumbers}
              onChange={(e) => updateReadingSettings({ showVerseNumbers: e.target.checked })}
              className="w-4 h-4 accent-[#D4AF37] rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-xs font-medium text-[#EDE8DF]">Continuous Paragraph Mode</span>
            <input
              type="checkbox"
              checked={readingSettings.continuousReading}
              onChange={(e) => updateReadingSettings({ continuousReading: e.target.checked })}
              className="w-4 h-4 accent-[#D4AF37] rounded cursor-pointer"
            />
          </label>
        </div>

        {/* Done Button */}
        <div className="mt-auto pt-6">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#121316] font-semibold text-xs rounded-xl shadow transition"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
