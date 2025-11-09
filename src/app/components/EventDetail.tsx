import { Calendar, MapPin, FileText, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Recurso {
  nombre: string;
  disponible: boolean;
  cantidad?: number;
}

interface Patrocinador {
  nombre: string;
  monto?: number;
}

interface Ponente {
  id_usuario: number;
  nombre: string;
  apellido: string;
}

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
  recursos?: Recurso[];
  patrocinadores?: Patrocinador[];
  ponentes?: Ponente[];
}

interface EventDetailProps {
  evento: Evento;
  onBack: () => void;
}

export function EventDetail({ evento, onBack }: EventDetailProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-foreground">
        <ImageWithFallback
          src={evento.imagen || ""}
          alt={evento.nombre}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 to-transparent">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12">
            <Button
              variant="ghost"
              onClick={onBack}
              className="self-start mb-4 text-white hover:bg-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
            <h1 className="mb-4 text-white">{evento.nombre}</h1>
            <div className="flex flex-wrap gap-2">
              {evento.tipo && (
                <Badge className="bg-primary">
                  {evento.tipo}
                </Badge>
              )}
              {evento.registro === "S" && (
                <Badge className="bg-secondary">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Registro Disponible
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Descripción del Evento</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{evento.descripcion}</p>
              </CardContent>
            </Card>

            {/* Recursos/Material */}
            {evento.recursos && evento.recursos.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recursos y Material</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {evento.recursos.map((recurso, index) => (
                      <div
                        key={index}
                        className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p>{recurso.nombre}</p>
                            {recurso.cantidad && (
                              <p className="text-sm text-muted-foreground">
                                Cantidad: {recurso.cantidad}
                              </p>
                            )}
                          </div>
                          <Badge variant={recurso.disponible ? "default" : "secondary"}>
                            {recurso.disponible ? "Disponible" : "No disponible"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Ponentes */}
            {evento.ponentes && evento.ponentes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Ponentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {evento.ponentes.map((ponente) => (
                      <div
                        key={ponente.id_usuario}
                        className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <p>{ponente.nombre} {ponente.apellido}</p>
                        <p className="text-sm text-muted-foreground">ID: {ponente.id_usuario}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Patrocinadores */}
            {evento.patrocinadores && evento.patrocinadores.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Patrocinadores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {evento.patrocinadores.map((patrocinador, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                          <p>{patrocinador.nombre}</p>
                          {patrocinador.monto && (
                            <Badge className="bg-accent">
                              ${patrocinador.monto.toLocaleString()}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Details Card */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Detalles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Fecha</p>
                      <p>
                        {new Date(evento.fecha).toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Espacio</p>
                      <p>{evento.espacio}</p>
                    </div>
                  </div>

                  {evento.inform_final && (
                    <>
                      <Separator />
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Informe Final</p>
                          <p className="text-sm">{evento.inform_final}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {evento.registro === "S" && (
                  <>
                    <Separator />
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Registrarme al Evento
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
