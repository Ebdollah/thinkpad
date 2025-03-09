'use client'

import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import { auth } from "@/app/firebaseConfig";

const CreatePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [title, setTitle] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [diaryContent, setDiaryContent] = useState('');
    const [entryId, setEntryId] = useState<string | null>(null);
    const router = useRouter();
    const user = auth.currentUser;

    useEffect(() => {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        setCurrentDateTime(new Intl.DateTimeFormat('en-US', options).format(now));
    }, []);

    const handleCreateEntry = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            console.error("No authenticated user");
            return;
        }
        try {
            const docRef = await addDoc(collection(db, "diary"), {
                title,
                currentDateTime,
                diaryContent,
                userId: user.uid,
            });
            setEntryId(docRef.id);
            setIsModalOpen(false);
        } catch (err) {
            console.error("Error adding document:", err);
        }
    };

    const handleSaveEntry = async () => {
        if (!entryId) {
            console.error("No entry to update");
            return;
        }
        try {
            const entryRef = doc(db, "diary", entryId);
            await updateDoc(entryRef, { diaryContent });
            console.log("Entry updated successfully");
        } catch (err) {
            console.error("Error updating document:", err);
        }
    };

    return (
        <div className="relative p-6">
            <h1 className="text-4xl font-bold text-amber-600 mb-6">{title || "New Diary Entry"}</h1>
            
            {/* Notepad-like input */}
            <textarea 
                className="w-full h-64 p-4 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-amber-500 resize-none"
                placeholder="Start writing your thoughts here..."
                value={diaryContent}
                onChange={(e) => setDiaryContent(e.target.value)}
            />
            
            <button 
                onClick={handleSaveEntry}
                className="mt-4 bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition-all"
            >
                Save Entry
            </button>
            
            {/* Modal for entering title */}
            <Dialog open={isModalOpen} onClose={() => router.push('/dashboard/diary')} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
                <Dialog.Panel className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full text-center border border-amber-700">
                    <Dialog.Title className="text-3xl font-semibold text-amber-400">New Diary Entry</Dialog.Title>
                    <p className="text-gray-300 mt-3">Enter a title for your diary entry.</p>
                    
                    <form onSubmit={handleCreateEntry} className="mt-6 space-y-4">
                        <input 
                            type="text" 
                            placeholder="Enter title..." 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-amber-500"
                            required
                        />
                        
                        <input 
                            type="text" 
                            value={currentDateTime} 
                            disabled 
                            className="w-full p-3 rounded-lg bg-gray-700 text-gray-400 border border-gray-600"
                        />
                        
                        <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold shadow-md transition-all">
                            Create Entry
                        </button>
                    </form>
                </Dialog.Panel>
            </Dialog>
        </div>
    );
};

export default CreatePage;
