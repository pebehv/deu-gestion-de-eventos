// useApi.ts
"use client";

import { useState, useEffect } from 'react';

export function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // CORRECCIÓN 1: Usa el nombre correcto de variable
        // Si es Next.js: NEXT_PUBLIC_API_URL
        // Si es Create React App: REACT_APP_API_URL
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 
                       process.env.REACT_APP_API_URL || 
                       'http://localhost:8081'; // Valor por defecto
        
        // CORRECCIÓN 2: Valida que apiUrl no sea undefined
        if (!apiUrl) {
          throw new Error('API URL no configurada');
        }

        console.log('Fetching from:', `${apiUrl}${url}`); // Para debug
        
        const response = await fetch(`${apiUrl}${url}`);
        if (!response.ok) throw new Error('Error en la solicitud');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}