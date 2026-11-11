
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  ListVideo,
  PanelRightClose,
  PanelRightOpen,
  Sparkles,
} from "lucide-react";

import { lessons } from "../../data/lessons";
import LessonContent from "../../components/lessons/LessonContent";
import LessonSidebar from "../../components/lessons/LessonSidebar";
import LessonNavigation from "../../components/lessons/LessonNavigation";

export default function LessonViewer() {
  const [active, setActive] = useState(3);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const lesson = useMemo(
    () => lessons.find((l) => l.id === active) || lessons[0],
    [active]
  );

  const completedCount = completedLessons.length;

  const progress = lessons.length
    ? Math.round((completedCount / lessons.length) * 100)
    : 0;

  const currentIndex = lessons.findIndex((l) => l.id === lesson?.id);

  const isCompleted = completedLessons.includes(lesson?.id);

  const goToLesson = (index) => {
    const nextIndex = Math.min(
      Math.max(index, 0),
      lessons.length - 1
    );

    if (lessons[nextIndex]) {
      setActive(lessons[nextIndex].id);
    }
  };

  const next = () => {
    goToLesson(currentIndex + 1);
  };

  const prev = () => {
    goToLesson(currentIndex - 1);
  };

  const completeLesson = () => {
    if (!lesson) return;

    setCompletedLessons((previous) =>
      previous.includes(lesson.id)
        ? previous
        : [...previous, lesson.id]
    );

    if (currentIndex < lessons.length - 1) {
      next();
    }
  };

  const handleSelect = (id) => {
    setActive(id);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [active]);

  if (!lessons.length || !lesson) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <BookOpen size={36} className="mb-4 text-violet-300" />
        <h2 className="text-lg font-semibold text-white">
          No lessons available
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Lessons will appear here when they are added to the course.
        </p>
        <Link
          to="/my-courses"
          className="mt-5 text-sm text-violet-300 hover:text-violet-200"
        >
          Back to my courses
        </Link>
      </div>
    );
  }

  return (
    <div className="lesson-viewer-page mx-auto max-w-[1500px] space-y-6">

      {/* PAGE HEADER */}
      <header className="lesson-enter">

        <Link
          to="/my-courses"
          className="group inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition-colors hover:text-violet-300"
        >
          <ArrowLeft
            size={15}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to my courses
        </Link>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-4">

          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-lg bg-violet-400/10 p-2 text-violet-300">
                <GraduationCap size={17} />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[.18em] text-violet-300">
                My learning space
              </span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Product Design Fundamentals
            </h1>

            <p className="mt-2 text-xs text-slate-500">
              Module 01 · Getting started · Lesson{" "}
              {currentIndex + 1} of {lessons.length}
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-2.5">
            <Sparkles size={15} className="text-violet-300" />
            <span className="text-xs text-slate-400">
              Keep learning, keep growing
            </span>
          </div>

        </div>
      </header>

      {/* COURSE PROGRESS */}
      <section className="lesson-enter lesson-delay-1 rounded-2xl border border-white/[0.06] bg-[#191920] p-4 md:p-5">

        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">

          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-violet-300" />
            <span className="text-xs font-semibold text-slate-200">
              Your learning progress
            </span>
          </div>

          <span className="text-xs font-semibold text-violet-300">
            {progress}% completed
          </span>

        </div>

        <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400 transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-500">
          <span>
            {completedCount} of {lessons.length} lessons completed
          </span>

          <span className="flex items-center gap-1">
            <CheckCircle2 size={12} className="text-emerald-400" />
            {lessons.length - completedCount} lessons remaining
          </span>
        </div>

      </section>

      {/* MAIN LEARNING AREA */}
      <section className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">

        {/* LESSON CONTENT */}
        <div className="lesson-enter lesson-delay-2 min-w-0">

          <div className="panel overflow-hidden rounded-2xl border border-white/[0.06]">

            {/* Lesson heading */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] p-4 md:px-6">

              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-300">
                  CURRENT LESSON
                </p>

                <h2 className="mt-1 truncate text-sm font-semibold text-white md:text-base">
                  {lesson.title}
                </h2>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-lg bg-white/[0.04] px-2.5 py-2 text-[10px] text-slate-400">
                  <Clock3 size={13} />
                  {lesson.duration}
                </span>

                {isCompleted && (
                  <span className="flex items-center gap-1 rounded-lg bg-emerald-400/10 px-2.5 py-2 text-[10px] text-emerald-300">
                    <CheckCircle2 size={13} />
                    Completed
                  </span>
                )}
              </div>

            </div>

            {/* Lesson content */}
            <div key={lesson.id} className="lesson-content-transition p-4 md:p-6">
              <LessonContent lesson={lesson} />
            </div>

            {/* Lesson navigation */}
            <div className="border-t border-white/[0.06] p-4 md:px-6 md:py-5">
              <LessonNavigation
                onPrev={prev}
                onNext={next}
                onComplete={completeLesson}
                disablePrev={currentIndex === 0}
                disableNext={currentIndex === lessons.length - 1}
                isCompleted={isCompleted}
              />
            </div>

          </div>
        </div>

        {/* LESSON SIDEBAR */}
        <aside className="lesson-enter lesson-delay-3 min-w-0">

          <div className="mb-3 flex items-center justify-between lg:hidden">
            <div className="flex items-center gap-2">
              <ListVideo size={17} className="text-violet-300" />
              <span className="text-sm font-semibold text-white">
                Course lessons
              </span>
            </div>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
              aria-label="Toggle lesson list"
            >
              {sidebarOpen ? (
                <PanelRightClose size={17} />
              ) : (
                <PanelRightOpen size={17} />
              )}
            </button>
          </div>

          <div className={`${sidebarOpen ? "block" : "hidden"} lg:sticky lg:top-6`}>
            <LessonSidebar
              lessons={lessons.map((item) => ({
                ...item,
                done: completedLessons.includes(item.id) || item.done,
              }))}
              active={active}
              onSelect={handleSelect}
            />
          </div>

        </aside>

      </section>

    </div>
  );
}
