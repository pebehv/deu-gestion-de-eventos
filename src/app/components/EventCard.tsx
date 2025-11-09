import { Calendar, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface EventCardProps {
  id: number;
  nombre: string;
  fecha: string;
  tipo?: string;
  registro: "S" | "N";
  imagen?: string;
  onClick: () => void;
}

export function EventCard({ nombre, fecha, tipo, registro, imagen, onClick }: EventCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group" onClick={onClick}>
      <div className="relative h-48 overflow-hidden bg-muted">
        <ImageWithFallback
          src={imagen || ""}
          alt={nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2">{nombre}</h3>
          {tipo && (
            <Badge variant="secondary" className="shrink-0">
              {tipo}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{new Date(fecha).toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-3 border-t">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {registro === "S" ? (
              <>
                <CheckCircle className="w-4 h-4 text-secondary" />
                <span className="text-sm text-secondary">Registro disponible</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Sin registro</span>
              </>
            )}
          </div>
          <Button variant="ghost" size="sm" className="text-primary">
            Ver detalles
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
