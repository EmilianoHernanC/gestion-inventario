import { useStore } from "../../store"
import { useEffect } from "react"

export default function DarkModeEffect() {
    const darkMode = useStore((state) => state.darkMode)

    useEffect(() => {
        const root = document.documentElement
        if (darkMode) {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
    }, [darkMode])

    return null
}