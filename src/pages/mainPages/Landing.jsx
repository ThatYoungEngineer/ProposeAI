import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Button, Typography } from "../../components";
import { LNG } from "../../language";
import Galaxy from "../../ui/Galaxy";
import GradientText from "../../components/GradientText";
import { ICONS, ROUTES } from "../../constants";

const Landing = () => {
  const copy = LNG.eng.landingPage;
  const navigate = useNavigate();

  if (!copy) return null;

  const handleNavigate = () => {
    navigate(ROUTES.GENERATE_PROPOSAL);
  };

  const handleKeyDown = (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    handleNavigate();
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <Galaxy
        className="absolute inset-0 h-full w-full"
        density={1}
        glowIntensity={0.3}
        saturation={0}
        hueShift={140}
        twinkleIntensity={0.3}
        rotationSpeed={0.1}
        repulsionStrength={2}
        autoCenterRepulsion={0}
        starSpeed={1}
        speed={5}
        mouseInteraction
        mouseRepulsion
        transparent={false}
      />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center [font-family:'Figtree',sans-serif]">
        <GradientText
          textSizeClass="text-4xl sm:text-5xl lg:text-6xl"
          className="font-semibold !cursor-auto"
        >
          {copy.title}
        </GradientText>
        <h3 className="max-w-2xl text-xl text-white/70">{copy.subtitle}</h3>
        <Link to={ROUTES.GENERATE_PROPOSAL} className="btn-17">
          <div class="text-container">
            <div class="text flex items-center">
              Generate Proposal
              <span>→</span>{" "}
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default Landing;
