import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { LogIn, User, Lock, Calendar } from "lucide-react";
import { toast } from "sonner";

interface LoginProps {
  onLogin: (email: string) => void;
}

// Mock users para testing
const mockUsers = [
  { email: "admin@eventos.com", password: "admin123", name: "Administrador" },
  { email: "maria.gonzalez@eventos.com", password: "maria123", name: "María González" },
  { email: "carlos.rodriguez@eventos.com", password: "carlos123", name: "Carlos Rodríguez" },
  { email: "demo@eventos.com", password: "demo", name: "Usuario Demo" },
];

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    setLoading(true);

    // Simular llamada a API
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        toast.success(`¡Bienvenido, ${user.name}!`);
        onLogin(email);
      } else {
        toast.error("Credenciales incorrectas");
      }
      
      setLoading(false);
    }, 800);
  };

  return (
    <div className= "min-h-screen bg-gradient-to-br  flex items-center justify-center p-4 " 
    style={{ background: 'rgb(1,105,91)' , padding: '15%' }}>
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg">
            <Calendar className="w-8 h-8 text-[rgb(13,110,253)]" />
          </div>
          <h1 className="text-white mb-2">Portal de Eventos</h1>
          <p className="text-white/80">Gestión y creación de eventos</p>
        </div>

        {/* Login Card */}
        <Card className="p-8 shadow-2xl" 
        style={{padding: '5%'}}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email o Usuario</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="text"
                  placeholder="Ingresa tu email o usuario"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[rgb(13,110,253)] hover:bg-[rgb(13,110,253)]/90"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Iniciar Sesión
                </>
              )}
            </Button>
          </form>

          {/* Demo credentials hint */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              Credenciales de prueba:
            </p>
            <div className="space-y-1">
              <p className="text-sm">
                <span className="text-foreground">Email:</span> demo@eventos.com
              </p>
              <p className="text-sm">
                <span className="text-foreground">Contraseña:</span> demo
              </p>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-white/60 mt-6 text-sm">
          Sistema de gestión de eventos © 2025
        </p>
      </div>
    </div>
  );
}
