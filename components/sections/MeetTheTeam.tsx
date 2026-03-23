"use client";

import Image from "next/image";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";
import { FadeInSection } from "../motion/FadeInSection";
import { team } from "../../data/site";

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
        {team.map((member, i) => (
          <FadeInSection key={member.id} delay={i * 0.1}>
            <div className="group rounded-2xl border border-pw-border bg-white overflow-hidden hover:shadow-pw-lg transition-all duration-300">
              {/* Photo */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pw-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-pw-charcoal">
                  {member.name}
                </h3>
                <p className="text-sm text-pw-terracotta font-medium mt-0.5">
                  {member.role}
                </p>
                <p className="mt-3 text-xs text-pw-muted leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {member.specialties.map((s) => (
                    <Badge key={s} tone="neutral" className="!text-[8px] !px-2 !py-1">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>
    </Section>
  );
}
