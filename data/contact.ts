const phone = "+91 98765 43210";
const whatsapp = "919876543210";
const whatsappMessage = "Hi Astrix, I'd like to talk about a project.";

export const contact = {
  email: "hello@astrixmediyeah.com",
  phone,
  phoneHref: `tel:${phone.replace(/[^\d+]/g, "")}`,
  whatsapp,
  whatsappHref: `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`,
  address: "Remote-first studio · Bengaluru, India",
  hours: "Mon–Fri · 10:00–19:00 IST",
  instagram: "https://instagram.com/astrixmediyeah",
  linkedin: "https://linkedin.com/company/astrixmediyeah",
  facebook: "https://facebook.com/astrixmediyeah",
  socials: [
    { label: "Instagram", href: "https://instagram.com/astrixmediyeah" },
    { label: "LinkedIn", href: "https://linkedin.com/company/astrixmediyeah" },
    { label: "Facebook", href: "https://facebook.com/astrixmediyeah" },
  ],
} as const;
