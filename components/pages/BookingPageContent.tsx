"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Dog,
  User,
  ClipboardCheck,
} from "lucide-react";
import { PageHero } from "../sections/PageHero";
import { Section } from "../layout/Section";
import { Button } from "../ui/Button";
import { FormInput } from "../ui/FormInput";
import { services } from "../../data/site";

const steps = [
  { label: "Service", icon: ClipboardCheck },
  { label: "Your Dog", icon: Dog },
  { label: "Date & Time", icon: Calendar },
  { label: "Your Details", icon: User },
  { label: "Confirm", icon: Check },
];

const timeSlots = [
  "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM",
  "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM",
];

const breeds = [
  "Cavoodle", "French Bulldog", "Golden Retriever", "Labrador", "Spoodle",
  "Maltese", "Shih Tzu", "Border Collie", "Poodle", "Cocker Spaniel",
  "Australian Shepherd", "Husky", "German Shepherd", "Beagle", "Other",
];

export function BookingPageContent() {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [dogName, setDogName] = useState("");
  const [breed, setBreed] = useState("");
  const [dogSize, setDogSize] = useState("");
  const [notes, setNotes] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const selectedServiceData = services.find((s) => s.id === selectedService);

  const canProceed = () => {
    switch (step) {
      case 0: return !!selectedService;
      case 1: return !!dogName && !!breed && !!dogSize;
      case 2: return !!selectedDate && !!selectedTime;
      case 3: return !!ownerName && !!email && !!phone;
      default: return true;
    }
  };

  // Generate next 14 days for date selection
  const dates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  }).filter((d) => d.getDay() !== 0); // No Sundays

  const handleConfirm = () => {
    setConfirmed(true);
  };

  return (
    <>
      <PageHero
        badge="Book Online"
        badgeTone="warm"
        title={
          <>
            Book your pup&rsquo;s next{" "}
            <span className="text-pw-terracotta">pamper session</span>
          </>
        }
        subtitle="Pick a service, tell us about your dog, and choose a time. Easy as that."
      />

      <Section noDivider>
        {/* Progress bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((s, i) => (
              <div key={s.label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      i < step
                        ? "bg-pw-sage text-white"
                        : i === step
                        ? "bg-pw-terracotta text-white shadow-glow-terracotta"
                        : "bg-pw-elevated border border-pw-border text-pw-muted"
                    }`}
                  >
                    {i < step ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <s.icon className="h-4 w-4" />
                    )}
                  </div>
                  <span className="text-[10px] text-pw-muted mt-1.5 hidden sm:block">
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`w-8 sm:w-16 h-[2px] mx-1 sm:mx-2 transition-colors duration-300 ${
                      i < step ? "bg-pw-sage" : "bg-pw-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {confirmed ? (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-pw-sage/10 border border-pw-sage/30 flex items-center justify-center mx-auto mb-6">
                  <Check className="h-10 w-10 text-pw-sage" />
                </div>
                <h2 className="font-display text-display-lg text-pw-charcoal">
                  Booking confirmed!
                </h2>
                <p className="mt-3 text-pw-muted max-w-md mx-auto">
                  We&rsquo;ve sent a confirmation to <strong>{email}</strong>.
                  You&rsquo;ll receive a reminder SMS 24 hours before your appointment.
                </p>
                <div className="mt-6 rounded-xl border border-pw-border bg-white p-5 text-left max-w-sm mx-auto space-y-2">
                  <p className="text-sm"><strong>Service:</strong> {selectedServiceData?.name}</p>
                  <p className="text-sm"><strong>Dog:</strong> {dogName} ({breed})</p>
                  <p className="text-sm"><strong>Date:</strong> {selectedDate}</p>
                  <p className="text-sm"><strong>Time:</strong> {selectedTime}</p>
                </div>
                <p className="mt-6 font-script text-lg text-pw-terracotta">
                  We can&rsquo;t wait to meet {dogName}!
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step 0: Select Service */}
                {step === 0 && (
                  <div>
                    <h2 className="font-display text-xl font-bold text-pw-charcoal mb-6">
                      Choose a service
                    </h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {services.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => setSelectedService(service.id)}
                          className={`flex items-start gap-4 rounded-xl border p-4 text-left transition-all duration-200 ${
                            selectedService === service.id
                              ? "border-pw-terracotta bg-pw-terracotta/5 shadow-glow-terracotta"
                              : "border-pw-border bg-white hover:border-pw-sage/30 hover:shadow-pw"
                          }`}
                        >
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={service.image}
                              alt={service.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-display font-bold text-pw-charcoal text-sm">
                              {service.name}
                            </p>
                            <p className="text-xs text-pw-muted mt-0.5">{service.tag}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="font-bold text-pw-teal text-sm">
                                {service.price}
                              </span>
                              <span className="text-[10px] text-pw-muted">
                                {service.duration}
                              </span>
                            </div>
                          </div>
                          {selectedService === service.id && (
                            <div className="w-5 h-5 rounded-full bg-pw-terracotta flex items-center justify-center flex-shrink-0">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 1: Dog Details */}
                {step === 1 && (
                  <div>
                    <h2 className="font-display text-xl font-bold text-pw-charcoal mb-6">
                      Tell us about your dog
                    </h2>
                    <div className="space-y-4">
                      <FormInput
                        label="Dog's Name"
                        placeholder="e.g. Luna"
                        value={dogName}
                        onChange={(e) => setDogName((e.target as HTMLInputElement).value)}
                      />
                      <FormInput
                        as="select"
                        label="Breed"
                        value={breed}
                        onChange={(e) => setBreed((e.target as HTMLSelectElement).value)}
                        options={breeds.map((b) => ({ value: b, label: b }))}
                      />
                      <FormInput
                        as="select"
                        label="Size"
                        value={dogSize}
                        onChange={(e) => setDogSize((e.target as HTMLSelectElement).value)}
                        options={[
                          { value: "small", label: "Small (under 10kg)" },
                          { value: "medium", label: "Medium (10–25kg)" },
                          { value: "large", label: "Large (25kg+)" },
                        ]}
                      />
                      <FormInput
                        as="textarea"
                        label="Special Notes (optional)"
                        placeholder="Anything we should know? Skin conditions, anxiety, preferred style..."
                        value={notes}
                        onChange={(e) => setNotes((e.target as HTMLTextAreaElement).value)}
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Date & Time */}
                {step === 2 && (
                  <div>
                    <h2 className="font-display text-xl font-bold text-pw-charcoal mb-6">
                      Pick a date and time
                    </h2>

                    {/* Date grid */}
                    <p className="text-sm font-medium text-pw-charcoal mb-3">Date</p>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-8">
                      {dates.map((d) => {
                        const label = d.toLocaleDateString("en-AU", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        });
                        const isSat = d.getDay() === 6;
                        return (
                          <button
                            key={label}
                            onClick={() => setSelectedDate(label)}
                            className={`rounded-lg p-2 text-center text-xs transition-all duration-200 ${
                              selectedDate === label
                                ? "bg-pw-teal text-white shadow-glow-sage"
                                : "bg-white border border-pw-border hover:border-pw-sage/30"
                            }`}
                          >
                            <span className="block font-medium">
                              {d.toLocaleDateString("en-AU", { weekday: "short" })}
                            </span>
                            <span className="block text-lg font-bold mt-0.5">
                              {d.getDate()}
                            </span>
                            <span className="block text-[10px] opacity-70">
                              {d.toLocaleDateString("en-AU", { month: "short" })}
                            </span>
                            {isSat && (
                              <span className="block text-[8px] mt-0.5 opacity-50">
                                til 3pm
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Time slots */}
                    <p className="text-sm font-medium text-pw-charcoal mb-3">Time</p>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`rounded-lg py-2.5 px-3 text-sm font-medium transition-all duration-200 ${
                            selectedTime === time
                              ? "bg-pw-terracotta text-white"
                              : "bg-white border border-pw-border hover:border-pw-terracotta/30"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Contact details */}
                {step === 3 && (
                  <div>
                    <h2 className="font-display text-xl font-bold text-pw-charcoal mb-6">
                      Your contact details
                    </h2>
                    <div className="space-y-4">
                      <FormInput
                        label="Your Name"
                        placeholder="e.g. Sarah Mitchell"
                        value={ownerName}
                        onChange={(e) => setOwnerName((e.target as HTMLInputElement).value)}
                      />
                      <FormInput
                        label="Email"
                        type="email"
                        placeholder="e.g. sarah@email.com"
                        value={email}
                        onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
                      />
                      <FormInput
                        label="Phone"
                        type="tel"
                        placeholder="e.g. 0412 345 678"
                        value={phone}
                        onChange={(e) => setPhone((e.target as HTMLInputElement).value)}
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Summary */}
                {step === 4 && (
                  <div>
                    <h2 className="font-display text-xl font-bold text-pw-charcoal mb-6">
                      Review your booking
                    </h2>
                    <div className="rounded-xl border border-pw-border bg-white divide-y divide-pw-border">
                      <div className="p-5 flex items-center gap-4">
                        {selectedServiceData && (
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={selectedServiceData.image}
                              alt={selectedServiceData.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-display font-bold text-pw-charcoal">
                            {selectedServiceData?.name}
                          </p>
                          <p className="text-sm text-pw-teal font-bold">
                            {selectedServiceData?.price}{" "}
                            <span className="text-pw-muted font-normal">
                              &middot; {selectedServiceData?.duration}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="p-5 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-pw-muted text-xs uppercase tracking-wider">Dog</p>
                          <p className="font-medium mt-0.5">{dogName}</p>
                          <p className="text-pw-muted text-xs">{breed} &middot; {dogSize}</p>
                        </div>
                        <div>
                          <p className="text-pw-muted text-xs uppercase tracking-wider">When</p>
                          <p className="font-medium mt-0.5">{selectedDate}</p>
                          <p className="text-pw-muted text-xs">{selectedTime}</p>
                        </div>
                        <div>
                          <p className="text-pw-muted text-xs uppercase tracking-wider">Owner</p>
                          <p className="font-medium mt-0.5">{ownerName}</p>
                          <p className="text-pw-muted text-xs">{email}</p>
                        </div>
                        <div>
                          <p className="text-pw-muted text-xs uppercase tracking-wider">Phone</p>
                          <p className="font-medium mt-0.5">{phone}</p>
                        </div>
                      </div>
                      {notes && (
                        <div className="p-5 text-sm">
                          <p className="text-pw-muted text-xs uppercase tracking-wider">Notes</p>
                          <p className="mt-0.5 text-pw-charcoal">{notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {!confirmed && (
            <div className="mt-8 flex items-center justify-between">
              {step > 0 ? (
                <Button variant="ghost" onClick={() => setStep(step - 1)}>
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step < steps.length - 1 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                >
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleConfirm}>
                  Confirm Booking
                  <Check className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
