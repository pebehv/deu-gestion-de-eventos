"use client"; // <<< ¡Añade esta línea!
import { useState } from "react";
import { EventExplorer } from "./components/EventExplorer";
import { EventDetail } from "./components/EventDetail";
import { CreateEventForm } from "./components/CreateEventForm";
import { Login } from "./components/Login";
import { Button } from "./components/ui/button";
import { Plus, LogOut } from "lucide-react";
import { Toaster } from "./components/ui/sonner";
import "./globals.css";

type View = "explorer" | "detail" | "create";

// Mock data
const mockEventos = [
  {
    id: 1,
    nombre: "Conferencia Internacional de Tecnología 2025",
    descripcion: "Una conferencia que reúne a los mejores expertos en tecnología para discutir las tendencias emergentes, inteligencia artificial, blockchain, y el futuro de la innovación digital.",
    fecha: "2025-03-15",
    tipo: "Conferencia",
    registro: "S" as const,
    imagen: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwZXZlbnR8ZW58MXx8fHwxNzYyMzQ5MjIxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    espacio: "Centro de Convenciones Internacional",
    inform_final: "Informe disponible post-evento",
    recursos: [
      { nombre: "Proyector 4K", disponible: true, cantidad: 3 },
      { nombre: "Sistema de Audio Premium", disponible: true, cantidad: 2 },
      { nombre: "Pantallas LED", disponible: false, cantidad: 5 },
      { nombre: "Micrófonos inalámbricos", disponible: true, cantidad: 10 },
    ],
    patrocinadores: [
      { nombre: "Tech Global Corp", monto: 50000 },
      { nombre: "Innovation Partners", monto: 35000 },
      { nombre: "Digital Solutions Inc", monto: 25000 },
    ],
    ponentes: [
      { id_usuario: 1, nombre: "María", apellido: "González" },
      { id_usuario: 2, nombre: "Carlos", apellido: "Rodríguez" },
      { id_usuario: 3, nombre: "Ana", apellido: "Martínez" },
    ],
  },
  {
    id: 2,
    nombre: "Taller de Desarrollo Web Moderno",
    descripcion: "Aprende las últimas tecnologías en desarrollo web incluyendo React, Next.js, TypeScript y más. Un taller práctico con ejercicios hands-on.",
    fecha: "2025-04-20",
    tipo: "Taller",
    registro: "S" as const,
    imagen: "https://images.unsplash.com/photo-1762158007836-25d13ab34c1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc2hvcCUyMHRyYWluaW5nfGVufDF8fHx8MTc2MjM2OTM5MHww&ixlib=rb-4.1.0&q=80&w=1080",
    espacio: "Laboratorio de Innovación Digital",
    recursos: [
      { nombre: "Laptops", disponible: true, cantidad: 30 },
      { nombre: "Material didáctico", disponible: true, cantidad: 30 },
    ],
    patrocinadores: [
      { nombre: "CodeAcademy Pro", monto: 15000 },
    ],
    ponentes: [
      { id_usuario: 4, nombre: "Luis", apellido: "Fernández" },
      { id_usuario: 5, nombre: "Laura", apellido: "Torres" },
    ],
  },
  {
    id: 3,
    nombre: "Seminario de Liderazgo Empresarial",
    descripcion: "Descubre las claves del liderazgo efectivo en el entorno empresarial actual. Estrategias de gestión de equipos, toma de decisiones y cultura organizacional.",
    fecha: "2025-05-10",
    tipo: "Seminario",
    registro: "N" as const,
    imagen: "https://images.unsplash.com/photo-1761250246894-ee2314939662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW1pbmFyJTIwcHJlc2VudGF0aW9ufGVufDF8fHx8MTc2MjM3NDA0OHww&ixlib=rb-4.1.0&q=80&w=1080",
    espacio: "Auditorio Principal",
    inform_final: "Certificados disponibles",
    recursos: [
      { nombre: "Material impreso", disponible: true, cantidad: 50 },
    ],
    patrocinadores: [
      { nombre: "Business Leadership Group", monto: 20000 },
    ],
    ponentes: [
      { id_usuario: 6, nombre: "Roberto", apellido: "Sánchez" },
    ],
  },
  {
    id: 4,
    nombre: "Networking Tech Professionals",
    descripcion: "Evento de networking para profesionales de tecnología. Conecta con colegas, comparte experiencias y expande tu red profesional en un ambiente relajado.",
    fecha: "2025-06-05",
    tipo: "Networking",
    registro: "S" as const,
    imagen: "https://images.unsplash.com/photo-1675716921224-e087a0cca69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JraW5nJTIwZXZlbnR8ZW58MXx8fHwxNzYyMzg4NDMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    espacio: "Terraza Lounge Corporate",
    recursos: [
      { nombre: "Catering", disponible: true, cantidad: 1 },
      { nombre: "Stands de networking", disponible: true, cantidad: 10 },
    ],
    patrocinadores: [
      { nombre: "Tech Hub", monto: 10000 },
      { nombre: "Startup Accelerator", monto: 8000 },
    ],
    ponentes: [],
  },
  {
    id: 5,
    nombre: "Cumbre de Inteligencia Artificial",
    descripcion: "Explora el futuro de la IA con expertos líderes. Machine Learning, Deep Learning, IA Generativa y aplicaciones empresariales de la inteligencia artificial.",
    fecha: "2025-07-18",
    tipo: "Conferencia",
    registro: "S" as const,
    imagen: "https://images.unsplash.com/photo-1709715357520-5e1047a2b691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmd8ZW58MXx8fHwxNzYyMzgxMTkyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    espacio: "Centro de Innovación AI",
    inform_final: "Grabaciones disponibles",
    recursos: [
      { nombre: "Estaciones de demostración", disponible: true, cantidad: 8 },
      { nombre: "Equipos de computación avanzada", disponible: true, cantidad: 15 },
    ],
    patrocinadores: [
      { nombre: "AI Research Lab", monto: 75000 },
      { nombre: "Neural Networks Inc", monto: 45000 },
    ],
    ponentes: [
      { id_usuario: 7, nombre: "Patricia", apellido: "López" },
      { id_usuario: 8, nombre: "Miguel", apellido: "Ramírez" },
      { id_usuario: 9, nombre: "Elena", apellido: "Vega" },
    ],
  },
  {
    id: 6,
    nombre: "Festival de Música Electrónica 2025",
    descripcion: "Una noche épica de música electrónica con los mejores DJs nacionales e internacionales. Efectos visuales impresionantes y una experiencia inolvidable.",
    fecha: "2025-08-22",
    tipo: "Concierto",
    registro: "S" as const,
    imagen: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwY3Jvd2R8ZW58MXx8fHwxNzYyNDQwOTAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    espacio: "Estadio Arena Music",
    recursos: [
      { nombre: "Escenario principal", disponible: true, cantidad: 1 },
      { nombre: "Sistema de iluminación", disponible: true, cantidad: 1 },
      { nombre: "Barras de servicio", disponible: true, cantidad: 5 },
    ],
    patrocinadores: [
      { nombre: "Energy Drinks Co", monto: 30000 },
      { nombre: "Music Streaming Platform", monto: 25000 },
    ],
    ponentes: [],
  },
];

