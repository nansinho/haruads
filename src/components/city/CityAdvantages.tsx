"use client";

import ScrollReveal from "@/components/ScrollReveal";
import {
  MapPin, Target, Sparkles, Users, Cpu, Zap, Rocket, TrendingUp,
  Layers, Globe, Monitor, Code, ShoppingCart, Search, Palette,
  Briefcase, Compass,
} from "lucide-react";
import type { CityPageData } from "@/data/cities/_types";

const iconMap: Record<string, React.ReactNode> = {
  MapPin: <MapPin size={22} />,
  Target: <Target size={22} />,
  Sparkles: <Sparkles size={22} />,
  Users: <Users size={22} />,
  Cpu: <Cpu size={22} />,
  Zap: <Zap size={22} />,
  Rocket: <Rocket size={22} />,
  TrendingUp: <TrendingUp size={22} />,
  Layers: <Layers size={22} />,
  Globe: <Globe size={22} />,
  Monitor: <Monitor size={22} />,
  Code: <Code size={22} />,
  ShoppingCart: <ShoppingCart size={22} />,
  Search: <Search size={22} />,
  Palette: <Palette size={22} />,
  Briefcase: <Briefcase size={22} />,
  Compass: <Compass size={22} />,
  Store: <ShoppingCart size={22} />,
  Cog: <Target size={22} />,
  Building: <Layers size={22} />,
  Factory: <Layers size={22} />,
  Plane: <Rocket size={22} />,
  Landmark: <Globe size={22} />,
};

export default function CityAdvantages({ city }: { city: CityPageData }) {
  return (
    <section className="bg-white text-text-dark">
      <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
        <ScrollReveal>
          <div className="text-center max-w-[600px] mx-auto mb-14">
            <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
              Nos avantages
            </span>
            <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.08] tracking-[-0.02em] mt-4">
              <span className="font-light">Pourquoi nous </span>
              <span className="font-serif italic">choisir.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {city.advantages.map((adv, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="flex gap-5 p-6 lg:p-8 rounded-2xl bg-light border border-gray-100 h-full group hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0 group-hover:bg-accent group-hover:text-dark transition-all duration-300">
                  {iconMap[adv.icon] || <Target size={22} />}
                </div>
                <div>
                  <h3 className="text-[1.05rem] font-semibold text-text-dark mb-2">
                    {adv.title}
                  </h3>
                  <p className="text-[0.82rem] text-text-body leading-[1.7]">
                    {adv.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
