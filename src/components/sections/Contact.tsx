'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import AnimatedHeading from '@/components/ui/AnimateHeading';
import ScrollWordReveal from '@/components/ui/ScrollWordReveal';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { gsap, useGSAP } from '@/lib/gsap';
import { EASE } from '@/lib/motion';
import { site } from '@/lib/site';
import { media } from '@/lib/media';
import { useReducedMotion } from '@/lib/useReducedMotion';
import SocialIconLinks from '@/components/shared/SocialIconLinks';
import CvDownloadLink from '@/components/shared/CvDownloadLink';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const headingWords = [
    { t: "LET'S" },
    { t: 'talk', serif: true },
  ];

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [copiedToast, setCopiedToast] = useState<boolean>(false);

  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => setSubmitStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  useEffect(() => {
    if (copiedToast) {
      const timer = setTimeout(() => setCopiedToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedToast]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setErrors({});
            setSubmitStatus(null);
          }
        });
      },
      { threshold: 0, rootMargin: '0px' },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      if (reduced) return;
      const card = cardRef.current;
      const cta = ctaRef.current;

      if (card) {
        gsap.fromTo(
          card,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: EASE.outCubic,
            scrollTrigger: { trigger: card, start: 'top 90%', once: true },
          }
        );
      }
      if (cta) {
        gsap.fromTo(
          cta,
          { x: 48, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: EASE.outCubic,
            scrollTrigger: { trigger: cta, start: 'top 94%', once: true },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateMessage = (text: string) => {
    const trimmed = text.trim();
    if (trimmed.length < 30) return false;
    const words = trimmed.split(/\s+/).filter(Boolean);
    return words.length >= 5;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (!validateMessage(formData.message))
      newErrors.message = 'Please enter a meaningful message (at least 30 characters, 5 words)';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const composedMessage = () => {
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();
    return `Hello ${site.firstName},\n\nMy name is ${name}.\nEmail: ${email}\n\n${message}`;
  };

  /** Opens WhatsApp with the form content — no server / SMTP needed. */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    const text = composedMessage();
    const whatsappUrl = `${site.whatsappUrl}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setSubmitStatus('success');
    setSuccessMessage('WhatsApp is opening with your message. Send it there to reach me directly.');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleEmailCompose = () => {
    if (!validateForm()) return;

    const subject = encodeURIComponent(`Portfolio inquiry from ${formData.name.trim()}`);
    const body = encodeURIComponent(composedMessage());
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;

    setSubmitStatus('success');
    setSuccessMessage('Your email app is opening with the message ready to send.');
  };

  const isDisabled = isSubmitting;

  return (
    <section ref={sectionRef} id="contact" className="bg-ink text-light pt-12 pb-16 md:pt-14 md:pb-24 relative overflow-hidden">
      <div ref={containerRef} className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 w-full">
        <div
          ref={cardRef}
          className="rounded-3xl bg-elevated-dark text-light p-8 sm:p-12 md:p-16 lg:p-20 border border-border-subtle"
        >
          <AnimatedHeading
            words={headingWords}
            className="text-[clamp(2.5rem,7vw,6.5rem)] tracking-tight mb-6 text-cream"
          />
          <div className="max-w-2xl mb-12">
            <ScrollWordReveal
              text={site.contactLead}
              offset={['start 0.95', 'end 0.7']}
              className="text-base sm:text-lg text-gray-soft font-sans leading-relaxed"
            />
          </div>

          <form
            onSubmit={handleSubmit}
            className="max-w-2xl space-y-6 p-6 sm:p-8 rounded-2xl mx-auto bg-ink border border-border-subtle"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-medium text-sm sm:text-base text-cream">
                Your Name <span className="text-accent">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className={`w-full px-4 py-3 text-sm sm:text-base border rounded-xl bg-elevated-dark text-cream placeholder-muted focus:outline-none transition-all duration-300 border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent/30 ${
                  errors.name ? 'border-red-500 focus:border-red-500' : ''
                }`}
                disabled={isDisabled}
              />
              {errors.name && <p id="name-error" className="text-red-400 text-xs sm:text-sm">{errors.name}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-medium text-sm sm:text-base text-cream">
                Your Email <span className="text-accent">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={`w-full px-4 py-3 text-sm sm:text-base border rounded-xl bg-elevated-dark text-cream placeholder-muted focus:outline-none transition-all duration-300 border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent/30 ${
                  errors.email ? 'border-red-500 focus:border-red-500' : ''
                }`}
                disabled={isDisabled}
              />
              {errors.email && <p id="email-error" className="text-red-400 text-xs sm:text-sm">{errors.email}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-medium text-sm sm:text-base text-cream">
                Message <span className="text-accent">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`w-full px-4 py-3 text-sm sm:text-base border rounded-xl bg-elevated-dark text-cream placeholder-muted resize-none focus:outline-none transition-all duration-300 border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent/30 ${
                  errors.message ? 'border-red-500 focus:border-red-500' : ''
                }`}
                disabled={isDisabled}
              />
              {errors.message && <p id="message-error" className="text-red-400 text-xs sm:text-sm">{errors.message}</p>}
              <p className="text-xs text-muted">{formData.message.length} / 30 minimum characters</p>
            </div>

            <div role="status" aria-live="polite">
              {submitStatus === 'success' && (
                <div className="p-4 bg-accent/15 border border-accent/40 rounded-xl mb-4">
                  <p className="text-accent-light text-sm">{successMessage}</p>
                </div>
              )}
            </div>

            <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-3 sm:gap-4">
              <button
                type="submit"
                disabled={isDisabled}
                className="inline-block border-0 bg-transparent p-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <AnimatedButton
                  topText="SEND VIA WHATSAPP"
                  bottomText="OPEN CHAT →"
                  variant="primary"
                  as="span"
                  className={isDisabled ? 'pointer-events-none' : ''}
                />
              </button>
              <button
                type="button"
                onClick={handleEmailCompose}
                disabled={isDisabled}
                className="inline-flex items-center justify-center min-h-11 px-5 py-3 rounded-full border border-border-subtle text-cream text-xs sm:text-sm font-semibold uppercase tracking-wide hover:border-accent hover:text-accent transition-colors disabled:opacity-50"
              >
                Or open in Email
              </button>
            </div>
            <p className="text-xs text-muted text-center md:text-left">
              No server email required — your message opens in WhatsApp or your mail app, ready to send.
            </p>
          </form>

          <div className="mt-16 pt-12 border-t border-border-subtle flex flex-col items-center justify-center text-center w-full">
            <div className="relative w-full max-w-xs sm:max-w-sm aspect-[4/5] mb-12 mx-auto">
              <Image
                src={media('thank-you', 'hero')}
                alt="Thank you"
                fill
                sizes="(max-width: 640px) 320px, 384px"
                className="object-contain object-center"
              />
            </div>
            <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center">
              <p className="text-xs uppercase tracking-widest text-accent-light mb-3 font-mono text-center">
                Direct Contact
              </p>

              <div ref={ctaRef} className="inline-block">
                <button
                  type="button"
                  aria-label={`Copy ${site.email} to clipboard`}
                  onClick={() => {
                    navigator.clipboard.writeText(site.email);
                    setCopiedToast(true);
                  }}
                  className="group relative inline-flex items-center justify-center min-h-11 py-3 cursor-pointer text-cream font-display font-black uppercase leading-tight hover:text-accent transition-colors duration-300 max-w-full text-center"
                  style={{
                    fontSize: 'clamp(1.1rem, 4.2vw, 3rem)',
                  }}
                >
                  <span className="break-all sm:break-normal">{site.email}</span>
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out block" />
                </button>
              </div>

              <span className="font-mono text-[11px] text-muted uppercase tracking-widest mt-2 block text-center">
                Click to copy email address
              </span>

              <div className="mt-6 sm:mt-8 flex flex-col items-center justify-center gap-4">
                <SocialIconLinks
                  className="justify-center"
                  linkClassName="text-cream hover:text-accent"
                />
                <CvDownloadLink className="mt-1" />
                <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-8">
                  <a
                    href={site.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center min-h-11 py-3 font-mono text-xs uppercase tracking-widest text-cream hover:text-accent transition-colors"
                  >
                    WhatsApp · {site.whatsapp}
                  </a>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted">
                    Based in {site.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-8 right-8 z-[9998] pointer-events-none transition-all duration-300 ${
          copiedToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
        style={{
          background: 'var(--color-primary)',
          color: 'var(--green-800)',
          fontFamily: 'monospace',
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '0.75rem 1.25rem',
          borderRadius: '9999px',
        }}
      >
        ✓ Copied to clipboard
      </div>
    </section>
  );
};

export default Contact;