const mockUsuarios = [
  { id: 1, nombre: "María", apellido: "González" },
  { id: 2, nombre: "Carlos", apellido: "Rodríguez" },
  { id: 3, nombre: "Ana", apellido: "Martínez" },
  { id: 4, nombre: "Luis", apellido: "Fernández" },
  { id: 5, nombre: "Laura", apellido: "Torres" },
  { id: 6, nombre: "Roberto", apellido: "Sánchez" },
  { id: 7, nombre: "Patricia", apellido: "López" },
  { id: 8, nombre: "Miguel", apellido: "Ramírez" },
  { id: 9, nombre: "Elena", apellido: "Vega" },
  { id: 10, nombre: "Diego", apellido: "Morales" },
];

const mockPatrocinadores = [
  { id: 1, nombre: "Tech Global Corp" },
  { id: 2, nombre: "Innovation Partners" },
  { id: 3, nombre: "Digital Solutions Inc" },
  { id: 4, nombre: "CodeAcademy Pro" },
  { id: 5, nombre: "Business Leadership Group" },
  { id: 6, nombre: "Tech Hub" },
  { id: 7, nombre: "Startup Accelerator" },
  { id: 8, nombre: "AI Research Lab" },
];

const mockProveedores = [
  { id: 1, nombre: "Catering Premium Services" },
  { id: 2, nombre: "Audio Visual Pro" },
  { id: 3, nombre: "Event Logistics Plus" },
  { id: 4, nombre: "Stage Design Masters" },
  { id: 5, nombre: "Tech Equipment Rental" },
  { id: 6, nombre: "Security Solutions Inc" },
];

export default function App() {
  const [currentView, setCurrentView] = useState<View>("explorer");
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [eventos, setEventos] = useState(mockEventos);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const selectedEvent = selectedEventId ? eventos.find((e) => e.id === selectedEventId) : null;

  const handleLogin = (email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail("");
    setCurrentView("explorer");
  };

  const handleEventSelect = (id: number) => {
    setSelectedEventId(id);
    setCurrentView("detail");
  };

  const handleCreateEvent = (data: any) => {
    const newEvent = {
      id: eventos.length + 1,
      ...data,
      imagen: mockEventos[0].imagen, // Default image
      recursos: data.recursos.map((r: any) => ({ ...r, disponible: true })),
      patrocinadores: mockPatrocinadores
        .filter((p) => data.patrocinadoresSeleccionados.includes(p.id))
        .map((p) => ({ ...p, monto: Math.floor(Math.random() * 50000) + 10000 })),
      ponentes: mockUsuarios.filter((u) => data.ponentes.includes(u.id)),
    };
    setEventos([...eventos, newEvent]);
    setCurrentView("explorer");
  };

  return (
    <>
      <Toaster position="top-right" />
      
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="relative">
          {/* Header with Logout Button */}
          <div className="fixed top-0 left-0 right-0 bg-white border-b border-border z-40 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-foreground">Portal de Eventos</h2>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{userEmail}</span>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          </div>

          {/* Add padding to account for fixed header */}
          <div className="pt-20">
            {/* Floating Action Button for Create Event */}
            {currentView === "explorer" && (
              <Button
                onClick={() => setCurrentView("create")}
                className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg bg-secondary hover:bg-secondary/90 z-50"
                size="icon"
              >
                <Plus className="h-6 w-6" />
              </Button>
            )}

            {/* Views */}
            {currentView === "explorer" && (
              <EventExplorer eventos={eventos} onEventSelect={handleEventSelect} />
            )}

            {currentView === "detail" && selectedEvent && (
              <EventDetail evento={selectedEvent} onBack={() => setCurrentView("explorer")} />
            )}

            {currentView === "create" && (
              <CreateEventForm
                onBack={() => setCurrentView("explorer")}
                onSubmit={handleCreateEvent}
                usuarios={mockUsuarios}
                patrocinadores={mockPatrocinadores}
                proveedores={mockProveedores}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}