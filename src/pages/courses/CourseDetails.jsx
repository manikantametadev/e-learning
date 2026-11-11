
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Clock3,
  BookOpen,
  ArrowLeft,
  PlayCircle,
  CheckCircle2,
  Star,
  Users,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  LockKeyhole,
  Sparkles,
  Award,
  MonitorPlay,
  ArrowUpRight,
} from "lucide-react";

import { courses } from "../../data/courses";
import { lessons } from "../../data/lessons";

import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import useEnrollment from "../../hooks/useEnrollment";
import InstructorCard from "../../components/courses/InstructorCard";

export default function CourseDetails() {
  const { id } = useParams();

const course = courses.find((c) => c.id === Number(id));

const courseLessons = lessons.filter(
  (lesson) => lesson.courseId === Number(id)
);

  const { enroll, isEnrolled } = useEnrollment();

  const [expandedLesson, setExpandedLesson] = useState(null);

  if (!course) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="mb-4 rounded-2xl bg-violet-400/10 p-5 text-violet-300">
          <BookOpen size={32} />
        </div>
        <h2 className="text-xl font-semibold text-white">
          Course not found
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          This course may have been removed or is unavailable.
        </p>
        <Link
          to="/courses"
          className="mt-5 inline-flex items-center gap-2 text-sm text-violet-300 hover:text-violet-200"
        >
          <ArrowLeft size={16} />
          Back to courses
        </Link>
      </div>
    );
  }

  const enrolled = isEnrolled(course.id);

  const learningPoints = [
    "Understand the core concepts and best practices",
    "Apply your skills through practical exercises",
    "Build confidence with real-world projects",
    "Earn a certificate after completion",
  ];

  const toggleLesson = (lessonId) => {
    setExpandedLesson((current) =>
      current === lessonId ? null : lessonId
    );
  };

  return (
    <div className="course-details-page mx-auto max-w-[1450px] space-y-6">

      {/* BREADCRUMB */}
      <div className="course-details-enter">
        <Link
          to="/courses"
          className="group inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition-colors hover:text-violet-300"
        >
          <ArrowLeft
            size={15}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to courses
        </Link>
      </div>

      {/* COURSE HERO */}
      <section
        className={`course-hero relative isolate overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br ${course.color || "from-violet-700 to-indigo-950"}`}
      >

        {/* Course image */}
        {course.image && (
          <img
            src={course.image}
            alt={course.title}
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
        )}

        {/* Image overlays */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#111116] via-[#111116]/90 to-[#111116]/45" />

        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#111116]/70 via-transparent to-black/10" />

        {/* Decorative glow */}
        <div className="hero-glow absolute -right-20 -top-32 -z-10 h-96 w-96 rounded-full bg-violet-500/25 blur-[100px]" />

        <div className="relative grid min-h-[360px] items-center gap-8 p-6 md:p-10 lg:grid-cols-[1fr_260px] lg:p-12">

          {/* Hero content */}
          <div className="max-w-3xl">

            <div className="mb-5 flex flex-wrap items-center gap-2">
              <Badge>{course.category}</Badge>

              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-medium text-white/80 backdrop-blur-md">
                {course.level}
              </span>

              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Available now
              </span>
            </div>

            <h1 className="course-hero-title max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-[42px]">
              {course.title}
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300/80">
              {course.description ||
                "Explore this learning journey, develop practical skills, and build your knowledge through structured lessons and hands-on learning."}
            </p>

            {/* Course metadata */}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-300">

              <span className="flex items-center gap-2">
                <BookOpen size={16} className="text-violet-300" />
                {course.lessons} lessons
              </span>

              <span className="flex items-center gap-2">
                <Clock3 size={16} className="text-violet-300" />
                {course.duration}
              </span>

              <span className="flex items-center gap-2">
                <Star
                  size={15}
                  fill="#fbbf24"
                  className="text-amber-400"
                />
                {course.rating} rating
              </span>

              <span className="flex items-center gap-2">
                <GraduationCap size={16} className="text-violet-300" />
                Expert instructor
              </span>

            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-3">

              {enrolled ? (
                <Link
                  to="/learning"
                  className="group inline-flex items-center gap-2 rounded-xl bg-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-violet-400 hover:shadow-violet-500/40 active:scale-95"
                >
                  <PlayCircle size={18} />
                  Continue learning
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              ) : (
                <Button
                  onClick={() => enroll(course.id)}
                >
                  <span className="flex items-center gap-2">
                    <GraduationCap size={17} />
                    Enroll in this course
                    <ArrowUpRight size={15} />
                  </span>
                </Button>
              )}

              <span className="text-[11px] text-slate-400">
                {enrolled
                  ? "You're enrolled in this course"
                  : "Start learning at your own pace"}
              </span>

            </div>
          </div>

          {/* Hero side information */}
          <div className="hidden lg:flex lg:justify-center">
            <div className="hero-preview relative flex h-52 w-52 items-center justify-center rounded-[32px] border border-white/15 bg-white/[0.07] shadow-2xl backdrop-blur-xl transition-transform duration-500 hover:rotate-3 hover:scale-105">

              {course.image ? (
                <img
                  src={course.image}
                  alt=""
                  className="h-full w-full rounded-[32px] object-cover opacity-80"
                />
              ) : (
                <div className="text-7xl font-bold text-white/80">
                  {course.title[0]}
                </div>
              )}

              <div className="absolute inset-0 flex items-center justify-center rounded-[32px] bg-black/20">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white shadow-xl backdrop-blur-lg transition-transform duration-300 hover:scale-110">
                  <PlayCircle size={30} />
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 rounded-2xl border border-white/10 bg-[#20202a] p-3 shadow-xl">
                <Sparkles size={22} className="text-violet-300" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* COURSE CONTENT */}
      <section className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,.75fr)]">

        {/* LEFT CONTENT */}
        <div className="min-w-0 space-y-6">

          {/* Overview */}
          <div className="details-panel course-details-enter rounded-2xl border border-white/[0.06] bg-[#191920] p-5 md:p-6">

            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Course curriculum
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Explore the lessons included in this course.
                </p>
              </div>

              <div className="rounded-xl bg-violet-400/10 p-2.5 text-violet-300">
                <BookOpen size={19} />
              </div>
            </div>

            {/* Curriculum statistics */}
            <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3">

              <div className="rounded-xl border border-white/[0.05] bg-white/[0.025] p-3">
                <p className="text-xl font-semibold text-white">
                  {courseLessons.length}
                </p>
                <p className="mt-1 text-[10px] text-slate-500">
                  Available lessons
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.05] bg-white/[0.025] p-3">
                <p className="text-xl font-semibold text-white">
                  {course.duration}
                </p>
                <p className="mt-1 text-[10px] text-slate-500">
                  Total duration
                </p>
              </div>

              <div className="col-span-2 rounded-xl border border-white/[0.05] bg-white/[0.025] p-3 sm:col-span-1">
                <p className="text-xl font-semibold text-emerald-300">
                  {lessons.filter((lesson) => lesson.done).length}
                </p>
                <p className="mt-1 text-[10px] text-slate-500">
                  Completed lessons
                </p>
              </div>

            </div>

            {/* Lesson list */}
            <div className="space-y-2">

              {lessons.map((lesson, index) => {
                const expanded = expandedLesson === lesson.id;

                return (
                  <div
                    key={lesson.id}
                    className={`lesson-item overflow-hidden rounded-xl border transition-all duration-300 ${
                      expanded
                        ? "border-violet-400/25 bg-violet-400/[0.045]"
                        : "border-white/[0.045] bg-white/[0.025] hover:border-white/10 hover:bg-white/[0.045]"
                    }`}
                  >

                    <button
                      type="button"
                      onClick={() => toggleLesson(lesson.id)}
                      aria-expanded={expanded}
                      className="flex w-full items-center gap-3 p-3 text-left"
                    >

                      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xs font-semibold transition-all duration-300 ${
                        lesson.done
                          ? "bg-emerald-400/10 text-emerald-300"
                          : "bg-violet-400/10 text-violet-300"
                      }`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-200">
                          {lesson.title}
                        </p>

                        <p className="mt-1 text-[10px] text-slate-500">
                          Lesson {index + 1} · {lesson.duration}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-3">

                        {lesson.done ? (
                          <CheckCircle2
                            size={17}
                            className="text-emerald-300"
                          />
                        ) : (
                          <PlayCircle
                            size={17}
                            className="text-slate-500"
                          />
                        )}

                        {expanded ? (
                          <ChevronUp size={16} className="text-slate-500" />
                        ) : (
                          <ChevronDown size={16} className="text-slate-500" />
                        )}

                      </div>

                    </button>

                    {expanded && (
                      <div className="lesson-description border-t border-white/[0.06] px-4 py-3 pl-[62px]">

                        <p className="text-xs leading-6 text-slate-400">
                          {lesson.description ||
                            "Explore this lesson and strengthen your understanding through guided learning."}
                        </p>

                        {enrolled ? (
                          <Link
                            to="/learning"
                            className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-violet-300 transition hover:text-violet-200"
                          >
                            <PlayCircle size={14} />
                            Start lesson
                            <ArrowUpRight size={13} />
                          </Link>
                        ) : (
                          <p className="mt-3 flex items-center gap-2 text-[10px] text-slate-500">
                            <LockKeyhole size={13} />
                            Enroll to access this lesson
                          </p>
                        )}

                      </div>
                    )}

                  </div>
                );
              })}

            </div>

          </div>

          {/* Learning outcomes */}
          <div className="details-panel rounded-2xl border border-white/[0.06] bg-[#191920] p-5 md:p-6">

            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-emerald-400/10 p-2.5 text-emerald-300">
                <TargetIcon />
              </div>

              <div>
                <h2 className="font-semibold text-white">
                  What you'll learn
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Skills and knowledge you'll gain.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {learningPoints.map((point, index) => (
                <div
                  key={point}
                  className="learning-point flex items-start gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] p-3 transition-all duration-300 hover:border-emerald-400/20 hover:bg-emerald-400/[0.035]"
                >
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-emerald-400"
                  />

                  <p className="text-xs leading-5 text-slate-400">
                    {point}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="course-details-enter space-y-5 lg:sticky lg:top-6">

          {/* Enrollment card */}
          <div className="details-panel overflow-hidden rounded-2xl border border-white/[0.07] bg-[#191920]">

            <div className="border-b border-white/[0.06] bg-gradient-to-br from-violet-500/[0.12] to-transparent p-5">

              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-400/15 text-violet-300">
                <GraduationCap size={22} />
              </div>

              <h3 className="text-base font-semibold text-white">
                Start your learning journey
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Learn at your own pace with structured lessons and practical knowledge.
              </p>

              <div className="mt-5">
                {enrolled ? (
                  <Link
                    to="/learning"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-4 py-3 text-xs font-semibold text-white transition-all hover:bg-violet-400 hover:shadow-lg hover:shadow-violet-500/20"
                  >
                    <PlayCircle size={16} />
                    Continue learning
                  </Link>
                ) : (
                  <Button
                    onClick={() => enroll(course.id)}
                  >
                    <span className="flex items-center justify-center gap-2">
                      Enroll now
                      <ArrowUpRight size={15} />
                    </span>
                  </Button>
                )}
              </div>

            </div>

            <div className="space-y-4 p-5">

              <h4 className="text-xs font-semibold text-slate-300">
                Course includes
              </h4>

              {[
                { icon: MonitorPlay, label: `${course.lessons} video lessons` },
                { icon: Clock3, label: `${course.duration} of learning` },
                { icon: Award, label: "Completion certificate" },
                { icon: BookOpen, label: "Practical learning content" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 text-xs text-slate-400"
                >
                  <Icon size={15} className="text-violet-300" />
                  {label}
                </div>
              ))}

            </div>

          </div>

          {/* Instructor */}
          <div className="details-panel rounded-2xl border border-white/[0.06] bg-[#191920] p-5">

            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">
                Your instructor
              </h3>

              <Users size={16} className="text-violet-300" />
            </div>

            <InstructorCard name={course.instructor} />

          </div>

          {/* Learning reminder */}
          <div className="rounded-2xl border border-violet-400/10 bg-gradient-to-br from-violet-500/[0.12] to-fuchsia-500/[0.04] p-5">

            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-400/15 text-violet-300">
              <Sparkles size={18} />
            </div>

            <h3 className="text-sm font-semibold text-slate-100">
              Invest in yourself
            </h3>

            <p className="mt-2 text-xs leading-5 text-slate-400">
              Consistent learning today creates better opportunities tomorrow.
            </p>

          </div>

        </aside>

      </section>

    </div>
  );
}

function TargetIcon() {
  return <Sparkles size={19} />;
}
