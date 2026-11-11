
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function LessonNavigation({
  onPrev,
  onNext,
  onComplete,
  disablePrev = false,
  disableNext = false,
  isCompleted = false,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">

      <button
        onClick={onPrev}
        disabled={disablePrev}
        className="lesson-nav-button flex items-center gap-2 rounded-xl border border-white/[0.07] px-4 py-3 text-xs font-medium text-slate-300 transition-all duration-300 hover:border-violet-400/30 hover:bg-violet-400/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ArrowLeft size={15} />
        Previous lesson
      </button>

      {!isCompleted ? (
        <button
          onClick={onComplete}
          className="lesson-nav-button flex items-center gap-2 rounded-xl bg-violet-500 px-5 py-3 text-xs font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-400 hover:shadow-violet-500/30 active:scale-95"
        >
          <CheckCircle2 size={16} />
          Mark as completed
        </button>
      ) : (
        <span className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-xs font-medium text-emerald-300">
          <CheckCircle2 size={16} />
          Lesson completed
        </span>
      )}

      <button
        onClick={onNext}
        disabled={disableNext}
        className="lesson-nav-button flex items-center gap-2 rounded-xl border border-white/[0.07] px-4 py-3 text-xs font-medium text-slate-300 transition-all duration-300 hover:border-violet-400/30 hover:bg-violet-400/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
      >
        Next lesson
        <ArrowRight size={15} />
      </button>

    </div>
  );
}
