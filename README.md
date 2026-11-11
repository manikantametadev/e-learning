# E — Learning Management Platform

A responsive React + Vite + Tailwind CSS learning management dashboard inspired by the supplied visual reference. Includes student dashboard, course discovery and details, enrolled courses, lesson viewer, quizzes, profile, and admin course management.

## Requirements
- Node.js 20+ recommended
- npm

## Run locally
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run preview
```

## Stack
- React + Vite
- Tailwind CSS v4 via `@tailwindcss/vite`
- React Router
- Lucide React icons
- Recharts for admin analytics
- Framer Motion dependency included for future motion enhancements

## Notes
- The project uses local demo data in `src/data` and localStorage for enrollment/progress examples.
- No backend or authentication service is connected.
- Replace demo avatars and course artwork with your own assets in `public/images`.
