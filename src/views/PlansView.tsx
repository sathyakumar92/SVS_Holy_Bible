import React, { useState, useEffect } from 'react';
import { useBible } from '../context/BibleContext';
import { READING_PLANS } from '../data/readingPlans';
import { ReadingPlan, UserPlanProgress } from '../types/bible';
import { dbPlans } from '../services/db';
import { Compass, CheckCircle2, Play, Pause, RotateCcw, ArrowRight } from 'lucide-react';

export const PlansView: React.FC = () => {
  const { currentLanguage, goToScripture } = useBible();
  const [userPlans, setUserPlans] = useState<UserPlanProgress[]>([]);

  useEffect(() => {
    dbPlans.getAll().then(setUserPlans);
  }, []);

  const getPlanProgress = (planId: string): UserPlanProgress | undefined => {
    return userPlans.find((p) => p.planId === planId);
  };

  const startPlan = async (planId: string) => {
    const newProg: UserPlanProgress = {
      planId,
      startedAt: Date.now(),
      completedDays: [],
      isPaused: false,
    };
    await dbPlans.save(newProg);
    setUserPlans((prev) => [...prev.filter((p) => p.planId !== planId), newProg]);
  };

  const toggleDayComplete = async (planId: string, day: number) => {
    const current = getPlanProgress(planId) || {
      planId,
      startedAt: Date.now(),
      completedDays: [],
      isPaused: false,
    };

    const hasDay = current.completedDays.includes(day);
    const updated: UserPlanProgress = {
      ...current,
      completedDays: hasDay
        ? current.completedDays.filter((d) => d !== day)
        : [...current.completedDays, day],
    };

    await dbPlans.save(updated);
    setUserPlans((prev) => [...prev.filter((p) => p.planId !== planId), updated]);
  };

  const resetPlan = async (planId: string) => {
    const updated: UserPlanProgress = {
      planId,
      startedAt: Date.now(),
      completedDays: [],
      isPaused: false,
    };
    await dbPlans.save(updated);
    setUserPlans((prev) => [...prev.filter((p) => p.planId !== planId), updated]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12 space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-[#EDE8DF]">
          {currentLanguage === 'ta' ? 'வேதாகம வாசிப்புத் திட்டங்கள்' : 'Bible Reading Plans'}
        </h2>
        <p className="text-xs text-[#A9A397]">
          {currentLanguage === 'ta'
            ? 'தினசரி வழிகாட்டப்பட்ட வேத வாசிப்புப் பகுதிகள்'
            : 'Structured devotional reading paths through the canonical Scriptures'}
        </p>
      </div>

      <div className="space-y-6">
        {READING_PLANS.map((plan) => {
          const progress = getPlanProgress(plan.id);
          const isStarted = !!progress;
          const completedCount = progress ? progress.completedDays.length : 0;
          const totalDays = plan.days.length;
          const percent = Math.round((completedCount / totalDays) * 100);

          const title = currentLanguage === 'ta' ? plan.tamilTitle : plan.title;
          const desc = currentLanguage === 'ta' ? plan.tamilDescription : plan.description;

          return (
            <div
              key={plan.id}
              className="p-5 sm:p-6 rounded-2xl bg-[#181A22] border border-[#272B38] space-y-4 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#252834]">
                <div>
                  <h3 className="text-base font-bold text-[#EDE8DF]">{title}</h3>
                  <p className="text-xs text-[#A9A397] mt-0.5">{desc}</p>
                </div>

                <div className="flex items-center gap-2">
                  {!isStarted ? (
                    <button
                      onClick={() => startPlan(plan.id)}
                      className="px-3.5 py-1.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#121316] font-semibold text-xs rounded-xl shadow transition"
                    >
                      Start Plan
                    </button>
                  ) : (
                    <button
                      onClick={() => resetPlan(plan.id)}
                      className="p-1.5 rounded-lg border border-[#2D313F] text-[#8C877D] hover:text-[#EDE8DF] transition text-xs flex items-center gap-1"
                      title="Reset Plan"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              {isStarted && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#A9A397]">
                      {completedCount} of {totalDays} days completed
                    </span>
                    <span className="font-mono text-[#D4AF37]">{percent}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#242733] overflow-hidden">
                    <div
                      className="h-full bg-[#D4AF37] transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Daily Readings Schedule */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-semibold text-[#8C877D] uppercase tracking-wider block mb-1">
                  Daily Scripture Readings
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {plan.days.map((d) => {
                    const isDayDone = progress?.completedDays.includes(d.day);
                    const firstReading = d.readings[0];

                    return (
                      <div
                        key={d.day}
                        className={`p-3 rounded-xl border flex items-center justify-between text-xs transition ${
                          isDayDone
                            ? 'bg-[#15171D] border-[#2A2E3B] opacity-75'
                            : 'bg-[#191C25] border-[#2E3342]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <button
                            onClick={() => toggleDayComplete(plan.id, d.day)}
                            className="p-0.5 rounded text-[#D4AF37] hover:scale-110 transition"
                            title={isDayDone ? 'Mark as unread' : 'Mark as done'}
                          >
                            <CheckCircle2
                              className={`w-4 h-4 ${isDayDone ? 'fill-[#D4AF37] text-[#121316]' : 'text-[#5C574F]'}`}
                            />
                          </button>
                          <div>
                            <span className="font-semibold text-[#EDE8DF]">Day {d.day}:</span>{' '}
                            <span className="text-[#A9A397]">{d.title}</span>
                          </div>
                        </div>

                        {firstReading && (
                          <button
                            onClick={() =>
                              goToScripture(firstReading.bookId, firstReading.chapterNumber)
                            }
                            className="text-[11px] text-[#D4AF37] hover:underline flex items-center gap-0.5 shrink-0 ml-2"
                          >
                            <span>Read</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
