# Sitio de Películas 🎬

Este proyecto simple muestra una colección de películas populares utilizando la API de The Movie Database (TMDb). El sitio implementa una carga infinita de películas a medida que el usuario se desplaza por la página.

![Preview Image](./assets/preview.gif)

## Características

- Muestra una cuadrícula de películas populares con sus pósters y títulos.
- **Carga infinita configurable**:
  - **'auto'**: Automática, las películas se cargan automáticamente al llegar al final de la página.
  - **'button'**: Botón de Cargar Más, permite al usuario cargar manualmente más películas.
  - **'none'**: Visualización sin carga adicional para maximizar la velocidad de carga inicial.
- Diseño responsivo que se adapta a diferentes tamaños de pantalla.
- Efecto de zoom en las imágenes de los pósters al pasar el cursor.

## Tecnologías Utilizadas

- HTML5
- CSS3 (con Tailwind CSS)
- JavaScript (ES6+)
- Fetch API para realizar peticiones a la API de TMDb
- Intersection Observer API para implementar la carga infinita

## Estructura del Proyecto

- `index.html`: Archivo principal que contiene la estructura HTML del sitio.
- `js/app.js`: Contiene la lógica JavaScript para cargar las películas y manejar la carga infinita.

## Configuración

1. Clona este repositorio en tu máquina local.
2. Abre el archivo `index.html` en tu navegador web.

## Uso de la API

Este proyecto utiliza la API de The Movie Database (TMDb). Para que funcione correctamente, necesitarás obtener una API key de TMDb y reemplazarla en el archivo `app.js`:

```javascript
const API_KEY = 'TU_API_KEY_AQUI';
```

https://www.themoviedb.org/settings/api

## Personalización

Puedes personalizar el aspecto del sitio modificando las clases de Tailwind CSS en el archivo `index.html` o añadiendo tus propios estilos.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir qué te gustaría cambiar.

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)
