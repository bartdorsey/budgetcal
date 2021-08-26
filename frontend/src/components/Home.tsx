import React from 'react';
import useUser from '../hooks/useUser';

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