# ✅ Problemas Resueltos - Expo Integration

## Resumen de Cambios

### 1. ✅ Imports no encontrados (expo.modules.*)
**Problema:** `Unresolved reference 'expo'`

**Solución aplicada:**
- Añadido `implementation project(':expo')` en `app/build.gradle`
- Esto hace disponibles las clases `expo.modules.ApplicationLifecycleDispatcher` y `expo.modules.ReactNativeHostWrapper`

### 2. ✅ Error de tema AppCompat
**Problema:** `You need to use a Theme.AppCompat theme (or descendant)`

**Solución aplicada:**
- Cambiado el tema en `app/src/main/res/values/themes.xml`:
  ```xml
  <style name="Theme.Spike" parent="Theme.AppCompat.DayNight.NoActionBar" />
  ```
- **PENDIENTE MANUAL:** Añadir en `app/build.gradle`:
  ```groovy
  implementation "androidx.appcompat:appcompat:1.7.0"
  ```

### 3. ✅ "main" has not been registered
**Problema:** El componente React Native no se encontraba

**Causa:** Metro bundler de Expo no estaba corriendo

**Solución aplicada:**
- ✅ Metro bundler iniciado en puerto 8081
- ✅ Port forwarding configurado: `adb reverse tcp:8081 tcp:8081`
- ✅ Script helper creado: `start-expo-metro.sh`
- ✅ Documentación creada: `EXPO_DEVELOPMENT.md`

## 🎯 Estado Actual

### ✅ Funcionando
- MainApplication.kt con Expo modules integrado
- ReactNativeHost configurado con entry point correcto
- Metro bundler corriendo en puerto 8081
- Port forwarding configurado para emulador
- Tema AppCompat configurado

### ⚠️ Acción Requerida (Manual)

**Debes añadir en `app/build.gradle`:**

```groovy
dependencies {
    implementation("com.facebook.react:react-android")
    implementation("com.facebook.react:hermes-android")
    implementation project(':expo')
    implementation "androidx.appcompat:appcompat:1.7.0"  // ← AÑADIR ESTA LÍNEA
    implementation libs.androidx.core.ktx
    // ... resto de dependencias
}
```

Sin esta dependencia, puede fallar en runtime con el error de tema AppCompat.

## 🚀 Cómo Usar

### Desarrollo (Metro bundler requerido)

**Cada vez que vayas a trabajar con Expo:**

1. **Inicia Metro bundler** (en una terminal separada):
   ```bash
   ./start-expo-metro.sh
   ```
   O manualmente:
   ```bash
   cd my-project && npx expo start
   ```

2. **Configura port forwarding** (si reinicias emulador):
   ```bash
   adb reverse tcp:8081 tcp:8081
   ```

3. **Ejecuta la app** desde Android Studio o:
   ```bash
   ./gradlew installDebug
   ```

4. **Navega a Expo** desde la MainActivity

### Producción (Bundle empaquetado)

Para crear un APK sin necesidad de Metro:

```bash
cd my-project
npx expo export:embed
cd ..
./gradlew assembleRelease
```

## 📱 Flujo de la App

```
MainActivity (Jetpack Compose)
  ↓
  [Botón "Ir a Expo"]
  ↓
ExpoActivity (React Native)
  ↓
  Carga componente "main"
  ↓
  my-project/App.js (Expo)
```

## 🔧 Troubleshooting

### Metro no conecta
```bash
# Verificar que Metro está corriendo
lsof -i :8081

# Reconfigurar port forwarding
adb reverse tcp:8081 tcp:8081

# Reiniciar Metro
pkill -f "expo start"
./start-expo-metro.sh
```

### Cambios no se reflejan
- Presiona `r` en la terminal de Metro
- O agita el dispositivo → "Reload"
- O presiona `Ctrl+M` en emulador → "Reload"

### Error de compilación AppCompat
- Añade la dependencia `appcompat:1.7.0` en build.gradle
- Sync Gradle
- Clean + Rebuild

## 📝 Archivos Importantes

- `app/build.gradle` - Dependencias del proyecto
- `app/src/main/java/.../MainApplication.kt` - Configuración ReactNativeHost
- `app/src/main/java/.../ExpoActivity.kt` - Activity de React Native
- `my-project/index.js` - Entry point que registra "main"
- `my-project/App.js` - Componente principal de Expo
- `start-expo-metro.sh` - Script helper para iniciar Metro
- `EXPO_DEVELOPMENT.md` - Guía completa de desarrollo

## ✨ Próximos Pasos

1. ✅ Añadir `appcompat:1.7.0` en build.gradle
2. ✅ Sync Gradle
3. ✅ Rebuild project
4. ✅ Ejecutar `./start-expo-metro.sh`
5. ✅ Lanzar la app y probar navegación a Expo

---

**Nota:** Mantén el Metro bundler corriendo en una terminal separada mientras desarrollas. Es normal que consuma CPU/memoria durante el desarrollo.

