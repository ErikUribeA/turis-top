# TurisTop 🚀

¡Bienvenido a **TurisTop**! Este proyecto es una plataforma diseñada para facilitar la exploración y el turismo permitiendo así el lujo de conocer lugares mágicos de Antioquia.
---

## 🎯 Objetivo

El objetivo principal de TurisTop es brindar a los usuarios una experiencia única para descubrir y visitar destinos turísticos, ofreciendo información detallada, reseñas y recomendaciones personalizadas.

---

## 📦 ¿De qué se trata?

TurisTop es una aplicación web desarrollada con tecnologías como Next.js para el frontend, Prisma como ORM para la gestión de la base de datos, y Docker para la contención de la información en el entorno de desarrollo. La plataforma permite explorar destinos turísticos y obtener más detalles del mismo por medio de la interacción con TurisBot , un chatbot que brinda información y recomendaciones personalizadas a los usuarios.

---

## 🛠️ Tecnologías utilizadas

- **Frontend**: [Next.js]
- **Backend**: [Next.js API Routes]
- **Base de datos**: [Prisma]+ [PostgreSQL]
- **Containerización**: [Docker]

---

## 🗂️ Estructura del proyecto

turis-top/
├── 🗂️ ¡18n/ #Configuración general de idiomas
├── 🗂️ languaje/ #Diccionario de traducción
├── prisma/ # Configuración y modelos de Prisma
├── 🗂️public/ # Archivos estáticos 
|    ├── 🗂️Images/ #Imagenes de proyecto
├── 🗂️src/ 
|    ├── 🗂️app/ # Configuración de la aplicación
|            🗂️├──api/ # Endpoints de la API y lógica
|            🗂️├──assistant/ # Configuración y página de la asistente
|                ├── auth-provider.tsx/ # Configuración que envuelve la aplicación
|                ├── Home.module.scss/ # Estilos globales de scss
|                ├── layout/ # Llamado al provider e información de la página
|                ├── page.tsx/ # Información de la página principal
|    ├── 🗂️components/ #Componentes reutilizables
|    ├── 🗂️context/ #Configuración del tema 'light' | 'dark'
|    ├── 🗂️lib/ # Conexión el login por medio de la cuenta de google
├── styles/ # Estilos globales y módulos CSS
├── .docker/ # Configuración de Docker
├── .gitignore/ # Configuraciones de GitHub 
├── .env/ # variables de entorno
├── docker-compose.yml # Configuración de Docker Compose
├── package.json # Dependencias del proyecto
└── README.md # Presentación del proyecto

---

## 👥 Participantes

- Luisa Fernanda Ramirez
- Alejandro Echavarria 
- Erik Uribe
- Maria Isabel Vanegas


---

## 🚀 Cómo ejecutar el proyecto

Sigue estos pasos para correr TurisTop en tu máquina local:

### Requisitos previos

- [Node.js](v16 o superior)
- [Docker] (opcional, pero recomendado)
- [PostgreSQL]

### Pasos

1. Clona el repositorio:
   ```bash
   git clone https://github.com/ErikUribeA/turis-top.git
   cd turis-top
2. Instala las dependencias:

-npm install

3. Inicia la base de datos (con Docker):

-docker-compose up -d

4. Ejecuta las migraciones de Prisma:

-npx prisma migrate dev --name init

5. Inicia el servidor de desarrollo:

-npm run dev

6. Una vez ejecutado el comando anterior en la consola aparece el siguiente puerto: 

http://localhost:3000 click para abrirlo en el navegador.

### ¡Listo para tener una experiencia única!🚀

