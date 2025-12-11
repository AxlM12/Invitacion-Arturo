import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import InvitationHero from "@/components/InvitationHero";
import RSVPForm from "@/components/RSVPForm";
import paperBackground from "@/assets/paper-background.png";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <main
        className="min-h-screen bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${paperBackground})` }}
      >
        <InvitationHero />
        <RSVPForm />
      </main>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
