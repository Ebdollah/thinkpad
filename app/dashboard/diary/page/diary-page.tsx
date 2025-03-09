'use client'

import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Dialog } from '@headlessui/react';
import { useRouter } from 'next/navigation';

const DiaryPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    return (
        <div className="relative p-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-amber-400">Diary Page</h1>
                {/* Write Button - Top Right */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-lg shadow-lg transition-all duration-200 flex items-center space-x-2"
                >
                    <FaEdit className="text-xl" />
                    <span className="hidden sm:inline">Write</span>
                </button>
            </div>
            <p className="text-gray-300 mt-2">Welcome to your diary. Here you can write and manage your daily entries.</p>

            {/* Modal */}
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
                <Dialog.Panel className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full text-center border border-amber-700">
                    <Dialog.Title className="text-3xl font-semibold text-amber-400">Start Writing</Dialog.Title>
                    <p className="text-gray-300 mt-3">Would you like to create new notes or continue where you left off?</p>

                    <div className="mt-6 space-y-4">
                        <button onClick={()=>router.push('/dashboard/diary/create')} className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold shadow-md transition-all">Create New Notes</button>
                        <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold shadow-md transition-all">Continue Where You Left Off</button>
                    </div>

                    <button onClick={() => setIsModalOpen(false)} className="mt-6 text-gray-400 hover:text-gray-200 text-sm underline">Cancel</button>
                </Dialog.Panel>
            </Dialog>
        </div>
    );
};

export default DiaryPage;
