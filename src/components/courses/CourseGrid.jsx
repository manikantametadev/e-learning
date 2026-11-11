import CourseCard from "./CourseCard";
export default function CourseGrid({ courses, showProgress }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {courses.map((c) => (
        <CourseCard key={c.id} course={c} showProgress={showProgress} />
      ))}
    </div>
  );
}
