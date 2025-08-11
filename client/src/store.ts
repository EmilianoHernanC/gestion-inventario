import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface DarkModeStore {
    darkMode: boolean
    toggleDarkMode: () => void

    language: 'es' | 'en'
    toggleLanguage: () => void
    setLanguage: (lang: 'es' | 'en') => void
}

export const useStore = create<DarkModeStore>()(
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () => 
        set((state) => (
            { darkMode: !state.darkMode }
        )),

      language: 'es',
      toggleLanguage: () =>
        set((state) => ({
          language: state.language === 'es' ? 'en' : 'es',
        })),
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'ui-store', // nombre del localStorage
    }
  )
)