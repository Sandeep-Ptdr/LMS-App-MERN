import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBookOpen,
  FaChalkboardTeacher,
  FaCreditCard,
  FaPlayCircle,
  FaUserGraduate,
} from "react-icons/fa";
import primaryLogo from "../assets/primary.svg";

const features = [
  {
    title: "Course Management",
    description:
      "Create, update, publish, and organize courses with lesson content in one place.",
    icon: FaBookOpen,
  },
  {
    title: "Interactive Learning",
    description:
      "Students can follow lessons, track progress, and stay engaged through a structured flow.",
    icon: FaUserGraduate,
  },
  {
    title: "Quiz System",
    description:
      "Assess understanding with quizzes attached directly to lessons for quick feedback.",
    icon: FaPlayCircle,
  },
  {
    title: "Secure Payments",
    description:
      "Enable paid enrollment with a checkout flow that supports course purchases smoothly.",
    icon: FaCreditCard,
  },
];

const roleCards = [
  {
    title: "For Students",
    description:
      "Browse published courses, enroll, learn from lessons, and monitor your progress over time.",
    accent: "border-[#2196F3]",
  },
  {
    title: "For Instructors",
    description:
      "Manage your teaching workflow with tools for courses, lessons, quizzes, dashboards, and earnings.",
    accent: "border-gray-800",
  },
];

const stats = [
  { label: "Role-based access", value: "2" },
  { label: "Core learning modules", value: "6+" },
  { label: "Learning flow", value: "End-to-end" },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img src={primaryLogo} alt="LMS logo" className="h-10 w-10" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">LMS Platform</h1>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
                Learn. Teach. Grow.
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-full border border-[#2196F3] px-4 py-2 text-sm font-semibold text-[#2196F3] transition hover:bg-blue-50"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-[#2196F3] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1976D2]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(33,150,243,0.18),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(31,41,55,0.15),_transparent_35%)]" />
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
            <div className="relative">
              <span className="inline-flex rounded-full border border-[#2196F3]/20 bg-blue-50 px-4 py-2 text-sm font-semibold text-[#2196F3]">
                Modern LMS experience for students and instructors
              </span>
              <h2 className="mt-6 max-w-3xl text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                Welcome to a learning platform built to manage courses,
                teaching, and progress in one place.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                This project brings together course publishing, lesson delivery,
                quizzes, payments, progress tracking, and dashboard workflows in
                a single LMS application.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-full bg-[#2196F3] px-6 py-3 font-semibold text-white transition hover:bg-[#1976D2]"
                >
                  Create an Account
                  <FaArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:border-[#2196F3] hover:text-[#2196F3]"
                >
                  Sign In
                </Link>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm font-medium text-gray-500">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] bg-gray-800 p-6 text-white shadow-2xl">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2196F3]">
                      <FaChalkboardTeacher className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-100">
                        Teaching Workspace
                      </p>
                      <h3 className="text-2xl font-semibold">
                        Built for clear learning journeys
                      </h3>
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-sm text-blue-100">Course Pipeline</p>
                      <p className="mt-2 text-lg font-semibold">
                        Draft, publish, and manage course delivery with lesson
                        support.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-sm text-blue-100">Student Journey</p>
                      <p className="mt-2 text-lg font-semibold">
                        Enroll in courses, complete lessons, attempt quizzes,
                        and watch progress move forward.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-[#2196F3] p-4">
                      <p className="text-sm text-blue-100">
                        Platform Direction
                      </p>
                      <p className="mt-2 text-lg font-semibold">
                        Designed as a full learning management system with room
                        to grow into live classes and richer experiences.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2196F3]">
              Core Features
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              Everything needed for an LMS project foundation
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              The application already covers the main workflows expected in a
              learning system, from onboarding users to handling course access
              and academic engagement.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#2196F3]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2">
              {roleCards.map((card) => (
                <div
                  key={card.title}
                  className={`rounded-3xl border-l-4 ${card.accent} border border-gray-200 bg-white p-8 shadow-sm`}
                >
                  <h3 className="text-2xl font-bold text-gray-900">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-gray-600">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-[#2196F3] px-6 py-10 text-white shadow-xl sm:px-10">
            <h2 className="text-3xl font-bold">
              Start exploring the LMS project
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-blue-50">
              New visitors can learn what the platform offers right away, and
              returning users can jump back into their student or instructor
              workflow in a click.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="rounded-full bg-white px-6 py-3 font-semibold text-[#2196F3] transition hover:bg-blue-50"
              >
                Join Now
              </Link>
              <Link
                to="/login"
                className="rounded-full border border-white/60 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Login to Dashboard
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
