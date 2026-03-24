"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Car, Check, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { PageHero } from "../sections/PageHero";
import { Section } from "../layout/Section";
import { Button } from "../ui/Button";
import { FormInput } from "../ui/FormInput";
import { FadeInSection } from "../motion/FadeInSection";
import { brand } from "../../data/site";

export function ContactPageContent() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dogInfo, setDogInfo] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, dogInfo, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

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
                <p className="font-display text-xl font-bold text-pw-charcoal">
                  Message sent!
                </p>
                <p className="mt-2 text-sm text-pw-muted">
                  Thanks for reaching out! We typically respond within a few hours during business hours.
                </p>
              </motion.div>
            ) : (
              <div className="rounded-2xl border border-pw-border bg-white p-6 sm:p-8">
                <h2 className="font-display text-xl font-bold text-pw-charcoal mb-6">
                  Send us a message
                </h2>
                {error && (
                  <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormInput
                      label="Your Name"
                      placeholder="e.g. Sarah Mitchell"
                      required
                      value={name}
                      onChange={(e) => setName((e.target as HTMLInputElement).value)}
                    />
                    <FormInput
                      label="Phone"
                      type="tel"
                      placeholder="e.g. 0412 345 678"
                      required
                      value={phone}
                      onChange={(e) => setPhone((e.target as HTMLInputElement).value)}
                    />
                  </div>
                  <FormInput
                    label="Email"
                    type="email"
                    placeholder="e.g. sarah@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
                  />
                  <FormInput
                    label="Dog's Name & Breed"
                    placeholder="e.g. Luna, Cavoodle"
                    value={dogInfo}
                    onChange={(e) => setDogInfo((e.target as HTMLInputElement).value)}
                  />
                  <FormInput
                    as="textarea"
                    label="Message"
                    placeholder="How can we help?"
                    required
                    value={message}
                    onChange={(e) => setMessage((e.target as HTMLTextAreaElement).value)}
                  />
                  <Button type="submit" fullWidth disabled={submitting}>
                    {submitting ? "Sending..." : "Send Message"}
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
                  className="w-full h-full border-0 grayscale group-hover:grayscale-0 transition-[filter] duration-700"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Pawsome & Co. location"
                  aria-label="Google Maps showing Pawsome & Co. location in Balmain"
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
