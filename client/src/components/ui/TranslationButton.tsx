import { useStore } from "../../store"
export default function TranslationButton() {
    const toggleLanguage= useStore(state=> state.toggleLanguage)
    const language= useStore (state=> state.language)

  return (
    <button
        onClick={toggleLanguage}
        className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-800 text-sm font-medium text-gray-800 dark:text-gray-100"
        >
        {language === 'es' ? 'English' : 'Español'}
    </button>
  )
}
