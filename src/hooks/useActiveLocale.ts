import { useRecoilState } from "recoil"
import { DEFAULT_LOCALE } from "../constants/locales"
import { localeAtom, parseLocale } from "../state/Locale"

export function useActiveLocale() {
  const [locale, setLocale] = useRecoilState(localeAtom)
  const switchLocale = (locale: string) => {
    setLocale(parseLocale(locale) ?? DEFAULT_LOCALE)
  }

  return {
    locale,
    switchLocale,
  }
}
