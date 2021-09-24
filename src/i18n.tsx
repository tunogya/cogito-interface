import { FC, useEffect } from 'react'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { en, cs } from 'make-plural/plurals'
import {detect, fromNavigator, fromStorage, fromUrl} from "@lingui/detect-locale";

export const locales = {
  "en-US": "English",
  "zh-CN": "简体中文",
};

const DEFAULT_FALLBACK = () => 'en-US'
export const defaultLocale = detect(fromUrl('lang'), fromStorage('lang'), fromNavigator(), DEFAULT_FALLBACK) || 'en-US'

i18n.loadLocaleData({
  "en-US": { plurals: en },
  "zh-CN": { plurals: cs },
})

const LanguageProvider: FC = ({ children }) => {
  return <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>{children}</I18nProvider>
}

export default LanguageProvider
