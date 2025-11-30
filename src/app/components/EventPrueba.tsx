import { useApi } from '@/lib/useApi';
/*
interface Evento {
  id: number;
  nombre: string;
  fecha: string;
  ubicacion: string;
}*/

export function EventosListServer() {
  const { data: eventos, loading, error } = useApi<string>('/health');

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Lista de Eventos</h2>
      <p>{eventos} </p>
      
    </div>
  );
}