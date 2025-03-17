// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

// Array para almacenar los nombres de los amigos
const listaDeAmigos = [];

/**
 * Agrega un amigo a la lista y actualiza la UI
 */
function agregarAmigo() {
    // Obtener el input y su valor
    const inputAmigo = document.getElementById('amigo');
    const nombreAmigo = inputAmigo.value.trim();
    
    // Validar que el campo no esté vacío
    if (nombreAmigo === '') {
        alert('Por favor ingresa un nombre');
        return;
    }
    
    // Validar que no exista ya en la lista
    if (listaDeAmigos.includes(nombreAmigo)) {
        alert('Este amigo ya está en la lista');
        inputAmigo.value = '';
        return;
    }
    
    // Añadir el nombre a la lista
    listaDeAmigos.push(nombreAmigo);
    
    // Limpiar el campo de entrada
    inputAmigo.value = '';
    
    // Actualizar la lista en la UI
    actualizarListaUI();
}

/**
 * Actualiza la lista visual de amigos en la UI
 */
function actualizarListaUI() {
    const listaAmigosUI = document.getElementById('listaAmigos');
    listaAmigosUI.innerHTML = '';
    
    // Crear elementos para cada amigo
    listaDeAmigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = amigo;
        
        // Botón para eliminar amigos de la lista
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'X';
        btnEliminar.className = 'delete-button';
        btnEliminar.onclick = () => eliminarAmigo(index);
        
        li.appendChild(btnEliminar);
        listaAmigosUI.appendChild(li);
    });
}

/**
 * Elimina un amigo de la lista por su índice
 */
function eliminarAmigo(index) {
    listaDeAmigos.splice(index, 1);
    actualizarListaUI();
    
    // Limpiar resultados previos si los hay
    document.getElementById('resultado').innerHTML = '';
}

/**
 * Realiza el sorteo del amigo secreto
 */
function sortearAmigo() {
    // Verificar que haya suficientes personas para el sorteo
    if (listaDeAmigos.length < 3) {
        alert('Necesitas al menos 3 personas para realizar el sorteo');
        return;
    }
    
    // Crear una copia de la lista original para no modificarla
    const amigos = [...listaDeAmigos];
    
    // Array para guardar los resultados del sorteo
    const resultados = [];
    
    // Algoritmo Fisher-Yates para mezclar el array
    for (let i = amigos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [amigos[i], amigos[j]] = [amigos[j], amigos[i]];
    }
    
    // Asignar amigos secretos (cada persona recibe la siguiente en la lista mezclada)
    for (let i = 0; i < listaDeAmigos.length; i++) {
        const persona = listaDeAmigos[i];
        const amigoSecreto = amigos[(i + 1) % amigos.length];
        
        // Asegurarse que nadie se auto-asigne
        if (persona === amigoSecreto) {
            // Si ocurre, intercambiamos con la siguiente persona
            const siguienteIndice = (i + 2) % amigos.length;
            [amigos[i + 1], amigos[siguienteIndice]] = [amigos[siguienteIndice], amigos[i + 1]];
        }
        
        resultados.push({
            persona: persona,
            amigoSecreto: amigos[(i + 1) % amigos.length]
        });
    }
    
    // Mostrar resultados en la UI
    mostrarResultados(resultados);
}

/**
 * Muestra los resultados del sorteo en la UI
 */
function mostrarResultados(resultados) {
    const listaResultados = document.getElementById('resultado');
    listaResultados.innerHTML = '';
    
    resultados.forEach(par => {
        const li = document.createElement('li');
        li.textContent = `${par.persona} → ${par.amigoSecreto}`;
        listaResultados.appendChild(li);
    });
}