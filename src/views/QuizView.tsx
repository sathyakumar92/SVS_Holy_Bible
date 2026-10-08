import React, { useState, useMemo } from 'react';
import { useBible } from '../context/BibleContext';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { QuizQuestion, Testament, QuizDifficulty } from '../types/bible';
import {
  HelpCircle,
  Award,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Filter,
  Sparkles,
  Check,
} from 'lucide-react';

export const QuizView: React.FC = () => {
  const { currentLanguage, goToScripture } = useBible();

  const [selectedTestament, setSelectedTestament] = useState<'ALL' | Testament>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'ALL' | QuizDifficulty>('ALL');

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<
    {
      question: QuizQuestion;
      selected: number;
      isCorrect: boolean;
    }[]
  >([]);

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return QUIZ_QUESTIONS.filter((q) => {
      if (selectedTestament !== 'ALL' && q.testament !== selectedTestament) return false;
      if (selectedDifficulty !== 'ALL' && q.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [selectedTestament, selectedDifficulty]);

  const currentQ = filteredQuestions[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionIndex(index);
    setIsAnswerSubmitted(true);

    const isCorrect = index === currentQ.correctAnswerIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setUserAnswers((prev) => [
      ...prev,
      {
        question: currentQ,
        selected: index,
        isCorrect,
      },
    ]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizCompleted(false);
    setUserAnswers([]);
  };

  const handleOpenScripture = (refStr: string) => {
    // E.g. "Genesis 1:1" or "Romans 8:31"
    const parts = refStr.match(/^(\d?\s*[a-zA-Z]+)\s+(\d+):(\d+)$/);
    if (parts) {
      // Find bookId from books
      const name = parts[1].trim().toLowerCase();
      const chapter = parseInt(parts[2], 10);
      const verse = parseInt(parts[3], 10);

      const bookMap: Record<string, string> = {
        genesis: 'GEN',
        exodus: 'EXO',
        psalms: 'PSA',
        psalm: 'PSA',
        proverbs: 'PRO',
        isaiah: 'ISA',
        matthew: 'MAT',
        john: 'JHN',
        romans: 'ROM',
        '1 corinthians': '1CO',
        revelation: 'REV',
        joshua: 'JOS',
        micah: 'MIC',
      };

      const bookId = bookMap[name] || 'GEN';
      goToScripture(bookId, chapter, verse);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#181B22] to-[#1F232D] border border-[#2B2F3D] shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center font-bold">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-cinzel text-[#EDE8DF]">
              {currentLanguage === 'ta' ? 'வேதாகம வினாடி வினா' : 'Bible Scripture Quiz'}
            </h1>
            <p className="text-xs text-[#A9A397]">
              {currentLanguage === 'ta'
                ? 'சரிபார்க்கப்பட்ட அதிகாரப்பூர்வ வேத வசனங்களின் அடிப்படையில்'
                : '100% verified against canonical King James & Tamil Scripture'}
            </p>
          </div>
        </div>

        {/* Score indicator badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#14161C] border border-[#2A2E3B]">
          <Award className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-xs font-medium text-[#A9A397]">
            {currentLanguage === 'ta' ? 'மதிப்பெண்:' : 'Score:'}
          </span>
          <span className="text-sm font-mono font-bold text-[#EDE8DF]">
            {score} / {filteredQuestions.length}
          </span>
        </div>
      </div>

      {/* Filters (Testament & Difficulty) */}
      {!isQuizCompleted && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-[#14161C] border border-[#242732] text-xs">
          {/* Testament filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#8E897F] font-medium mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              {currentLanguage === 'ta' ? 'ஏற்பாடு:' : 'Testament:'}
            </span>
            {(['ALL', 'OT', 'NT'] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setSelectedTestament(t);
                  handleRestartQuiz();
                }}
                className={`px-2.5 py-1 rounded-lg transition font-medium ${
                  selectedTestament === t
                    ? 'bg-[#D4AF37] text-[#121316] font-semibold'
                    : 'bg-[#1C1F28] text-[#A9A397] hover:text-[#EDE8DF]'
                }`}
              >
                {t === 'ALL'
                  ? currentLanguage === 'ta'
                    ? 'அனைத்தும்'
                    : 'All'
                  : t === 'OT'
                  ? currentLanguage === 'ta'
                    ? 'பழைய ஏற்பாடு'
                    : 'Old Test.'
                  : currentLanguage === 'ta'
                  ? 'புதிய ஏற்பாடு'
                  : 'New Test.'}
              </button>
            ))}
          </div>

          {/* Difficulty filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#8E897F] font-medium mr-1">
              {currentLanguage === 'ta' ? 'தரம்:' : 'Difficulty:'}
            </span>
            {(['ALL', 'EASY', 'MEDIUM', 'HARD'] as const).map((d) => (
              <button
                key={d}
                onClick={() => {
                  setSelectedDifficulty(d);
                  handleRestartQuiz();
                }}
                className={`px-2.5 py-1 rounded-lg transition font-medium ${
                  selectedDifficulty === d
                    ? 'bg-[#C5A059] text-[#121316] font-semibold'
                    : 'bg-[#1C1F28] text-[#A9A397] hover:text-[#EDE8DF]'
                }`}
              >
                {d === 'ALL'
                  ? currentLanguage === 'ta'
                    ? 'அனைத்தும்'
                    : 'All'
                  : d === 'EASY'
                  ? currentLanguage === 'ta'
                    ? 'எளிது'
                    : 'Easy'
                  : d === 'MEDIUM'
                  ? currentLanguage === 'ta'
                    ? 'நடுத்தரம்'
                    : 'Medium'
                  : currentLanguage === 'ta'
                  ? 'கடினம்'
                  : 'Hard'}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Quiz Flow */}
      {!isQuizCompleted && currentQ && (
        <div className="rounded-2xl bg-[#181B22] border border-[#2B2F3D] p-5 sm:p-7 shadow-xl space-y-6">
          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-[#8E897F]">
              <span>
                {currentLanguage === 'ta' ? 'கேள்வி' : 'Question'} {currentQuestionIndex + 1} /{' '}
                {filteredQuestions.length}
              </span>
              <span className="font-mono px-2 py-0.5 rounded bg-[#202430] text-[#D4AF37]">
                {currentQ.testament === 'OT'
                  ? currentLanguage === 'ta'
                    ? 'பழைய ஏற்பாடு'
                    : 'Old Testament'
                  : currentLanguage === 'ta'
                  ? 'புதிய ஏற்பாடு'
                  : 'New Testament'}{' '}
                • {currentQ.difficulty}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#242733] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C5A059] to-[#E5C158] transition-all"
                style={{
                  width: `${((currentQuestionIndex + 1) / filteredQuestions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="py-2">
            <h2 className="text-lg sm:text-xl font-semibold text-[#EDE8DF] leading-relaxed">
              {currentLanguage === 'ta' ? currentQ.question.ta : currentQ.question.en}
            </h2>
          </div>

          {/* Multiple Choice Options */}
          <div className="space-y-2.5">
            {(currentLanguage === 'ta' ? currentQ.options.ta : currentQ.options.en).map(
              (opt, idx) => {
                const isSelected = selectedOptionIndex === idx;
                const isCorrect = idx === currentQ.correctAnswerIndex;

                let btnStyle =
                  'bg-[#14161C] border-[#2A2E3B] text-[#EDE8DF] hover:border-[#D4AF37]/50 hover:bg-[#1C1F28]';

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-950/40 border-rose-500/80 text-rose-200';
                  } else {
                    btnStyle = 'bg-[#14161C] border-[#242732] text-[#716C63] opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border text-left text-sm font-medium transition-all active:scale-98 ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-[#222530] flex items-center justify-center text-xs font-mono font-bold text-[#D4AF37]">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              }
            )}
          </div>

          {/* Explanation & Scripture Reference Box (Appears upon submit) */}
          {isAnswerSubmitted && (
            <div className="p-4 rounded-xl bg-[#14161C] border border-[#2B2F3D] space-y-3 animate-fadeIn">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-xs font-semibold uppercase text-[#D4AF37] tracking-wider">
                      {currentLanguage === 'ta' ? 'வேத வசன ஆதாரம்' : 'Scripture Reference'}
                    </span>
                  </div>
                  <p className="text-xs text-[#EDE8DF] font-medium leading-relaxed">
                    {currentLanguage === 'ta'
                      ? currentQ.explanation.ta
                      : currentQ.explanation.en}
                  </p>
                </div>

                <button
                  onClick={() => handleOpenScripture(currentQ.reference)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] text-xs font-semibold border border-[#D4AF37]/30 transition shrink-0"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>
                    {currentLanguage === 'ta' ? currentQ.tamilReference : currentQ.reference}
                  </span>
                </button>
              </div>

              {/* Next Question Button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#121316] font-semibold text-xs shadow transition active:scale-95"
                >
                  <span>
                    {currentQuestionIndex < filteredQuestions.length - 1
                      ? currentLanguage === 'ta'
                        ? 'அடுத்த கேள்வி'
                        : 'Next Question'
                      : currentLanguage === 'ta'
                      ? 'முடிவுகளைக் காண்க'
                      : 'View Results'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quiz Completed Summary View */}
      {isQuizCompleted && (
        <div className="rounded-2xl bg-[#181B22] border border-[#2B2F3D] p-6 sm:p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center mx-auto shadow-inner">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-cinzel text-[#EDE8DF]">
              {currentLanguage === 'ta' ? 'வினாடி வினா நிறைவுற்றது!' : 'Quiz Completed!'}
            </h2>
            <p className="text-sm text-[#A9A397]">
              {currentLanguage === 'ta'
                ? `உங்கள் மதிப்பெண் ${filteredQuestions.length}-க்கு ${score}`
                : `You scored ${score} out of ${filteredQuestions.length}`}
            </p>
            <div className="text-2xl font-mono font-extrabold text-[#D4AF37] mt-1">
              {Math.round((score / filteredQuestions.length) * 100)}%
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestartQuiz}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#121316] font-semibold text-xs shadow transition active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{currentLanguage === 'ta' ? 'மீண்டும் தொடங்குக' : 'Retake Quiz'}</span>
            </button>
          </div>

          {/* Review of all answers */}
          <div className="text-left space-y-3 pt-6 border-t border-[#262A36]">
            <h3 className="text-xs font-semibold text-[#8E897F] uppercase tracking-wider">
              {currentLanguage === 'ta' ? 'விடைகள் சரிபார்ப்பு' : 'Answer Review & Scripture References'}
            </h3>
            <div className="space-y-3">
              {userAnswers.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border ${
                    item.isCorrect
                      ? 'bg-emerald-950/20 border-emerald-500/30'
                      : 'bg-rose-950/20 border-rose-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-[#EDE8DF]">
                        {idx + 1}.{' '}
                        {currentLanguage === 'ta'
                          ? item.question.question.ta
                          : item.question.question.en}
                      </span>
                      <p className="text-[11px] text-[#A9A397]">
                        {currentLanguage === 'ta'
                          ? item.question.explanation.ta
                          : item.question.explanation.en}
                      </p>
                    </div>

                    <button
                      onClick={() => handleOpenScripture(item.question.reference)}
                      className="text-[11px] font-mono px-2 py-1 rounded bg-[#202430] text-[#D4AF37] hover:bg-[#D4AF37]/20 transition shrink-0"
                    >
                      {currentLanguage === 'ta'
                        ? item.question.tamilReference
                        : item.question.reference}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
