"use client";

import Image from "next/image";
import { Award } from "lucide-react";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";
import { FadeInSection } from "../motion/FadeInSection";
import { team } from "../../data/site";

const badgeColors: Record<string, "sage" | "teal" | "warm" | "gold" | "neutral"> = {
  Cavoodles: "sage",
  Poodles: "sage",
  "Asian Fusion Styling": "teal",
  "Large Breeds": "warm",
  "De-shedding": "warm",
  "Rescue Dogs": "gold",
  Puppies: "gold",
  Terriers: "sage",
  "Hand Stripping": "teal",
  Bookings: "neutral",
  "Customer Care": "neutral",
};

export function MeetTheTeam() {
  return (
    <Section id="team" className="bg-pw-elevated">
      <SectionHeading
        badge="Our Team"
        badgeTone="teal"
        title={
          <>
            The people behind the{" "}
            <span className="text-pw-teal">pawsome grooms</span>
          </>
        }
        subtitle="Certified groomers who genuinely love what they do."
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member, i) => {
          const isOwner = member.role.includes("Owner");

          return (
            <FadeInSection key={member.id} delay={i * 0.1}>
              <div
                className={`group rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-pw-xl ${
                  isOwner
                    ? "border-2 border-pw-amber/30 bg-white"
                    : "border border-pw-border bg-white"
                }`}
              >
                {/* Photo with crossfade bio on hover */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={`${member.name} — ${member.role} at Pawsome & Co.`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-[0.15]"
                  />
                  {/* Gradient overlay on non-hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-pw-charcoal/30 to-transparent group-hover:from-transparent transition-all duration-500" />

                  {/* Bio text — revealed on hover */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-sm text-pw-charcoal leading-relaxed text-center">
                      {member.bio}
                    </p>
                  </div>

                  {/* Owner badge */}
                  {isOwner && (
                    <div className="absolute top-3 right-3">
                      <Badge tone="gold">
                        <Award className="mr-1 h-3 w-3" />
                        Founder
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-pw-charcoal">
                    {member.name}
                  </h3>
                  <p className="text-sm text-pw-terracotta font-medium mt-0.5">
                    {member.role}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {member.specialties.map((s) => (
                      <Badge
                        key={s}
                        tone={badgeColors[s] || "neutral"}
                        className="!text-[8px] !px-2 !py-0.5"
                      >
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInSection>
          );
        })}
      </div>
    </Section>
  );
}
