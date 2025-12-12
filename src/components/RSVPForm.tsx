import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { UserPlus, UserMinus, Send, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/lib/supabase';

interface Attendee {
  nombre: string;
}

const RSVPForm = () => {
  const [attendees, setAttendees] = useState<Attendee[]>([
    { nombre: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addAttendee = () => {
    if (attendees.length < 10) {
      setAttendees([...attendees, { nombre: "" }]);
    }
  };

  const removeAttendee = (index: number) => {
    if (attendees.length > 1) {
      setAttendees(attendees.filter((_, i) => i !== index));
    }
  };

  const updateAttendee = (index: number, field: keyof Attendee, value: string) => {
    const updated = [...attendees];
    updated[index][field] = value;
    setAttendees(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const isValid = attendees.every(
      (a) => a.nombre.trim() !== ""
    );

    if (!isValid) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa el nombre de todos los asistentes.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Insert each attendee as a separate row in the "Invitados" table
      const inserts = attendees.map(attendee => ({
        nombre: attendee.nombre.trim(),
      }));

      const { data, error } = await supabase
        .from('Invitados')
        .insert(inserts);

      if (error) {
        console.error('Error inserting data:', error);
        toast({
          title: "Error",
          description: "No se pudo registrar la asistencia. Inténtalo de nuevo.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "¡Gracias por confirmar!",
          description: "Tu asistencia ha sido registrada exitosamente.",
        });
        // Reset the form
        setAttendees([{ nombre: "" }]);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast({
        title: "Error",
        description: "Ocurrió un error inesperado. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-16 px-4 bg-card">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Confirmar Asistencia
          </h2>
          <p className="font-body text-muted-foreground">
            Por favor ingresa los datos de los asistentes
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Attendee count selector */}
          <div className="flex items-center justify-center gap-4 p-4 bg-secondary/50 rounded-lg">
            <Users className="h-5 w-5 text-primary" />
            <span className="font-body text-foreground">
              Número de asistentes: <strong>{attendees.length}</strong>
            </span>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={removeAttendee.bind(null, attendees.length - 1)}
                disabled={attendees.length <= 1}
                className="h-8 w-8"
              >
                <UserMinus className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={addAttendee}
                disabled={attendees.length >= 10}
                className="h-8 w-8"
              >
                <UserPlus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Attendee forms */}
          <div className="space-y-6">
            {attendees.map((attendee, index) => (
              <div
                key={index}
                className="p-6 bg-background/50 rounded-lg border border-border shadow-sm animate-fade-in"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-xl text-foreground">
                    Asistente {index + 1}
                  </h3>
                  {attendees.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAttendee(index)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <UserMinus className="h-4 w-4 mr-1" />
                      Eliminar
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`nombre-${index}`} className="font-body">
                      Nombre <span className="text-accent">*</span>
                    </Label>
                    <Input
                      id={`nombre-${index}`}
                      type="text"
                      placeholder="Nombre completo"
                      value={attendee.nombre}
                      onChange={(e) => updateAttendee(index, "nombre", e.target.value)}
                      className="font-body bg-card"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add attendee button */}
          {attendees.length < 10 && (
            <Button
              type="button"
              variant="outline"
              onClick={addAttendee}
              className="w-full font-body border-dashed border-2 hover:bg-secondary/50"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Agregar otro asistente
            </Button>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body text-lg py-6 shadow-card transition-all hover:scale-[1.02]"
          >
            <Send className="h-5 w-5 mr-2" />
            {isSubmitting ? "Enviando..." : "Confirmar Asistencia"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default RSVPForm;
