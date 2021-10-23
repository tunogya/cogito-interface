import { i18n } from "@lingui/core"
import { I18nProvider } from "@lingui/react"
import { ReactNode, useEffect } from "react"
import { SupportedLocale } from "./constants/locales"

import { en, PluralCategory } from "make-plural/plurals"
import { useActiveLocale } from "./hooks/useActiveLocale"

type LocalePlural = {
  [key in SupportedLocale]: (n: number | string, ord?: boolean) => PluralCategory
}

const plurals: LocalePlural = {
  "en-US": en
}

async function dynamicActivate(locale: SupportedLocale) {
  const { messages } = await import(`@lingui/loader!./locales/${locale}.po`)
  i18n.loadLocaleData(locale, { plurals: () => plurals[locale] })
  i18n.load(locale, messages)
  i18n.activate(locale)

  if (window.localStorage) {
    window.localStorage.setItem("lang", locale)
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { locale } = useActiveLocale()

  useEffect(() => {
    dynamicActivate(locale)
  }, [locale])

  return (
    <I18nProvider forceRenderOnLocaleChange i18n={i18n}>
      {children}
    </I18nProvider>
  )
}
