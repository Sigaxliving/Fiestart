# 🎉 Fiestart – Alquiler de Stands y Accesorios para Eventos

Plataforma web moderna y receptiva para el alquiler y cotización de stands, mobiliario y accesorios para fiestas y eventos corporativos o sociales.

---

## 🚀 Características Principales

- **Catálogo Interactivo**: Filtrado por categorías (*Stands*, *Accesorios*, *Decoración*, *Mobiliario*).
- **Sistema de Autenticación**:
  - Registro e inicio de sesión de clientes por Cédula de Identidad, Correo y Contraseña.
  - Almacenamiento seguro de sesiones con soporte híbrido (Cookies + `localStorage` para compatibilidad total con protocolo `file:///` y navegadores modernos).
- **Carrito de Alquiler en Tiempo Real**:
  - Cálculo de costo por día de alquiler.
  - Contador animado y ajuste dinámico de cantidades.
- **Flujo de Solicitud de Alquiler (Checkout)**:
  - Formulario de coordinación de evento: fecha, días de alquiler, ubicación y teléfono WhatsApp.
  - Multiplicador de días y cálculo de costo estimado total en vivo.
- **Historial "Mis Pedidos"**:
  - Seguimiento del estado de las solicitudes por parte del cliente (*Pendiente*, *Confirmado*, *Entregado*, *Completado*, *Cancelado*).
- **Panel de Administración Completo (`admin.html`)**:
  - **Dashboard**: Estadísticas generales de productos, solicitudes totales y pendientes.
  - **Gestión de Pedidos**: Visualización de clientes, fechas de entrega, detalle de items y cambio de estado en tiempo real.
  - **Gestión de Productos**: Alta de nuevos productos, edición, eliminación y subida de imágenes con previsualización.
  - **Lista de Usuarios**: Registro de usuarios y clientes con items activos.

---

## 🔑 Credenciales de Acceso

### Panel de Administración
- **Acceso:** [admin.html](admin.html)
- **Usuario:** `admin`
- **Contraseña:** `admin123`

### Clientes
- Los usuarios pueden registrarse libremente desde el botón **"Registrarse"** en la página principal [index.html](index.html).

---

## 📁 Estructura del Proyecto

```text
Video mania/
├── index.html            # Portal principal para clientes
├── admin.html            # Panel de control del administrador
├── README.md             # Documentación del proyecto
├── css/
│   └── style.css         # Hoja de estilos global (Fiestart Luxury Dark & Gold)
└── js/
    ├── data.js           # Base de datos local (ProductDB, UserDB, OrderDB)
    ├── auth.js           # Lógica de autenticación y manejo de sesión
    ├── cart.js           # Gestión del carrito de compras
    ├── app.js            # Controladores de interfaz y pedidos para index.html
    └── admin.js          # Controladores y lógica del panel de administración
```

---

## 💻 Cómo Ejecutar el Proyecto

1. **Directo desde el Explorador**:
   Haz doble clic sobre `index.html` para abrir la tienda, o sobre `admin.html` para acceder al panel administrativo.
2. **Servidor Local (Opcional)**:
   Puedes abrir la carpeta en VS Code con extensiones como *Live Server* o cualquier servidor HTTP estático.
