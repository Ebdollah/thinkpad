'use client'
import React, { useEffect, useState } from 'react';
import { auth } from "@/app/firebaseConfig";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const tabs = [
  { name: "My Diary", href: "/dashboard/diary" },
  { name: "Saved Snippets", href: "/dashboard/saved-snippets" },
  { name: "Archives", href: "/dashboard/archives" },
];


const DashboardPage = () => {
    return (
      <div className="text-center p-10">
        <p className="text-gray-300 mt-4">Select a section from the tabs above to start.</p>
      </div>
    );
  };
  
  export default DashboardPage;
  

