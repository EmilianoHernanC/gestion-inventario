import { useStore } from "../store";
import { Translation } from "../components/ui/Translation";


export  function useTranslation() {
  const lang = useStore((state) => state.language)
  const t = Translation[lang]
  return t
}
