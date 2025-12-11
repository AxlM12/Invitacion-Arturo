import sunsetPhoto from "@/assets/sunset-photo.jpg";
import { MapPin } from "lucide-react";
import { Button } from "./ui/button";

const InvitationHero = () => {
  const handleLocationClick = () => {
    // Replace with actual Google Maps location URL
    window.open("https://maps.google.com/?q=La+Terraza+de+Betty+y+Beto", "_blank");
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12 kraft-texture">
      <div className="max-w-4xl w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Polaroid Photo */}
        <div className="polaroid-frame animate-fade-in">
          <img
            src={sunsetPhoto}
            alt="Atardecer con árbol"
            className="w-64 h-48 md:w-80 md:h-60 object-cover"
          />
        </div>

        {/* Invitation Text */}
        <div className="flex-1 text-center lg:text-left animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl italic text-foreground mb-6 text-shadow-soft">
            15 de Diciembre
          </h1>
          
          <p className="font-body text-lg md:text-xl text-foreground/80 mb-8 leading-relaxed">
            Los momentos importantes de la vida son mejores cuando se comparten con la familia y amigos.
            <br />
            <span className="italic">Te invito a acompañarnos a festejar:</span>
          </p>

          <div className="space-y-4 mb-8">
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              El cumpleaños de
            </h2>
            <h3 className="font-display text-4xl md:text-5xl font-semibold text-primary">
              Arturo Macedo
            </h3>
          </div>

          <div className="space-y-2 mb-8">
            <p className="font-display text-3xl md:text-4xl text-foreground">
              2:30 PM
            </p>
            <p className="font-display text-2xl md:text-3xl text-foreground">
              En: La terraza de Betty y Beto
            </p>
          </div>

          <Button
            onClick={handleLocationClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-body text-lg px-8 py-6 rounded-lg shadow-card transition-all hover:scale-105"
          >
            <MapPin className="mr-2 h-5 w-5" />
            Ver ubicación
          </Button>

          <p className="mt-8 font-body text-muted-foreground italic">
            Favor de confirmar asistencia
          </p>
        </div>
      </div>
    </section>
  );
};

export default InvitationHero;
