"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const tabs = [
  { name: "My Diary", href: "/dashboard/diary" },
  { name: "Saved Snippets", href: "/dashboard/saved-snippets" },
  { name: "Archives", href: "/dashboard/archives" },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 p-6 shadow-md text-center flex justify-between items-center px-6 sm:px-10">
        <h1 className="text-3xl font-bold text-amber-400">ThinkPad</h1>
        <button className="sm:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
        </button>
      </header>

      {/* Tabs - Responsive */}
      <nav
        className={`${
          menuOpen ? "block" : "hidden sm:flex"
        } flex flex-col sm:flex-row justify-center sm:space-x-6 bg-gray-800 p-4 border-b border-gray-700 sticky top-0 z-10`}
      >
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-6 py-2 text-center rounded-md transition-all duration-200 text-lg font-semibold ${
              pathname === tab.href ? "bg-amber-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </nav>

      {/* This is where nested content (diary, archives, etc.) will be shown */}
      <main className="p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
