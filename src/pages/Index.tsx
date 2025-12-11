import InvitationHero from "@/components/InvitationHero";
import RSVPForm from "@/components/RSVPForm";
import paperBackground from "@/assets/paper-background.png";

const Index = () => {
  return (
    <main 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${paperBackground})` }}
    >
      <InvitationHero />
      <RSVPForm />
    </main>
  );
};

export default Index;
