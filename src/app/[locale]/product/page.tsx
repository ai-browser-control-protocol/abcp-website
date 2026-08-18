/**
 * Alias of the locale home. Sends crawlers and users to the canonical /{locale}.
 */
import { redirect } from "next/navigation";

export default async function ProductAliasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}`);
}
