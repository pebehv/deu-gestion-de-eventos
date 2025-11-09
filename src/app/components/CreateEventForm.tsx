import { useState } from "react";
import { Calendar as CalendarIcon, Plus, Trash2, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";

interface Recurso {
  nombre: string;
  cantidad: number;
}

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
}

interface Patrocinador {
  id: number;
  nombre: string;
}

interface Proveedor {
  id: number;
  nombre: string;
}

interface CreateEventFormProps {
  onBack: () => void;
  onSubmit: (data: any) => void;
  usuarios: Usuario[];
  patrocinadores: Patrocinador[];
  proveedores: Proveedor[];
}

export function CreateEventForm({ onBack, onSubmit, usuarios, patrocinadores, proveedores }: CreateEventFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fecha: undefined as Date | undefined,
    espacio: "",
    tipo: "",
    recursos: [] as Recurso[],
    ponentes: [] as number[],
    patrocinadoresSeleccionados: [] as number[],
    proveedoresSeleccionados: [] as number[],
    registro: false,
  });

  const [newRecurso, setNewRecurso] = useState({ nombre: "", cantidad: 1 });

  const handleAddRecurso = () => {
    if (newRecurso.nombre.trim()) {
      setFormData({
        ...formData,
        recursos: [...formData.recursos, { ...newRecurso }],
      });
      setNewRecurso({ nombre: "", cantidad: 1 });
    }
  };

  const handleRemoveRecurso = (index: number) => {
    setFormData({
      ...formData,
      recursos: formData.recursos.filter((_, i) => i !== index),
    });
  };

  const handleTogglePonente = (userId: number) => {
    setFormData({
      ...formData,
      ponentes: formData.ponentes.includes(userId)
        ? formData.ponentes.filter((id) => id !== userId)
        : [...formData.ponentes, userId],
    });
  };

  const handleTogglePatrocinador = (id: number) => {
    setFormData({
      ...formData,
      patrocinadoresSeleccionados: formData.patrocinadoresSeleccionados.includes(id)
        ? formData.patrocinadoresSeleccionados.filter((pid) => pid !== id)
        : [...formData.patrocinadoresSeleccionados, id],
    });
  };

  const handleToggleProveedor = (id: number) => {
    setFormData({
      ...formData,
      proveedoresSeleccionados: formData.proveedoresSeleccionados.includes(id)
        ? formData.proveedoresSeleccionados.filter((pid) => pid !== id)
        : [...formData.proveedoresSeleccionados, id],
    });
  };

  const canProceedStep1 = formData.nombre && formData.descripcion && formData.fecha && formData.espacio;
  const canSubmit = canProceedStep1;

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      registro: formData.registro ? "S" : "N",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-white hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          <h1 className="text-white">Crear Nuevo Evento</h1>
          <p className="text-white/80 mt-2">Complete los siguientes pasos para crear su evento</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      currentStep >= step
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {currentStep > step ? <Check className="w-5 h-5" /> : step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        currentStep > step ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm">Básicos</span>
              <span className="text-sm">Recursos</span>
              <span className="text-sm">Finanzas</span>
            </div>
          </div>

          {/* Step 1: Información Básica */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Información Básica del Evento</CardTitle>
                <CardDescription>Ingrese los detalles principales del evento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre del Evento *</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Ej: Conferencia Anual de Tecnología 2025"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción *</Label>
                  <Textarea
                    id="descripcion"
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    placeholder="Describa el evento, objetivos, y qué pueden esperar los asistentes..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Fecha del Evento *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.fecha
                            ? formData.fecha.toLocaleDateString('es-ES')
                            : "Seleccionar fecha"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.fecha}
                          onSelect={(date) => setFormData({ ...formData, fecha: date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo de Evento</Label>
                    <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value })}>
                      <SelectTrigger id="tipo">
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Conferencia">Conferencia</SelectItem>
                        <SelectItem value="Taller">Taller</SelectItem>
                        <SelectItem value="Seminario">Seminario</SelectItem>
                        <SelectItem value="Networking">Networking</SelectItem>
                        <SelectItem value="Concierto">Concierto</SelectItem>
                        <SelectItem value="Otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="espacio">Espacio/Ubicación *</Label>
                  <Input
                    id="espacio"
                    value={formData.espacio}
                    onChange={(e) => setFormData({ ...formData, espacio: e.target.value })}
                    placeholder="Ej: Centro de Convenciones, Sala Principal"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => setCurrentStep(2)}
                    disabled={!canProceedStep1}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Siguiente
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Recursos y Ponentes */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Recursos y Ponentes</CardTitle>
                <CardDescription>Añada los recursos necesarios y seleccione los ponentes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Recursos */}
                <div className="space-y-4">
                  <Label>Recursos y Material</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Nombre del recurso"
                      value={newRecurso.nombre}
                      onChange={(e) => setNewRecurso({ ...newRecurso, nombre: e.target.value })}
                    />
                    <Input
                      type="number"
                      placeholder="Cantidad"
                      className="w-32"
                      min="1"
                      value={newRecurso.cantidad}
                      onChange={(e) =>
                        setNewRecurso({ ...newRecurso, cantidad: parseInt(e.target.value) || 1 })
                      }
                    />
                    <Button onClick={handleAddRecurso} variant="outline">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {formData.recursos.length > 0 && (
                    <div className="space-y-2">
                      {formData.recursos.map((recurso, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div>
                            <p>{recurso.nombre}</p>
                            <p className="text-sm text-muted-foreground">Cantidad: {recurso.cantidad}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveRecurso(index)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Separator />

                {/* Ponentes */}
                <div className="space-y-4">
                  <Label>Ponentes</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto p-1">
                    {usuarios.map((usuario) => (
                      <div
                        key={usuario.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          formData.ponentes.includes(usuario.id)
                            ? "bg-primary/10 border-primary"
                            : "hover:bg-accent"
                        }`}
                        onClick={() => handleTogglePonente(usuario.id)}
                      >
                        <div className="flex items-center justify-between">
                          <p>
                            {usuario.nombre} {usuario.apellido}
                          </p>
                          {formData.ponentes.includes(usuario.id) && (
                            <Badge className="bg-primary">Seleccionado</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {formData.ponentes.length > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {formData.ponentes.length} ponente(s) seleccionado(s)
                    </p>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Anterior
                  </Button>
                  <Button onClick={() => setCurrentStep(3)} className="bg-primary hover:bg-primary/90">
                    Siguiente
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Finanzas y Publicación */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Finanzas y Publicación</CardTitle>
                <CardDescription>Configure patrocinadores, proveedores y opciones de registro</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Patrocinadores */}
                <div className="space-y-4">
                  <Label>Patrocinadores</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto p-1">
                    {patrocinadores.map((patrocinador) => (
                      <div
                        key={patrocinador.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          formData.patrocinadoresSeleccionados.includes(patrocinador.id)
                            ? "bg-secondary/10 border-secondary"
                            : "hover:bg-accent"
                        }`}
                        onClick={() => handleTogglePatrocinador(patrocinador.id)}
                      >
                        <div className="flex items-center justify-between">
                          <p>{patrocinador.nombre}</p>
                          {formData.patrocinadoresSeleccionados.includes(patrocinador.id) && (
                            <Badge className="bg-secondary">Seleccionado</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Proveedores */}
                <div className="space-y-4">
                  <Label>Proveedores</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto p-1">
                    {proveedores.map((proveedor) => (
                      <div
                        key={proveedor.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          formData.proveedoresSeleccionados.includes(proveedor.id)
                            ? "bg-accent/50 border-accent"
                            : "hover:bg-accent"
                        }`}
                        onClick={() => handleToggleProveedor(proveedor.id)}
                      >
                        <div className="flex items-center justify-between">
                          <p>{proveedor.nombre}</p>
                          {formData.proveedoresSeleccionados.includes(proveedor.id) && (
                            <Badge className="bg-accent">Seleccionado</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Registro */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="registro">Habilitar Registro</Label>
                    <p className="text-sm text-muted-foreground">
                      Permitir que los usuarios se registren para este evento
                    </p>
                  </div>
                  <Switch
                    id="registro"
                    checked={formData.registro}
                    onCheckedChange={(checked) => setFormData({ ...formData, registro: checked })}
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Anterior
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    className="bg-secondary hover:bg-secondary/90"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Crear Evento
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
