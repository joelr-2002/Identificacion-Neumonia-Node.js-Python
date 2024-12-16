const e = require('express');
const spawn = require('child_process').spawn;
var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var ultimaImagen = "";
let pythonResponse = '';

// Configuración de Multer
const storage = multer.diskStorage({
    destination: 'public/img/xray/', // Carpeta donde se guardarán las imágenes
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/guardar', upload.single('image'), (req, res) => {
    const imagePath = req.file.path;
    ultimaImagen = req.file.originalname;
    res.send(`<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="/css/stylesndjs.css">
        <title>Guardar Imagen</title>
        </head>
    <body>
        <div class="container">
            <div class="message">
                <h1>Imagen Guardada con Éxito</h1>
                <p>La imagen se ha guardado correctamente en ${imagePath}.</p>
            </div>
            <form action="/deteccion.html" method="get"><button class="btn" type="submit">Regresar</button></form>
        </div>
    </body>` );
    //Envia un boton para regresar a la pagina principal
    //res.send('<form action="/" method="get"><button type="submit">Regresar</button></form>');
    req.session.lastImage = imagePath; // Guardar la ruta en la sesión
});

app.get('/cargarultimaImagen', (req, res) => {
    if (ultimaImagen == "") {
        res.send("No hay imagen");
    }
    else{
        res.send(ultimaImagen);
    }
});

app.get('/deteccion', (req, res) => {
    let rutaImagen = "C:/xampp/htdocs/ProyectoIA/public/img/xray/";
    rutaImagen = rutaImagen + ultimaImagen;
    rutaImagen = rutaImagen.replace(/"/g, '');

    const clearConsoleCommand = process.platform === 'win32' ? 'cls' : 'clear'; // Comando para limpiar en Windows y en otros sistemas
    require('child_process').execSync(clearConsoleCommand, { stdio: 'inherit' });

    const pythonScriptPath = 'C:/xampp/htdocs/ProyectoIA/python/test.py';
    const pythonProcess = spawn('python', [pythonScriptPath]);

    pythonProcess.stdin.write(rutaImagen);
    pythonProcess.stdin.end();


    pythonProcess.stdout.on('data', function(data) {
        pythonResponse += data.toString();
        console.log(pythonResponse);
    });

    pythonProcess.stderr.on('data', function(data) {
        console.error(data.toString());
    });

    pythonProcess.on('close', function(code) {
        console.log(`Proceso de Python finalizado con código ${code}`);
        res.send(pythonResponse);
    });
});

app.get('/entrenamiento', (req, res) => {
    const pythonScriptPath = 'C:/xampp/htdocs/ProyectoIA/python/app.py';
    const pythonProcess = spawn('python', [pythonScriptPath]);

    const clearConsoleCommand = process.platform === 'win32' ? 'cls' : 'clear'; // Comando para limpiar en Windows y en otros sistemas
    require('child_process').execSync(clearConsoleCommand, { stdio: 'inherit' });

    res.setHeader('Content-Type', 'text/plain');

    pythonProcess.stdin.write("Kevin");
    pythonProcess.stdin.end();

    pythonProcess.stdout.on('data', function(data) {
        const output = data.toString();
        console.log(output);
        res.write(output);
    });

    

    pythonProcess.stderr.on('data', function(data) {
        const errorOutput = data.toString();
        console.error(data.toString());
        res.write(errorOutput);
    });

    pythonProcess.on('close', function(code) {
        console.log(`Proceso de Python finalizado con código ${code}`);
        res.end(); // Enviar la respuesta al cliente aquí, después de que el proceso de Python haya finalizado
    });

    app.get('/detenerEntrenamiento', (req, res) => {
        pythonProcess.kill();
        res.send('Entrenamiento detenido');
    });
    
});

app.listen(8888, function() {
    console.log('Servidor en funcionamiento en el puerto 8888');
});