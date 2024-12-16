const uploadForm = document.getElementById("upload-form");
const imageInput = document.getElementById("image-input");
const imageContainer = document.getElementById("image-container");

imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const imageURL = URL.createObjectURL(file);
    imageContainer.innerHTML = `<img src="${imageURL}" alt="Preview">`;
});

function mostrarUltimaImagen() {
    document.getElementById('mostrarImagen').addEventListener('click', async () => {
        try {
            const response = await axios.get('/cargarultimaImagen'); // Cambia la ruta según tu configuración
            const imageName = response.data;
            const imageURL = `/img/xray/${imageName}`;
            document.getElementById('image-container').innerHTML = `<img src="${imageURL}" alt="Preview">`;
        } catch (error) {
            console.error('Error al cargar la imagen:', error);
        }
    });
}

function iniciarDeteccion() {
    const loadingDiv = document.getElementById('loading');
    const mensajeDiv = document.getElementById('mensaje');

    document.getElementById('iniciarDeteccion').addEventListener('click', async () => {
        try {
            document.getElementById('resultado').innerHTML = '';
            loadingDiv.style.display = 'block';

            const response = await axios.get('/deteccion');
            const result = response.data;
            document.getElementById('resultado').innerHTML = result;

            if (result.includes('La persona esta sana')) {
                mensajeDiv.innerHTML = '<div class="mensaje-ovalo mensaje-salud">Paciente Saludable.</div>';
            } else if (result.includes('La persona tiene Neumonia')) {
                mensajeDiv.innerHTML = '<div class="mensaje-ovalo mensaje-neumonia">Tiene neumonía.</div>';
            } else {
                mensajeDiv.innerHTML = '<div class="mensaje-ovalo mensaje-generico">No se pudo determinar el resultado.</div>';
            }

        } catch (error) {
            console.error('Error al cargar la imagen:', error);
        } finally{
            loadingDiv.style.display = 'none';
        }
    });
}

function iniciarEntrenamiento(){
    const loadingDiv = document.getElementById('loading');
    const resultadoDiv = document.getElementById('Layer1');
    const iniciarBtn = document.getElementById('iniciarEntrenamiento')


    iniciarBtn.addEventListener('click', async () => {
        try {
            
            // Mostrar el ícono de carga
            loadingDiv.style.display = 'block';
            
            const response = await fetch('/entrenamiento'); // Cambia la ruta según tu configuración
            const reader = response.body.getReader();
            
            resultadoDiv.innerHTML = ''; // Limpiar el contenido existente
            
            let asciiNumbers = ''; // Almacenar números ASCII
            
            while (true) {
                const { done, value } = await reader.read();
                
                if (done) {
                    break;
                }
                
                const valueString = new TextDecoder().decode(value); // Convertir bytes a cadena
                
                resultadoDiv.innerHTML += valueString;
                
                // Recopilar números ASCII
                asciiNumbers += valueString;
            }
            
            // Decodificar y mostrar en el console
            const decodedText = decodeAsciiNumbersToText(asciiNumbers);
            console.log(decodedText);
        } catch (error) {
            console.error('Error al cargar la imagen:', error);
        } finally {
            iniciarBtn.disabled = false; // Habilitar el botón después de cargar
            loadingDiv.style.display = 'none'; // Ocultar el ícono de carga
        }
    });
}

async function detenerEntrenamiento() {
    try {
        const response = await fetch('/detenerEntrenamiento', { method: 'GET' });
        const data = await response.text();
        console.log(data); // Mostrar mensaje de respuesta en la consola
    } catch (error) {
        console.error('Error al detener el entrenamiento:', error);
    }
}