import { atom ,useRecoilState } from "recoil";
import {DEFAULT_LOCALE, SupportedLocale} from "../constants/locales";

const EN_LOCALE: SupportedLocale = 'en-US'
const ZH_LOCALE: SupportedLocale = 'zh-CN'

const localeAtom = atom({
  key: "locale",
  default: DEFAULT_LOCALE,
})

export function useActiveLocale(){
  const [locale, setLocale] = useRecoilState(localeAtom)

  const toggleEnUS = () => {
    setLocale(EN_LOCALE)
  }

  const toggleZhCN = () => {
    setLocale(ZH_LOCALE)
  }

  return {
    locale,
    toggleEnUS,
    toggleZhCN
  }
}
