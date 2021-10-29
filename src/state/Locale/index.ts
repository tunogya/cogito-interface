import {DEFAULT_LOCALE, SUPPORTED_LOCALES, SupportedLocale} from "../../constants/locales";
import {atom} from "recoil";

export function parseLocale(maybeSupportedLocale: unknown): SupportedLocale | undefined {
  if (typeof maybeSupportedLocale !== "string") return undefined
  const lowerMaybeSupportedLocale = maybeSupportedLocale.toLowerCase()
  return SUPPORTED_LOCALES.find(
    locale => locale.toLowerCase() === lowerMaybeSupportedLocale || locale.split("-")[0] === lowerMaybeSupportedLocale
  )
}

function localStorageLocale(): SupportedLocale | undefined {
  if (!window.localStorage.getItem("lang")) return undefined

  return parseLocale(window.localStorage.getItem("lang"))
}

export const initialLocale = localStorageLocale() ?? DEFAULT_LOCALE

export const localeAtom = atom({
  key: "locale",
  default: initialLocale,
})