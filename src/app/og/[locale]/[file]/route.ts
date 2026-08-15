/**
 * Serves replaceable 1200×630 social images at /og/{locale}/{chapter}.png.
 */
import { CHAPTER_IDS, LOCALES, type ChapterId, type Locale } from "@/content/types";
import { createOgImage } from "@/features/seo/createOgImage";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    CHAPTER_IDS.map((chapter) => ({ locale, file: `${chapter}.png` })),
  );
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ locale: string; file: string }> },
) {
  const { locale, file } = await context.params;
  const chapter = file.replace(/\.png$/, "") as ChapterId;
  if (!LOCALES.includes(locale as Locale) || !CHAPTER_IDS.includes(chapter)) {
    return new Response("Not found", { status: 404 });
  }
  return createOgImage(locale as Locale, chapter);
}
