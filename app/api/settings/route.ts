import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { settingsSchema } from "@/lib/validations";
import { SETTING_DEFINITIONS, getSiteSettings } from "@/lib/settings";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized.", 401);

    const settings = await getSiteSettings();
    return jsonOk(settings);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized.", 401);

    const body = await request.json();
    const { settings } = settingsSchema.parse(body);

    const byKey = new Map(SETTING_DEFINITIONS.map((item) => [item.key, item]));
    const updates = Object.entries(settings).filter(([key]) => byKey.has(key));

    if (!updates.length) {
      return jsonError("No valid settings supplied.", 400);
    }

    await prisma.$transaction(
      updates.map(([key, value]) => {
        const definition = byKey.get(key)!;
        return prisma.siteSetting.upsert({
          where: { key },
          create: {
            key,
            value,
            label: definition.label,
            group: definition.group,
            type: definition.type,
          },
          update: { value },
        });
      }),
    );

    const saved = await getSiteSettings();
    return jsonOk(saved);
  } catch (error) {
    return handleApiError(error);
  }
}
