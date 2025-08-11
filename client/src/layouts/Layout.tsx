import { Outlet } from "react-router-dom"
import logo from '../assets/logo.png';
import DarkModeButton from "../components/ui/DarkModeButton";
import DarkModeEffect from "../components/ui/DarkModeEffect";
import TranslationButton from "../components/ui/TranslationButton";
import { useTranslation } from "../hooks/TranslationHook";

export const Layout = () => {

  const t= useTranslation();

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300`}>
      {/* Componente para aplicar el dark mode */}
      <DarkModeEffect />
      {/* Header Mejorado */}
      <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-2xl relative overflow-hidden">
        {/* Patrón de fondo decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            {/* Logo y título */}
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-full p-2 transition-colors duration-300">
                  <img 
                    src={logo} 
                    alt="Logo Repuestos Automotrices" 
                    className="h-16 w-16 object-contain hover:scale-110 transition-transform duration-300" 
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <h1 className="text-3xl font-bold text-white leading-tight">
                  {t.header.title}
                </h1>
                <p className="text-green-300 dark:text-green-400 text-sm font-medium">
                  {t.header.subtitle}
                </p>
                <div className="flex items-center space-x-4 text-xs text-gray-300 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>{t.header.sections.autos}</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>{t.header.sections.motos}</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span>{t.header.sections.repuestos}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Indicadores del sistema */}
            <div className="hidden md:flex items-center space-x-4">
              <DarkModeButton />
              <TranslationButton />
              <div className="flex items-center space-x-2 bg-green-600 bg-opacity-20 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300 dark:text-green-400 text-sm font-medium">{t.header.systemActive}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-300 dark:text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">
                  {new Date().toLocaleDateString(t.header.dateFormat, { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Barra decorativa inferior */}
        <div className="h-1 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600"></div>
      </header>

      {/* Navegación breadcrumb */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            </svg>
            <span className="font-medium">{t.nav.dashboard}</span>
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <span>{t.nav.inventory}</span>
          </nav>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="relative">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-gray-900 text-white mt-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src={logo} 
                  alt="Logo" 
                  className="h-8 w-8 object-contain" 
                />
                <h3 className="text-lg font-semibold">{t.header.title}</h3>
              </div>
              <p className="text-gray-400 dark:text-gray-300 text-sm">
                {t.footer.description}
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-3 text-green-400 dark:text-green-300">{t.footer.specialtiesTitle}</h4>
              <ul className="space-y-2 text-sm text-gray-400 dark:text-gray-300">
                <li>{t.footer.specialties.autos}</li>
                <li>{t.footer.specialties.motos}</li>
                <li>{t.footer.specialties.accesorios}</li>
                <li>{t.footer.specialties.lubricantes}</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-3 text-green-400 dark:text-green-300">{t.footer.systemTitle}</h4>
              <ul className="space-y-2 text-sm text-gray-400 dark:text-gray-300">
                <li>• {t.footer.system.inventario}</li>
                <li>• {t.footer.system.productos}</li>
                <li>• {t.footer.system.reportes}</li>
                <li>• {t.footer.system.interfaz}</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 dark:border-gray-600 mt-8 pt-6 text-center text-sm text-gray-400 dark:text-gray-300">
            <p>&copy; 2025 {t.header.title}. {t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}