const fs = require('fs');
const readline = require('readline');

const FILE_PATH = 'tasks.txt';

function showMenu() {
    console.log('\n=== Lista de Tareas ===');
    console.log('1. VER tareas');
    console.log('2. Agregar tarea');
    console.log('3. Marcar tarea como completada');
    console.log('4. Salir');
}

function displayTasks() {
    const tasks = loadTasks();
    console.log('\n=== Tareas Pendientes ===');
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task}`);
    });
}

function addTask(task) {
    const tasks = loadTasks();
    tasks.push(task);
    saveTasks(tasks);
    console.log('Tarea agregada correctamente.');
}

function completeTask(index) {
    const tasks = loadTasks();
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        saveTasks(tasks);
        console.log('Tarea marcada como completada.');
    } else {
        console.log('Índice de tarea inválido.');
    }
}

function loadTasks() {
    try {
        const data = fs.readFileSync(FILE_PATH, 'utf8');
        return data.split('\n').filter(task => task.trim() !== '');
    } catch (error) {
        return [];
    }
}

function saveTasks(tasks) {
    fs.writeFileSync(FILE_PATH, tasks.join('\n'));
}

function startApp() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    showMenu();

    rl.on('line', (input) => {
        switch (input.trim()) {
            case '1':
                displayTasks();
                break;
            case '2':
                rl.question('Ingrese la nueva tarea: ', (task) => {
                    addTask(task);
                    showMenu();
                });
                break;
            case '3':
                rl.question('Ingrese el número de la tarea completada: ', (index) => {
                    completeTask(parseInt(index) - 1);
                    showMenu();
                });
                break;
            case '4':
                rl.close();
                break;
            default:
                console.log('Opción no válida. Por favor, ingrese un número del 1 al 4.');
                break;
        }
    });
}

startApp();
