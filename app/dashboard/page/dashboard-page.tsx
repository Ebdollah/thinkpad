import Link from "next/link";

const DashboardPage = () => {
  return (
    <div className="text-center p-10">
      <h2 className="text-4xl font-bold text-amber-400">Welcome to ThinkPad Dashboard</h2>
      <p className="text-gray-300 mt-4 text-lg">Manage your diary, snippets, and archives.</p>

      {/* Quick Links Section */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link href="/dashboard/diary" className="p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition">
          <h3 className="text-2xl font-semibold text-amber-400">My Diary</h3>
          <p className="text-gray-400 mt-2">View and manage your daily notes.</p>
        </Link>
        <Link href="/dashboard/saved-snippets" className="p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition">
          <h3 className="text-2xl font-semibold text-amber-400">Saved Snippets</h3>
          <p className="text-gray-400 mt-2">Quickly access your saved texts.</p>
        </Link>
        <Link href="/dashboard/archives" className="p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition">
          <h3 className="text-2xl font-semibold text-amber-400">Archives</h3>
          <p className="text-gray-400 mt-2">View past entries and important notes.</p>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
