"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Car, Check } from "lucide-react";
import { motion } from "framer-motion";
import { PageHero } from "../sections/PageHero";
import { Section } from "../layout/Section";
import { Button } from "../ui/Button";
import { FormInput } from "../ui/FormInput";
import { FadeInSection } from "../motion/FadeInSection";
import { brand } from "../../data/site";

export function ContactPageContent() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHero
        badge="Contact Us"
        badgeTone="teal"
        title={
          <>
            We&rsquo;d love to{" "}
            <span className="text-pw-teal">hear from you</span>
          </>
        }
        subtitle="Pop in, give us a call, or send a message. We're always happy to chat about your pup."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact form */}
          <FadeInSection>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border border-pw-sage/30 bg-pw-sage/5 p-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-pw-sage/10 border border-pw-sage/30 flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-pw-sage" />
                </div>
                <h3 className="font-display text-xl font-bold text-pw-charcoal">
                  Message sent!
                </h3>
                <p className="mt-2 text-sm text-pw-muted">
                  Thanks for reaching out! We typically respond within a few hours during business hours.
                </p>
              </motion.div>
            ) : (
              <div className="rounded-2xl border border-pw-border bg-white p-6 sm:p-8">
                <h2 className="font-display text-xl font-bold text-pw-charcoal mb-6">
                  Send us a message
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormInput label="Your Name" placeholder=" " required />
                    <FormInput label="Phone" type="tel" placeholder=" " required />
                  </div>
                  <FormInput label="Email" type="email" placeholder=" " required />
                  <FormInput label="Dog's Name & Breed" placeholder=" " />
                  <FormInput
                    as="textarea"
                    label="Message"
                    placeholder=" "
                    required
                  />
                  <Button type="submit" fullWidth>
                    Send Message
                  </Button>
                </form>
              </div>
            )}
          </FadeInSection>

          {/* Map + info */}
          <FadeInSection delay={0.15}>
            <div className="space-y-6">
              {/* Google Map */}
              <div className="rounded-2xl overflow-hidden border border-pw-border h-[300px] relative group">
                <iframe
                  src={brand.googleMapsUrl}
                  className="w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all duration-700"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Pawsome & Co. location"
                />
              </div>

              {/* Contact details */}
              <div className="rounded-2xl border border-pw-border bg-white p-6 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-pw-teal/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-pw-teal" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-pw-charcoal text-sm">Address</p>
                    <p className="text-sm text-pw-muted mt-0.5">{brand.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-pw-teal/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-pw-teal" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-pw-charcoal text-sm">Phone</p>
                    <Link
                      href={`tel:${brand.phone.replace(/\s/g, "")}`}
                      className="text-sm text-pw-teal hover:text-pw-teal-600 transition-colors"
                    >
                      {brand.phone}
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-pw-teal/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-pw-teal" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-pw-charcoal text-sm">Email</p>
                    <Link
                      href={`mailto:${brand.email}`}
                      className="text-sm text-pw-teal hover:text-pw-teal-600 transition-colors"
                    >
                      {brand.email}
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-pw-teal/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-pw-teal" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-pw-charcoal text-sm">Hours</p>
                    <div className="text-sm text-pw-muted mt-0.5 space-y-0.5">
                      {brand.hours.map((h) => (
                        <p key={h}>{h}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-pw-teal/10 flex items-center justify-center flex-shrink-0">
                    <Car className="h-5 w-5 text-pw-teal" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-pw-charcoal text-sm">Parking</p>
                    <p className="text-sm text-pw-muted mt-0.5">
                      2-hour street parking on Darling Street and surrounding streets.
                      Balmain Leagues Club car park is a 3-minute walk.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </Section>
    </>
  );
}
