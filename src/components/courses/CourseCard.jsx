
import {
  Clock3,
  BookOpen,
  Star,
  ArrowUpRight,
  PlayCircle,
  GraduationCap,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";
import Badge from "../common/Badge";
import ProgressBar from "../common/ProgressBar";

export default function CourseCard({
  course,
  showProgress = false,
}) {
  return (
    <article className="course-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#191920] transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-400/30 hover:shadow-[0_15px_40px_rgba(139,92,246,0.10)]">

     {/* COURSE THUMBNAIL */}
<Link
  to={`/courses/${course.id}`}
  className={`course-thumbnail relative flex h-44 shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br ${course.color}`}
>
  {course.image ? (
    <img
      src={course.image}
      alt={course.title}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
  ) : (
    <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/20 bg-white/10 text-5xl font-bold text-white/90 backdrop-blur-sm">
      {course.title?.[0]?.toUpperCase() || "C"}
    </div>
  )}

  {/* Dark image overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/10" />

  {/* Category */}
  <div className="absolute left-4 top-4 z-10">
    <Badge>{course.category}</Badge>
  </div>

  {/* Rating */}
  <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1 rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
    <Star size={12} fill="#fbbf24" className="text-amber-400" />
    {course.rating}
  </div>

  {/* Hover preview */}
  <div className="absolute bottom-4 right-4 z-10 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
    <PlayCircle size={19} />
  </div>
</Link>

      {/* COURSE CONTENT */}
      <div className="flex flex-1 flex-col p-4">

        {/* Level and rating */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-slate-400">
            {course.level}
          </span>

          <span className="flex items-center gap-1 text-[11px] text-slate-500">
            <GraduationCap size={13} />
            Professional learning
          </span>
        </div>

        {/* Course title */}
        <Link
          to={`/courses/${course.id}`}
          className="line-clamp-2 min-h-[48px] text-[15px] font-semibold leading-6 text-slate-100 transition-colors duration-200 hover:text-violet-300"
        >
          {course.title}
        </Link>

        {/* Instructor */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-400/10 text-[10px] font-semibold text-violet-300">
            {course.instructor?.[0]?.toUpperCase() || "I"}
          </div>

          <p className="truncate text-xs text-slate-500">
            by <span className="text-slate-400">{course.instructor}</span>
          </p>
        </div>

        {/* Course information */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/[0.06] pt-3 text-[11px] text-slate-500">

          <span className="flex items-center gap-1.5">
            <BookOpen size={14} className="text-violet-300/70" />
            {course.lessons} lessons
          </span>

          <span className="flex items-center gap-1.5">
            <Clock3 size={14} className="text-violet-300/70" />
            {course.duration}
          </span>

        </div>

        {/* Progress */}
        {showProgress && (
          <div className="mt-4 rounded-xl border border-white/[0.05] bg-white/[0.025] p-3">

            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-500">
                Your progress
              </span>

              <span className="text-xs font-semibold text-violet-300">
                {course.progress}%
              </span>
            </div>

            <ProgressBar value={course.progress} />

          </div>
        )}

        {/* Footer button */}
        <div className="mt-auto pt-4">
          <Link
            to={`/courses/${course.id}`}
            className="course-action flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.035] px-3.5 py-3 text-xs font-semibold text-slate-300 transition-all duration-300 hover:border-violet-400/25 hover:bg-violet-500/10 hover:text-violet-200 active:scale-[0.98]"
          >
            <span>View course</span>

            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

      </div>
    </article>
  );
}
