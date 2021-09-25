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

  const toggle = () => {
    setLocale(EN_LOCALE)
    if (locale === "en-US"){
      setLocale(ZH_LOCALE)
    }else{
      setLocale(EN_LOCALE)
    }
  }

  return {
    locale,
    toggle
  }
}
