import { use, useEffect } from 'react';
import api from '../services/api';
import type { FetchState } from '../types';
import { useStore } from 'zustand';

function useFetch<T>(endpoint: string, useStore: () => FetchState<T>) {
  const { setData, setLoading, setError } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get<T>(endpoint);
        setData(res.data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Xəta baş verdi';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  return useStore();
}

export default useFetch;