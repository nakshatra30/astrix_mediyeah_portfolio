const phone = "+91 81227 41819";
const whatsapp = "918122741819";
const whatsappMessage = "Hi Astrix, I'd like to talk about a project.";
const instagram = "https://www.instagram.com/astrix.mediyeah/";

export const contact = {
  email: "astrix.media@gmail.com",
  phone,
  phoneHref: `tel:${phone.replace(/[^\d+]/g, "")}`,
  whatsapp,
  whatsappHref: `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`,
  address: "Remote-first studio · Bengaluru, India",
  hours: "Mon–Fri · 10:00–19:00 IST",
  instagram,
  socials: [{ label: "Instagram", href: instagram }],
} as const;
