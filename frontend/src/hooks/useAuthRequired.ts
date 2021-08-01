import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useAsyncEffect from '../hooks/useAsyncEffect';
import { setUser } from '../slices/authSlice';
import { useProtectedMutation } from '../api/authApi';
import { useHistory } from 'react-router';

export default function useAuthRequired() {
    const [attemptAccess, mutationResult] = useProtectedMutation()
    const { isError } = mutationResult;
    const dispatch = useDispatch();
    const history = useHistory();

    useAsyncEffect(async () => {
        try {
            const user = await attemptAccess().unwrap();
            dispatch(setUser(user));
        }
        catch (e) {
            if (e.status !== 403) {
                console.error(e);
            }
        }
    }, []);

    useEffect(() => {
      if (isError) {
        history.push('/login');
      }
    }, [isError]);

    return {
        ...mutationResult,
        authenticated: !mutationResult.isError
    };
}