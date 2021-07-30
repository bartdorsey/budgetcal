import React from 'react';
import { useSelector } from 'react-redux';
import useUser from '../hooks/useUser';
import type { User } from '../api/authApi';

interface HomeProps {
}

function Home({}: HomeProps) {
    const user = useUser();

    if (!user) {
        return null;
    }
    return <h1>Welcome, {user?.username}</h1>;
}

export default Home;