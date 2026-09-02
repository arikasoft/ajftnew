"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  ArrowRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Leaf,
  Loader2,
  LogOut,
  Menu,
  Sprout,
  TreePine,
  User,
  Wallet,
  X,
} from "lucide-react";

type Plantation = {
  _id: string;
  treeName: string;
  location: string;
  plantedDate: string;
  status: "pending" | "approved" | "rejected";
  rewardAmount?: number;
};

type DashboardData = {
  participant?: {
    participantId: string;
    fullName: string;
    email?: string;
  };

  statistics?: {
    totalTrees: number;
    pendingTrees: number;
    approvedTrees: number;
    rejectedTrees: number;
    walletBalance: number;
    totalRewards: number;
  };

  recentPlantations?: Plantation[];
};

export default function EnvironmentDashboardPage() {
  const [loading, setLoading] =
    useState(true);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [data, setData] =
    useState<DashboardData>({
      participant: {
        participantId: "",
        fullName: "Participant",
      },

      statistics: {
        totalTrees: 0,
        pendingTrees: 0,
        approvedTrees: 0,
        rejectedTrees: 0,
        walletBalance: 0,
        totalRewards: 0,
      },

      recentPlantations: [],
    });

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const response =
        await fetch(
          "/api/environment/dashboard",
          {
            method: "GET",
            cache: "no-store",
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to load dashboard."
        );
      }

      if (result.success) {
        setData(result.data);
      }
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  }

  const statistics =
    data.statistics || {
      totalTrees: 0,
      pendingTrees: 0,
      approvedTrees: 0,
      rejectedTrees: 0,
      walletBalance: 0,
      totalRewards: 0,
    };

  const plantations =
    data.recentPlantations || [];

  return (
    <main className="min-h-screen bg-slate-50">

      {/* TOP NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* LOGO */}
          <Link
            href="/programs/environment"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-green-800 text-white shadow-lg">
              <TreePine className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm font-black text-slate-900">
                AJFT Environment
              </p>

              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600">
                Participant Portal
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-2 lg:flex">
            <Link
              href="/programs/environment/dashboard"
              className="rounded-xl bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700"
            >
              Dashboard
            </Link>

            <Link
              href="/programs/environment/plant-tree"
              className="rounded-xl px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
            >
              Plant Tree
            </Link>

            <Link
              href="/programs/environment/my-plantations"
              className="rounded-xl px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
            >
              My Trees
            </Link>

            <Link
              href="/programs/environment/wallet"
              className="rounded-xl px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
            >
              Wallet
            </Link>
          </nav>

          {/* RIGHT */}
          <div className="hidden items-center gap-3 sm:flex">

            <button
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-500" />
            </button>

            <div className="hidden items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 xl:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100">
                <User className="h-4 w-4 text-emerald-700" />
              </div>

              <div className="max-w-[150px]">
                <p className="truncate text-xs font-black text-slate-800">
                  {data.participant?.fullName ||
                    "Participant"}
                </p>

                <p className="truncate text-[10px] font-semibold text-slate-500">
                  {data.participant?.participantId ||
                    "Environment Member"}
                </p>
              </div>
            </div>

            <Link
              href="/programs/environment"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-red-50 hover:text-red-600"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </Link>
          </div>

          {/* MOBILE MENU */}
          <button
            onClick={() =>
              setMobileMenuOpen(
                !mobileMenuOpen
              )
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 lg:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* MOBILE NAV */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white p-4 lg:hidden">
            <div className="grid gap-2">

              <Link
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                href="/programs/environment/dashboard"
                className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700"
              >
                Dashboard
              </Link>

              <Link
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                href="/programs/environment/plant-tree"
                className="rounded-xl px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
              >
                Plant New Tree
              </Link>

              <Link
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                href="/programs/environment/my-plantations"
                className="rounded-xl px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
              >
                My Plantations
              </Link>

              <Link
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                href="/programs/environment/wallet"
                className="rounded-xl px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
              >
                Wallet & Rewards
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* PAGE */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ERROR */}
        {error && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-700">
              {error}
            </p>

            <button
              onClick={loadDashboard}
              className="rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white"
            >
              Retry
            </button>
          </div>
        )}

        {/* HERO */}
        <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-950 via-green-900 to-teal-950 px-6 py-8 text-white sm:px-10 sm:py-12">

          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-lime-400/10 blur-3xl" />

          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold text-emerald-100 backdrop-blur">
                <Leaf className="h-4 w-4 text-lime-300" />

                AJFT GREEN ACTION PROGRAMME
              </div>

              <h1 className="mt-6 text-3xl font-black sm:text-5xl">
                Welcome back,
                <span className="block text-lime-300">
                  {data.participant?.fullName ||
                    "Participant"}.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-emerald-100/80 sm:text-base">
                Track your environmental contribution,
                submit tree plantation records and monitor
                verification and reward eligibility.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">

                <Link
                  href="/programs/environment/plant-tree"
                  className="inline-flex items-center gap-2 rounded-xl bg-lime-300 px-5 py-3 text-sm font-black text-emerald-950 transition hover:-translate-y-0.5"
                >
                  <Sprout className="h-5 w-5" />

                  Plant a Tree

                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/programs/environment/my-plantations"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
                >
                  View My Trees
                </Link>
              </div>
            </div>

            <div className="min-w-[240px] rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="rounded-2xl bg-lime-300/15 p-3">
                  <TreePine className="h-7 w-7 text-lime-300" />
                </div>

                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-200">
                  Active
                </span>
              </div>

              <p className="mt-6 text-sm text-emerald-100/70">
                Your Contribution
              </p>

              <p className="mt-1 text-4xl font-black text-white">
                {statistics.totalTrees}
              </p>

              <p className="mt-1 text-xs font-semibold text-emerald-200">
                Trees submitted
              </p>
            </div>
          </div>
        </section>

        {/* LOADING */}
        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
              </div>

              <p className="mt-4 text-sm font-bold text-slate-600">
                Loading your environment dashboard...
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* STATS */}
            <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

              <StatCard
                title="Total Trees"
                value={statistics.totalTrees}
                description="Plantation records"
                icon={<TreePine className="h-6 w-6" />}
              />

              <StatCard
                title="Pending Review"
                value={statistics.pendingTrees}
                description="Awaiting verification"
                icon={<Clock3 className="h-6 w-6" />}
              />

              <StatCard
                title="Approved Trees"
                value={statistics.approvedTrees}
                description="Verified contribution"
                icon={<CheckCircle2 className="h-6 w-6" />}
              />

              <StatCard
                title="Wallet Balance"
                value={`₹${statistics.walletBalance.toLocaleString(
                  "en-IN"
                )}`}
                description="Available rewards"
                icon={
                  <CircleDollarSign className="h-6 w-6" />
                }
              />
            </section>

            {/* MAIN GRID */}
            <section className="mt-8 grid gap-8 xl:grid-cols-[1.5fr_0.8fr]">

              {/* RECENT TREES */}
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">
                      Activity
                    </p>

                    <h2 className="mt-2 text-2xl font-black text-slate-900">
                      Recent Plantations
                    </h2>
                  </div>

                  <Link
                    href="/programs/environment/my-plantations"
                    className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800"
                  >
                    View All

                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>

                {plantations.length === 0 ? (
                  <div className="mt-8 flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">

                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100">
                      <Sprout className="h-8 w-8 text-emerald-700" />
                    </div>

                    <h3 className="mt-5 text-lg font-black text-slate-900">
                      Start Your Green Journey
                    </h3>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                      You have not submitted any tree
                      plantation records yet.
                    </p>

                    <Link
                      href="/programs/environment/plant-tree"
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-800"
                    >
                      Plant Your First Tree

                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="mt-7 divide-y divide-slate-100">

                    {plantations.map(
                      (plantation) => (
                        <div
                          key={plantation._id}
                          className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="flex items-center gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                              <TreePine className="h-6 w-6 text-emerald-700" />
                            </div>

                            <div>
                              <h3 className="font-black text-slate-900">
                                {plantation.treeName}
                              </h3>

                              <p className="mt-1 text-xs text-slate-500">
                                {plantation.location}
                              </p>

                              <div className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                                <CalendarDays className="h-3.5 w-3.5" />

                                {plantation.plantedDate}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">

                            {plantation.rewardAmount &&
                              plantation.rewardAmount >
                                0 && (
                                <div className="text-right">
                                  <p className="text-xs text-slate-400">
                                    Reward
                                  </p>

                                  <p className="font-black text-emerald-700">
                                    ₹
                                    {
                                      plantation.rewardAmount
                                    }
                                  </p>
                                </div>
                              )}

                            <StatusBadge
                              status={
                                plantation.status
                              }
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* RIGHT SIDE */}
              <div className="space-y-6">

                {/* WALLET */}
                <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 to-teal-800 p-7 text-white shadow-lg">

                  <div className="flex items-center justify-between">
                    <div className="rounded-2xl bg-white/10 p-3">
                      <Wallet className="h-7 w-7 text-lime-300" />
                    </div>

                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">
                      Rewards
                    </span>
                  </div>

                  <p className="mt-7 text-sm text-emerald-100/70">
                    Available Balance
                  </p>

                  <p className="mt-2 text-4xl font-black">
                    ₹
                    {statistics.walletBalance.toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  <div className="mt-6 border-t border-white/10 pt-5">

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-emerald-100/70">
                        Total Earned
                      </span>

                      <span className="font-black">
                        ₹
                        {statistics.totalRewards.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/programs/environment/wallet"
                    className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-black text-emerald-800 transition hover:bg-emerald-50"
                  >
                    Open Wallet

                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* QUICK ACTIONS */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6">

                  <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">
                    Quick Actions
                  </p>

                  <h2 className="mt-2 text-xl font-black text-slate-900">
                    Manage Your Activity
                  </h2>

                  <div className="mt-5 space-y-3">

                    <QuickAction
                      href="/programs/environment/plant-tree"
                      icon={
                        <Sprout className="h-5 w-5" />
                      }
                      title="Plant New Tree"
                      description="Submit plantation details"
                    />

                    <QuickAction
                      href="/programs/environment/my-plantations"
                      icon={
                        <TreePine className="h-5 w-5" />
                      }
                      title="My Plantations"
                      description="View all submitted records"
                    />

                    <QuickAction
                      href="/programs/environment/wallet"
                      icon={
                        <Wallet className="h-5 w-5" />
                      }
                      title="Rewards & Wallet"
                      description="Check eligible rewards"
                    />
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}


/* STAT CARD */

function StatCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-bold text-slate-500">
            {title}
          </p>

          <p className="mt-3 text-3xl font-black text-slate-900">
            {value}
          </p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}


/* STATUS BADGE */

function StatusBadge({
  status,
}: {
  status:
    | "pending"
    | "approved"
    | "rejected";
}) {
  const classes = {
    pending:
      "bg-amber-50 text-amber-700 border-amber-200",

    approved:
      "bg-emerald-50 text-emerald-700 border-emerald-200",

    rejected:
      "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1.5 text-xs font-black capitalize ${classes[status]}`}
    >
      {status}
    </span>
  );
}


/* QUICK ACTION */

function QuickAction({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:border-emerald-200 hover:bg-emerald-50"
    >
      <div className="rounded-xl bg-slate-100 p-3 text-slate-600 transition group-hover:bg-emerald-100 group-hover:text-emerald-700">
        {icon}
      </div>

      <div className="flex-1">
        <p className="text-sm font-black text-slate-800">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>
      </div>

      <ChevronRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-emerald-700" />
    </Link>
  );
}