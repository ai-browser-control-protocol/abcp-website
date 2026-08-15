/**
 * Typed message catalogs loaded on the server for view models.
 */
import type { Locale } from "@/content/types";
import en from "@/messages/en.json";
import ja from "@/messages/ja.json";
import ko from "@/messages/ko.json";
import zh from "@/messages/zh.json";

export type Messages = typeof zh;

const catalogs: Record<Locale, Messages> = { zh, ja, ko, en };

export function getMessages(locale: Locale): Messages {
  return catalogs[locale] ?? catalogs.zh;
}
