import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../slices/authSlice';

export default function useUser() {
    const user = useSelector(selectCurrentUser);
    return useMemo(() => user, [user])
}