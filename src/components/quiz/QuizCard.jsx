
import {
  Clock3,
  HelpCircle,
  ArrowUpRight,
  CheckCircle2,
  Play,
  RotateCcw,
} from "lucide-react";
import Badge from "../common/Badge";
import { Link } from "react-router-dom";

export default function QuizCard({ quiz }) {
  const isCompleted = quiz.status === "Completed";
  const isInProgress = quiz.status === "In progress";

  const statusTone = isCompleted
    ? "green"
    : isInProgress
      ? "orange"
      : "violet";

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#191920] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-[#1d1d26] hover:shadow-[0_12px_35px_rgba(139,92,246,0.10)]">

      {/* Top section */}
      <div className="flex items-center justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-xl border border-violet-400/10 bg-violet-400/10 text-violet-300 transition-transform duration-300 group-hover:scale-110">
          <HelpCircle size={20} />
        </div>

        <Badge tone={statusTone}>{quiz.status}</Badge>
      </div>

      {/* Quiz information */}
      <div className="mt-5">
        <h3 className="text-base font-semibold text-white transition-colors group-hover:text-violet-300">
          {quiz.title}
        </h3>

        <p className="mt-1.5 text-xs text-slate-500">
          {quiz.course}
        </p>
      </div>

      {/* Quiz statistics */}
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/[0.06] pt-4">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <HelpCircle size={14} className="text-violet-300" />
          <span>{quiz.questions} Questions</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Clock3 size={14} className="text-violet-300" />
          <span>{quiz.duration}</span>
        </div>
      </div>

      {/* Optional score */}
      {isCompleted && quiz.score !== undefined && (
        <div className="mt-4 flex items-center justify-between rounded-xl bg-emerald-400/[0.06] px-3 py-2.5">
          <span className="text-xs text-slate-400">Your score</span>
          <span className="text-sm font-semibold text-emerald-400">
            {quiz.score}%
          </span>
        </div>
      )}

      {/* Action */}
      <Link
        to={`/quizzes/${quiz.id}`}
        className="mt-5 flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3 text-xs font-medium text-slate-300 transition-all duration-300 hover:border-violet-400/20 hover:bg-violet-400/10 hover:text-white"
      >
        <span className="flex items-center gap-2">
          {isCompleted ? (
            <>
              <RotateCcw size={14} />
              Review quiz
            </>
          ) : isInProgress ? (
            <>
              <Play size={14} />
              Continue quiz
            </>
          ) : (
            <>
              <CheckCircle2 size={14} />
              Start quiz
            </>
          )}
        </span>

        <ArrowUpRight
          size={15}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </Link>
    </article>
  );
}
