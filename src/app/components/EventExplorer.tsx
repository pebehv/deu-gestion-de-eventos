import { useState } from "react";
import { Search, Calendar as CalendarIcon, Filter } from "lucide-react";
import { EventCard } from "./EventCard";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { EventosListServer } from "./EventPrueba";

interface Evento {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: string;
  tipo?: string;
  registro: "S" | "N";
  imagen?: string;
  espacio: string;
  inform_final?: string;
}

interface EventExplorerProps {
  eventos: Evento[];
  onEventSelect: (id: number) => void;
}

export function EventExplorer({ eventos, onEventSelect }: EventExplorerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredEvents = eventos.filter((evento) => {
    const matchesSearch = evento.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !selectedDate || 
      new Date(evento.fecha).toDateString() === selectedDate.toDateString();
    const matchesType = selectedType === "all" || evento.tipo === selectedType;
    
    return matchesSearch && matchesDate && matchesType;
  });

  const tipos = ["all", ...Array.from(new Set(eventos.map(e => e.tipo).filter(Boolean)))];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-foreground text-white py-16">
        <div className="container mx-auto px-4">
          <EventosListServer />
          <h1 className="mb-4 text-white">Explorador de Eventos</h1>
          <p className="text-white/80 mb-8">Encuentra y regístrate en los mejores eventos</p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-2 flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Buscar eventos por nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-0 focus-visible:ring-0 bg-transparent"
                />
              </div>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? selectedDate.toLocaleDateString('es-ES') : "Fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  {tipos.slice(1).map((tipo) => (
                    <SelectItem key={tipo} value={tipo || ""}>
                      {tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button className="bg-primary hover:bg-primary/90">
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2>Eventos Disponibles</h2>
          <span className="text-muted-foreground">
            {filteredEvents.length} {filteredEvents.length === 1 ? 'evento encontrado' : 'eventos encontrados'}
          </span>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No se encontraron eventos que coincidan con tu búsqueda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((evento) => (
              <EventCard
                key={evento.id}
                id={evento.id}
                nombre={evento.nombre}
                fecha={evento.fecha}
                tipo={evento.tipo}
                registro={evento.registro}
                imagen={evento.imagen}
                onClick={() => onEventSelect(evento.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
