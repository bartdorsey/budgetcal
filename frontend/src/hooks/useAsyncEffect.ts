import { useEffect } from 'react';

export default function useAsyncEffect(callback: () => any, dependencies: any[]) {
    useEffect(() => {
        (async() => {
            return await callback();
        })();
    }, dependencies);
}