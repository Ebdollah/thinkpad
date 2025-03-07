'use client'

import React, { useEffect } from 'react';
import {auth} from "@/app/firebaseConfig";

const DashboardPage: React.FC = () => {
    const [user, setUser] = React.useState<any>(null);

    const userInfo = () =>{
        const user = auth.currentUser;
        setUser(user);
        if(user){
            console.log(user);
        }
    }
    useEffect(() => {
        userInfo();
    }, []);


    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                            {/* Your content goes here */}
                            <p className="text-center text-gray-500">Welcome to your dashboard {user.displayName}!</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;