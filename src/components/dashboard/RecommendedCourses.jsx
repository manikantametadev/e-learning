
import { ArrowUpRight, Star, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function RecommendedCourses({ courses = [] }) {
  const recommendedCourses = courses.slice(2, 4);

  return (
    <section className="recommended-section overflow-hidden rounded-2xl border border-white/[0.07] bg-[#191920] p-5">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-white">
            Recommended for you
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Curated to match your interests
          </p>
        </div>

        <Link
          to="/courses"
          className="group flex items-center gap-1 text-xs font-medium text-violet-300 transition-colors hover:text-violet-200"
        >
          Explore all
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      {/* Course cards */}
      {recommendedCourses.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {recommendedCourses.map((course) => (
            <Link
              to={`/courses/${course.id}`}
              key={course.id}
              className="recommended-course group overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.025] transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/[0.045] hover:shadow-xl hover:shadow-violet-500/[0.06]"
            >
              {/* Image */}
              <div className="recommended-course-image relative h-42 overflow-hidden bg-gradient-to-br from-violet-500 to-fuchsia-500">
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-top transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${course.color || "from-violet-500 to-fuchsia-500"} flex items-center justify-center`}>
                    <span className="text-5xl font-bold text-white/30">
                      {course.title?.charAt(0)?.toUpperCase() || "C"}
                    </span>
                  </div>
                )}

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/10" />

                {/* Category */}
                <span className="absolute left-3 top-3 rounded-md border border-white/15 bg-black/30 px-2.5 py-1 text-[9px] font-medium text-white backdrop-blur-md">
                  {course.category}
                </span>

                {/* Rating */}
                <span className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-black/40 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-md">
                  <Star size={11} className="fill-amber-300 text-amber-300" />
                  {course.rating ?? "New"}
                </span>

                {/* Hover play icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <div className="grid h-11 w-11 scale-75 place-items-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-100">
                    <PlayCircle size={23} />
                  </div>
                </div>

                {/* Course title on image */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <p className="line-clamp-1 text-sm font-semibold text-white drop-shadow-lg">
                    {course.title}
                  </p>

                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-white/80 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </div>
              </div>

              {/* Course information */}
              <div className="p-3">
                <p className="line-clamp-1 text-xs text-slate-400">
                  {course.instructor || "Expert Instructor"}
                </p>

                <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-3">
                  <span className="text-[10px] text-slate-500">
                    {course.duration || "Self-paced"}
                  </span>

                  <span className="text-[10px] font-medium text-violet-300 transition-colors group-hover:text-violet-200">
                    View course
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-white/10 py-10 text-center">
          <p className="text-sm text-slate-400">
            No recommendations available yet.
          </p>
          <Link
            to="/courses"
            className="mt-2 inline-block text-xs text-violet-300 hover:text-violet-200"
          >
            Explore courses
          </Link>
        </div>
      )}
    </section>
  );
}
