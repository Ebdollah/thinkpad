"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const tabs = [
  { name: "My Diary", href: "/dashboard/diary" },
  { name: "Saved Snippets", href: "/dashboard/saved-snippets" },
  { name: "Archives", href: "/dashboard/archives" },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 p-6 shadow-md text-center">
        <h1 className="text-3xl font-bold text-amber-400">ThinkPad</h1>
        <p className="text-gray-300">Your personal space to organize thoughts.</p>
      </header>

      {/* Tabs - Always Visible */}
      <div className="flex justify-center space-x-6 bg-gray-800 p-4 border-b border-gray-700 sticky top-0 z-10">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-6 py-2 rounded-md transition-all duration-200 text-lg font-semibold ${
              pathname === tab.href ? "bg-amber-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </div>

      {/* This is where nested content (diary, archives, etc.) will be shown */}
      <main className="p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
