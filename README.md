# Spike

Aplicación Android híbrida que combina **Kotlin + Jetpack Compose** con **React Native (Expo)** en un mismo proyecto.

## 📋 Descripción

Este proyecto demuestra la integración de una aplicación Android nativa con un módulo de Expo/React Native. La app principal está construida con Jetpack Compose y permite navegar a vistas desarrolladas en Expo.

## 🛠️ Tecnologías

- **Android Native**: Kotlin, Jetpack Compose, Material 3
- **React Native**: Expo SDK 54
- **Build System**: Gradle

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Android Studio](https://developer.android.com/studio) (versión reciente)
- [Node.js](https://nodejs.org/) (v18 o superior)
- [Yarn](https://yarnpkg.com/) o npm
- JDK 17 o superior
- Android SDK (API 34 recomendado)

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/DevPabloGarcia/Spike.git
cd Spike
```

### 2. Configurar entorno

Instala node desde [nodejs.org](https://nodejs.org/) si no lo tienes. Luego, verifica la instalación:

```bashnode -v
npm -v
```

Establecer la variable de entorno NODE_PATH con la ruta de node en tu archivo de configuración de shell (`~/.bashrc`, `~/.zshrc`, etc.):

```bash
export NODE_PATH=$(which node)
```

### 2. Instalar dependencias de Expo

Es **necesario** instalar las dependencias del módulo Expo antes de ejecutar la aplicación:

```bash
cd expolibrary/my-project
yarn install
```

O si usas npm:

```bash
cd expolibrary/my-project
npm install
```

### 3. Configurar Android

Abre el proyecto en Android Studio y deja que Gradle sincronice las dependencias automáticamente.

## ▶️ Ejecutar la Aplicación

Para ejecutar correctamente la aplicación, debes seguir estos pasos:

### 1. Levantar el servidor de Expo

Primero, inicia el servidor de desarrollo de Expo desde la carpeta `my-project`, dentro del modulo expolibrary:

```bash
cd expolibrary/my-project
yarn start
```

Deberías ver algo como:

```
Metro waiting on exp://192.168.x.x:8081
```

**⚠️ IMPORTANTE**: Mantén este servidor corriendo durante toda la sesión de desarrollo.

### 2. Ejecutar la app Android

Con el servidor de Expo corriendo, abre el proyecto en Android Studio y:

1. Selecciona tu dispositivo/emulador
2. Haz clic en **Run** (botón verde de play)

También puedes ejecutarlo desde la terminal:

```bash
# Desde la raíz del proyecto
./gradlew installDebug
```

### 3. Navegar en la aplicación

1. La app abrirá en la pantalla principal con dos botones
2. **"Ir a Android"**: Navega a una vista nativa de Compose
3. **"Ir a Expo"**: Navega a la vista desarrollada en React Native/Expo

## 📁 Estructura del Proyecto

```
Spike/
├── app/                          # Módulo Android nativo
│   ├── src/main/java/           # Código Kotlin
│   │   └── com/pablo/dev/spike/
│   │       ├── MainActivity.kt   # Pantalla principal
│   │       ├── ComposeActivity.kt # Vista Compose nativa
│   │       ├── ExpoActivity.kt   # Activity que carga Expo
│   │       └── MainApplication.kt
│   └── build.gradle             # Configuración del módulo app
├── expolibrary/
│   ├── my-project/                  # Módulo Expo/React Native
│   │   ├── assets/                  # Recursos (imágenes, iconos) 
│   │   ├── index.js                 # Entry point que registra los componentes
│   │   ├── ActivityA.js             # Componente A
│   │   ├── ActivityB.js             # Componente B
│   │   ├── app.json                 # Configuración de Expo
│   │   └── package.json             # Dependencias de Node
│   ├── src/main/java/             # Código Java/Kotlin para integración
│   │   └── com/telefonica/expolibrary/ui/
│   │       ├── ExpoActivityA.kt       # Activity para el componente A
│   │       └── ExpoActivityB.kt       # Activity para el componente B
│   └── build.gradle                 # Configuración del módulo expolibrary
│
├── build.gradle                 # Configuración raíz de Gradle
├── settings.gradle              # Configuración de módulos
└── README.md                    # Este archivo
```

## 🎨 Características de la Vista Expo

La vista de Expo incluye:

- **Toolbar personalizada** estilo Material Design
- **Botón de navegación** (flecha hacia atrás)
- **Contador interactivo** con estado
- **Tres botones de acción**:
  - Incrementar contador
  - Resetear contador
  - Mostrar alerta nativa

## 🔧 Solución de Problemas

### El servidor de Expo no conecta

Si la app Android no puede conectar con el servidor de Expo:

1. Verifica que el servidor esté corriendo (`yarn start` en `expolibrary/my-project/`)
2. Asegúrate de que el dispositivo/emulador esté en la misma red
3. Revisa que el firewall no esté bloqueando el puerto 8081

### Error al compilar Android

Si hay errores de compilación:

```bash
# Limpia el proyecto
./gradlew clean

# Sincroniza dependencias
./gradlew build --refresh-dependencies
```

### Dependencias de Node no se instalan

Si `yarn install` falla:

```bash
# Elimina node_modules y el lock file
cd expolibrary/my-project
rm -rf node_modules
rm package-lock.json  # o yarn.lock

# Reinstala
yarn install
```

## 📱 Compatibilidad

- **Android**: API 24+ (Android 7.0 Nougat o superior)
- **Expo SDK**: 54.x
- **React**: 19.1.0
- **React Native**: 0.81.5

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👤 Autor

**Pablo García**

- GitHub: [@DevPabloGarcia](https://github.com/DevPabloGarcia)
- Repositorio: [Spike](https://github.com/DevPabloGarcia/Spike)

---

⭐ Si este proyecto te resultó útil, considera darle una estrella en GitHub
