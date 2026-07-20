    import { create } from 'zustand';
    import type { FetchState } from '../types';

    function createFetchStore<T>() {
    return create<FetchState<T>>((set) => ({
        data: null,
        loading: false,
        error: null,
        setData: (data) => set({ data }),
        setLoading: (loading) => set({ loading }),
        setError: (error) => set({ error }),
    }));
    }

    export default createFetchStore;
