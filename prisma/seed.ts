import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/password";
import {
  FALLBACK_PROJECTS,
  FALLBACK_SERVICES,
  FALLBACK_TESTIMONIALS,
} from "../lib/fallback";
import { SETTING_DEFINITIONS } from "../lib/settings";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME?.trim() || "Astrix Admin";

  if (!email || !password || password.length < 8) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD (8+ characters) are required to seed the admin user.",
    );
  }

  const passwordHash = await hashPassword(password);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: { name },
    create: { email, name, passwordHash, role: "ADMIN" },
  });

  console.log(`✓ Admin ready: ${admin.email}`);

  for (const service of FALLBACK_SERVICES) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: {
        title: service.title,
        slug: service.slug,
        shortDescription: service.shortDescription,
        description: service.description,
        icon: service.icon,
        features: service.features,
        imageUrl: service.imageUrl,
        price: service.price,
        featured: service.featured,
        order: service.order,
        published: true,
      },
    });
  }

  const services = await prisma.service.findMany({
    select: { id: true, slug: true },
  });
  const serviceBySlug = new Map(services.map((s) => [s.slug, s.id]));
  console.log(`✓ Services: ${services.length}`);

  for (const project of FALLBACK_PROJECTS) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: {
        title: project.title,
        slug: project.slug,
        client: project.client,
        category: project.category,
        summary: project.summary,
        description: project.description,
        imageUrl: project.imageUrl,
        gallery: project.gallery,
        results: project.results,
        liveUrl: project.liveUrl,
        year: project.year,
        featured: project.featured,
        order: project.order,
        published: true,
        serviceId: project.service
          ? serviceBySlug.get(project.service.slug) ?? null
          : null,
      },
    });
  }

  const projects = await prisma.project.findMany({
    select: { id: true, slug: true },
  });
  const projectBySlug = new Map(projects.map((p) => [p.slug, p.id]));
  console.log(`✓ Projects: ${projects.length}`);

  for (const testimonial of FALLBACK_TESTIMONIALS) {
    const existing = await prisma.testimonial.findFirst({
      where: { clientName: testimonial.clientName },
      select: { id: true },
    });
    const data = {
      clientName: testimonial.clientName,
      clientRole: testimonial.clientRole,
      company: testimonial.company,
      content: testimonial.content,
      rating: testimonial.rating,
      avatarUrl: testimonial.avatarUrl,
      featured: testimonial.featured,
      order: testimonial.order,
      published: true,
      projectId: testimonial.project
        ? projectBySlug.get(testimonial.project.slug) ?? null
        : null,
    };

    if (existing) {
      await prisma.testimonial.update({ where: { id: existing.id }, data });
    } else {
      await prisma.testimonial.create({ data });
    }
  }
  console.log(`✓ Testimonials: ${FALLBACK_TESTIMONIALS.length}`);

  for (const setting of SETTING_DEFINITIONS) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {
        label: setting.label,
        group: setting.group,
        type: setting.type,
      },
      create: {
        key: setting.key,
        label: setting.label,
        group: setting.group,
        type: setting.type,
        value: setting.defaultValue,
      },
    });
  }
  console.log(`✓ Site settings: ${SETTING_DEFINITIONS.length}`);

  const mediaCount = await prisma.media.count();
  if (mediaCount === 0) {
    await prisma.media.createMany({
      data: FALLBACK_PROJECTS.slice(0, 4).map((project) => ({
        name: `${project.title} cover`,
        url: project.imageUrl ?? "",
        alt: `${project.title} project cover image`,
        type: "image",
        uploadedById: admin.id,
      })),
    });
    console.log("✓ Sample media added");
  }

  const enquiryCount = await prisma.contactEnquiry.count();
  if (enquiryCount === 0) {
    await prisma.contactEnquiry.createMany({
      data: [
        {
          name: "Ishita Verma",
          email: "ishita@brightlane.co",
          company: "Brightlane",
          service: "Branding & Graphic Design",
          budget: "$5,000 – $10,000",
          message:
            "We are relaunching our brand in Q1 and need a comprehensive identity system plus a new marketing site. Looking for a senior team who can move quickly.",
          status: "NEW",
        },
        {
          name: "Rahul Menon",
          email: "rahul@stackline.dev",
          phone: "+91 90000 12345",
          company: "Stackline",
          service: "Website Development",
          budget: "$10,000 – $25,000",
          message:
            "Our SaaS site needs a full rebuild with better performance and a CMS our marketing team can run. Can you share relevant work?",
          status: "IN_PROGRESS",
          notes: "Call booked for Thursday 4pm IST.",
        },
      ],
    });
    console.log("✓ Sample enquiries added");
  }

  console.log("\nSeed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
