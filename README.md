# 📦 Gestión de Inventario

**Gestión de Inventario** es una aplicación Fullstack desarrollada con TypeScript, React y Express, orientada al control completo de productos, stock, movimientos y alertas. Ideal para talleres mecánicos, ferreterías, casas de repuestos o cualquier negocio que necesite una gestión clara del inventario.

---

## 🚀 Tecnologías

### 🖥️ Frontend
- ⚛️ [React](https://reactjs.org/)
- 🟦 [TypeScript](https://www.typescriptlang.org/)
- 💨 [Tailwind CSS](https://tailwindcss.com/) – estilos modernos y responsivos
- 🎞️ [Framer Motion](https://www.framer.com/motion/) – animaciones
- 🎨 [Lucide React](https://lucide.dev/) – iconografía SVG elegante

### 🔧 Backend
- 🟨 [Node.js](https://nodejs.org/)
- ⚙️ [Express](https://expressjs.com/)
- 🐘 [PostgreSQL](https://www.postgresql.org/)
- 🧬 [Sequelize + Sequelize TypeScript](https://sequelize.org/)
- 📄 [Swagger](https://swagger.io/) – documentación de la API
- ✅ Validación con [`valibot`](https://valibot.dev/)

---

## ✅ Funcionalidades

- ➕ Crear, editar y eliminar productos
- 💰 Asignar precio, stock inicial y mínimo
- 🔁 Registrar movimientos de stock: entrada, salida y ajustes
- ⚠️ Alertas automáticas por stock bajo
- 📊 Dashboard de movimientos recientes
- 🔍 Filtros por nombre y categorías (en progreso)
- 📈 (Próximamente) Reportes de productos más vendidos, valor total del inventario, etc.
- 🧩 (Próximamente) Categorización por tipo de producto, marca, modelo/año
- 📱 (Próximamente) Escáner de código de barras

---

## 📁 Estructura

```
gestion-inventario/
├── server/         ← Backend (Express + Sequelize)
│   ├── config/     ← Base de datos y Swagger
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── scripts/    ← Script para borrar DB: clear.ts
│   ├── index.ts
├── client/         ← Frontend (React + Tailwind)
│   ├── components/
│   ├── views/
│   ├── services/
│   ├── types/
│   ├── main.tsx
```

---

## 🛠️ Instalación y Uso

### 1. Clonar repositorio

```bash
git clone https://github.com/tu-usuario/gestion-inventario.git
cd gestion-inventario
```

### 2. Variables de entorno

Crear un archivo `.env` dentro de `/server`:

```env
DATABASE_URL=postgres://usuario:contraseña@localhost:5432/inventario
FRONTEND_URL=http://localhost:5173
```

### 3. Instalar dependencias

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd ../client
npm install
```

---

## 📦 Scripts útiles

Desde la carpeta `server/`:

```bash
npm run dev       # Levanta servidor en localhost:3000
npm run clear     # Borra y recrea la base de datos (⚠️ elimina los datos)
```

Desde la carpeta `client/`:

```bash
npm run dev       # Levanta la app en localhost:5173
```

---

## 🔗 Endpoints REST (resumen)

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET`  | `/api/products`          | Listar productos |
| `POST` | `/api/products`          | Crear nuevo producto |
| `PUT`  | `/api/products/:id`      | Editar producto |
| `DELETE` | `/api/products/:id`    | Eliminar producto |
| `POST` | `/api/stock`             | Crear movimiento (entrada, salida, ajuste) |
| `GET`  | `/api/stock`             | Listar todos los movimientos |
| `GET`  | `/api/stock/:productId`  | Ver movimientos por producto |
| `GET`  | `/api/stock/alertas`     | Ver productos con stock bajo |

Documentación interactiva disponible en:  
📚 `http://localhost:3000/docs`

---

## 🧠 Roadmap (Futuro)

- [ ] Buscador de productos por nombre o categoría
- [ ] Panel de reportes: productos más vendidos, movimientos por fecha, stock valorizado
- [ ] Categorización avanzada: motor, eléctrico, suspensión, etc.
- [ ] Escaneo de código de barras desde el celular
- [ ] Exportar movimientos o stock a Excel / PDF
- [ ] UI mobile-first mejorada

---

## 🧑‍💻 Autor

Creado por **Emiliano Cortez**  
Proyecto educativo y funcional para aprender Fullstack con TypeScript + PostgreSQL.

---

## 🌐 Enlaces útiles

- [Lucide Icons](https://lucide.dev/icons)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Sequelize Docs](https://sequelize.org/)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)

---
