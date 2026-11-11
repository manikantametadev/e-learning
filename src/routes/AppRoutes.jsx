import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import StudentDashboard from "../pages/dashboard/StudentDashboard";
import CourseCatalogue from "../pages/courses/CourseCatalogue";
import CourseDetails from "../pages/courses/CourseDetails";
import MyCourses from "../pages/courses/MyCourses";
import LessonViewer from "../pages/lessons/LessonViewer";
import QuizPage from "../pages/quiz/QuizPage";
import QuizResults from "../pages/quiz/QuizResults";
import StudentProfile from "../pages/profile/StudentProfile";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CourseManagement from "../pages/admin/CourseManagement";
import NotFound from "../pages/NotFound";
import GenericPage from "../pages/GenericPage";
import { quizzes } from "../data/quizzes";
import QuizCard from "../components/quiz/QuizCard";
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/courses" element={<CourseCatalogue />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/learning" element={<LessonViewer />} />
        <Route path="/learning/:id" element={<LessonViewer />} />
        <Route
          path="/quizzes"
          element={
            <div>
              <div className="mb-7">
                <h1 className="text-3xl font-semibold">
                  Quizzes & assessments
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  Check your understanding and track your knowledge.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {quizzes.map((q) => (
                  <QuizCard key={q.id} quiz={q} />
                ))}
              </div>
            </div>
          }
        />
        <Route path="/quizzes/:id" element={<QuizPage />} />
        <Route path="/quiz-results" element={<QuizResults />} />
        <Route
          path="/certificates"
          element={<GenericPage path="/certificates" />}
        />
        <Route path="/progress" element={<GenericPage path="/progress" />} />
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/courses" element={<CourseManagement />} />
        <Route path="/admin/courses/add" element={<CourseManagement />} />
        <Route path="/admin/courses/:id/edit" element={<CourseManagement />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
