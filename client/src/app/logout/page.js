"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Logout = () => {
    const router = useRouter();

    useEffect(() => {
        localStorage.removeItem('token');

        router.push('/login');
    }, []);

    return null;
};

export default Logout;
