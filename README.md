# Pneumonia Detection Application

## Descripción del Proyecto
Este proyecto es una aplicación Node.js que sirve HTMLs estáticos, carga imágenes e integra un modelo de Detección de Neumonía utilizando Python para el entrenamiento y análisis de imágenes.

## Badges
![Node.js](https://img.shields.io/badge/Node.js-v14%2B-green)
![Python](https://img.shields.io/badge/Python-3.8%2B-blue)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

## Estructura del Proyecto
```
project-root/
│
├── public/
    ├── css/
        ├── styles.css
        └── stylesndjs.css
    ├── img/
        └── #imagenes varias para informacion.html y para la carga de imágenes
    ├── js/
        ├── all.js
        └── script.js
    ├── deteccion.html
    ├── entrenamiento.html
    ├── index.html
    └── informacion.html
├── uploads/
    └── # Aquí se subirán las imágenes a comparar
├── python/
    ├── chest_xray/
        ├── train/
            ## AQUÍ IRÁ EL DATASET DE IMÁGENES PARA ENTRENAR EL MODELO ##
        └── test/
            ## AQUÍ IRÁ EL DATASET DE IMÁGENES PARA QUE EL MODELO DETERMINE SU EFICACIA ##
    ├── requirements.txt
    ├── app.py
    └── test.py
├── index.js
├── package.json
└── package-lock.json
```

## Configuración del Proyecto Node.js

### Requisitos
- Node.js (versión 14 o superior)
- npm

### Instalación de Dependencias de Node.js
```bash
# Navegar al directorio del proyecto Node.js
cd Identificacion-Neumonia-Node.js-Python

# Instalar dependencias
npm install
```

## Proyecto de Python

### Requisitos previos
- Python 3.8 o superior
- pip
- virtualenv (opcional pero recomendado)

### Configuración del Entorno Virtual

1. **Crear un entorno virtual**
   ```bash
   # Navegar a la carpeta python
   cd python
   
   # Crear entorno virtual
   python -m venv venv
   ```

2. **Activar el entorno virtual**
   ```bash
   # En macOS/Linux
   source venv/bin/activate
   
   # En Windows
   .\venv\Scripts\activate
   ```

3. **Instalar dependencias**
   ```bash
   # Instalar dependencias de Python
   pip install -r requirements.txt
   ```

### Ejecución del Proyecto Python

### Recuerde colocar el dataset de imágenes en **python/chest_xray/train** y **python/chest_xray/test**
Deben ser imágenes de buena calidad, ya que estas luego serán redimensionadas a 244x244 para poder entrenar lo más rápido y "preciso" el modelo.

#### Entrenamiento del Modelo
```bash
# Ejecutar script de entrenamiento
python app.py
```

#### Pruebas con Imágenes
```bash
# Ejecutar pruebas de detección
python test.py
```

## Mantenimiento de Dependencias

### Actualizar requirements.txt
```bash
# Generar requirements.txt con dependencias actuales
pip freeze > requirements.txt
```

## Desactivar Entorno Virtual
```bash
# Salir del entorno virtual
deactivate
```

## Licencia
Este proyecto está bajo Licencia MIT.
