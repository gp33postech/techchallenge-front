import { useEffect, useState } from 'react';

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    if (!url || !options || !options.method) return;

    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(url, {
          method: options.method || 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
          body: options.body ? JSON.stringify(options.body) : null,
          signal: controller.signal,
        });

        setResponse(res);

        if (!res.ok) {
          throw new Error(`Erro ${res.status}: ${res.statusText}`);
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, JSON.stringify(options)]); 

  return { data, error, loading, response };
}
