import { useCallback, useEffect, useState } from 'react'

export function useApi<T>(loader: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const load = useCallback(() => {
    setLoading(true); setError(null)
    loader().then(setData).catch(() => setError('Unable to load this section right now.')).finally(() => setLoading(false))
  }, [loader])
  useEffect(() => { load() }, [load])
  return { data, loading, error, retry: load }
}
