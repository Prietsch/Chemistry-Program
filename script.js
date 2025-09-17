window.onload = function() {
    // A função é chamada depois que a página e todos os seus recursos estão carregados.
    const quizContainer = document.getElementById('quiz-container');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const resultMessage = document.getElementById('result-message');
    const infoContainer = document.getElementById('info-container');
    const infoTitle = document.getElementById('info-title');
    const infoText = document.getElementById('info-text');
    const infoImage = document.getElementById('info-image');
    const nextButton = document.getElementById('next-button');

    let currentQuestionIndex = 0;

    const questions = [
        {
            question: "Qual o principal tipo de ligação entre os átomos de carbono na molécula do etino?",
            options: ["Ligação simples (σ)", "Ligação dupla (π)", "Ligação tripla (σ e 2π)", "Ligação iônica"],
            correctAnswer: 2,
            info: {
                title: "Ligação Tripla no Etino",
                text: "A ligação entre os dois átomos de carbono no etino é uma ligação tripla, composta por uma ligação sigma (σ) e duas ligações pi (π).",
                image: "etino.webp"
            }
        },
        {
            question: "O etino é comumente conhecido como acetileno e tem uma aplicação importante em soldagem. Qual é o nome do processo que utiliza o etino para cortar e soldar metais?",
            options: ["Solda a arco", "Solda a laser", "Solda oxicombustível", "Solda por resistência"],
            correctAnswer: 2,
            info: {
                title: "Solda Oxicombustível",
                text: "O etino é usado em tochas de soldagem oxicombustível (misturado com oxigênio) porque sua combustão gera uma chama de altíssima temperatura, ideal para cortar e unir metais.",
                image: "solda.webp"
            }
        },
        {
            question: "Qual é a geometria molecular do etino, considerando a ligação tripla carbono-carbono?",
            options: ["Tetraédrica", "Angular", "Linear", "Piramidal"],
            correctAnswer: 2,
            info: {
                title: "Geometria Linear",
                text: "A presença da ligação tripla entre os átomos de carbono força a molécula a ter uma geometria linear, com um ângulo de 180° entre os átomos.",
                image: "geometria.webp"
            }
        },
    ];

    function showQuestion() {
        // Esconde a mensagem de resultado e informações extras
        resultMessage.textContent = '';
        infoContainer.classList.add('hidden');
        nextButton.classList.add('hidden');
        optionsContainer.innerHTML = '';
        infoImage.classList.add('hidden');
        infoTitle.classList.add('hidden');
        infoText.classList.add('hidden');
        
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            questionText.textContent = currentQuestion.question;

            currentQuestion.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.textContent = option;
                button.classList.add('bg-[#0D2557]', 'hover:bg-[#93A8C9]', 'hover:text-black', 'text-white', 'font-semibold', 'py-3', 'px-6', 'rounded-lg', 'transition-colors', 'duration-200', 'container-shadow');
                button.onclick = () => checkAnswer(index);
                optionsContainer.appendChild(button);
            });
        } else {
            // Fim do questionário
            questionText.textContent = "Parabéns, você completou o questionário!";
            resultMessage.textContent = "Você respondeu a todas as perguntas corretamente!";
            optionsContainer.innerHTML = ''; // Limpa os botões
        }
    }

    function checkAnswer(selectedIndex) {
        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = selectedIndex === currentQuestion.correctAnswer;

        if (isCorrect) {
            resultMessage.textContent = "Correto! 🎉";
            resultMessage.classList.remove('text-[#0D2557]');
            resultMessage.classList.add('text-green-800');
            
            // Mostra a imagem de informação
            infoImage.src = currentQuestion.info.image;
            infoImage.onload = () => {
                infoImage.classList.remove('hidden');
                infoContainer.classList.remove('hidden');
            };
            infoImage.onerror = () => {
                infoImage.classList.add('hidden');
                infoTitle.textContent = currentQuestion.info.title;
                infoText.textContent = currentQuestion.info.text;
                infoTitle.classList.remove('hidden');
                infoText.classList.remove('hidden');
                infoContainer.classList.remove('hidden');
            };
            
            // Esconde os botões de opção e mostra o botão de próxima pergunta
            Array.from(optionsContainer.children).forEach(btn => btn.classList.add('hidden'));
            nextButton.classList.remove('hidden');
        } else {
            resultMessage.textContent = "Ops, resposta incorreta. Tente novamente!";
            resultMessage.classList.remove('text-green-800');
            resultMessage.classList.add('text-[#0D2557]');
        }
    }

    function nextQuestion() {
        currentQuestionIndex++;
        showQuestion();
    }

    // Adiciona o evento de clique ao botão "Próxima Pergunta"
    nextButton.addEventListener('click', nextQuestion);

    // Inicia o questionário
    showQuestion();

    // --- CÓDIGO DO MODELO 3D ---
    const container = document.getElementById('molecule-3d-container');

    // Configurações básicas da cena
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Define a cor de fundo do renderizador
    renderer.setClearColor(0x0D2557, 1);

    // Luzes
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Definição da molécula de C₂H₂
    const moleculeData = {
        atoms: [
            { name: 'Carbono', position: new THREE.Vector3(-0.6, 0, 0), color: 0x2e2e2e, radius: 0.7 }, // C1
            { name: 'Carbono', position: new THREE.Vector3(0.6, 0, 0), color: 0x2e2e2e, radius: 0.7 }, // C2
            { name: 'Hidrogênio', position: new THREE.Vector3(-1.6, 0, 0), color: 0xffffff, radius: 0.4 }, // H1
            { name: 'Hidrogênio', position: new THREE.Vector3(1.6, 0, 0), color: 0xffffff, radius: 0.4 } // H2
        ],
        bonds: [
            { from: 0, to: 2 }, // C1-H1
            { from: 1, to: 3 }, // C2-H2
            { from: 0, to: 1 } // C1-C2 (ligação tripla)
        ]
    };
    

    // Grupo para a molécula
    const moleculeGroup = new THREE.Group();
    scene.add(moleculeGroup);

    // Adiciona os átomos
    moleculeData.atoms.forEach(atom => {
        const geometry = new THREE.SphereGeometry(atom.radius, 32, 32);
        const material = new THREE.MeshPhongMaterial({ color: atom.color });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.copy(atom.position);
        moleculeGroup.add(sphere);
    });

    // Adiciona as ligações
    moleculeData.bonds.forEach(bond => {
        const start = moleculeData.atoms[bond.from].position;
        const end = moleculeData.atoms[bond.to].position;

        const bondLength = start.distanceTo(end);
        const bondGeometry = new THREE.CylinderGeometry(0.1, 0.1, bondLength, 8);
        const bondMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });

        const bondCylinder = new THREE.Mesh(bondGeometry, bondMaterial);
        bondCylinder.position.lerpVectors(start, end, 0.5);
        bondCylinder.lookAt(end);
        bondCylinder.rotateX(Math.PI / 2); // Ajusta a rotação para alinhar com a posição dos átomos
        moleculeGroup.add(bondCylinder);
    });

    // Posição da câmera
    camera.position.z = 4;

    // Rotação da molécula com o mouse
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    function onMouseDown(event) {
        isDragging = true;
        previousMousePosition.x = event.clientX;
        previousMousePosition.y = event.clientY;
    }

    function onMouseUp() {
        isDragging = false;
    }

    function onMouseMove(event) {
        if (!isDragging) return;

        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;

        moleculeGroup.rotation.y += deltaX * 0.01;
        moleculeGroup.rotation.x += deltaY * 0.01;

        previousMousePosition.x = event.clientX;
        previousMousePosition.y = event.clientY;
    }

    // Adiciona os event listeners de mouse
    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseUp);

    // Animação e renderização
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    // Rotação inicial para uma visualização melhor
    moleculeGroup.rotation.y = 0.5;
    moleculeGroup.rotation.x = 0.2;

    // Lidar com redimensionamento da janela
    window.addEventListener('resize', () => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });

    // Iniciar a animação
    animate();
};
