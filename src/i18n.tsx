import { I18nProvider } from '@lingui/react'
import { i18n } from '@lingui/core'
import { ReactNode } from 'react'

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  return (
    <I18nProvider forceRenderOnLocaleChange={false} i18n={i18n}>
      {children}
    </I18nProvider>
  )
}
