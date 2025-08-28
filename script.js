// Script principal para o portfólio MFM

// Aguardar o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    initNavbar();
    initTeamCarousel();
    initAnimations();
    initScrollEffects();
    initFormValidation();
    initSmoothScrolling();
    initTouchOptimizations();
    initStarsEffect();
    
    // Inicializar analytics
    initAnalytics();
});

// Função para inicializar o menu de navegação
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Adicionar classe 'scrolled' quando fizer scroll
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Animar entrada/saída do menu baseado na direção do scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll para baixo - esconder menu
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scroll para cima - mostrar menu
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Adicionar efeito de hover nos links do menu
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Função para inicializar animações
function initAnimations() {
    // Animar elementos quando entram na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos que precisam de animação
    const animatedElements = document.querySelectorAll('.team-card, .project-card, .skill-item');
    animatedElements.forEach(el => observer.observe(el));
}

// Função para efeitos de scroll
function initScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Função para validação de formulário
function initFormValidation() {
    const form = document.querySelector('form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();
        
        // Validação básica
        if (!nome || !email || !mensagem) {
            showNotification('Por favor, preencha todos os campos.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Por favor, insira um email válido.', 'error');
            return;
        }
        
        // Simular envio
        showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        form.reset();
    });
    
    // Validação em tempo real
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

// Função para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para validar campo individual
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    if (!value) {
        showFieldError(field, `${getFieldLabel(fieldName)} é obrigatório.`);
        return false;
    }
    
    if (fieldName === 'email' && !isValidEmail(value)) {
        showFieldError(field, 'Por favor, insira um email válido.');
        return false;
    }
    
    return true;
}

// Função para mostrar erro no campo
function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error text-red-500 text-sm mt-1';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
    field.classList.add('border-red-500');
}

// Função para limpar erro do campo
function clearFieldError(field) {
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
    field.classList.remove('border-red-500');
}

// Função para obter label do campo
function getFieldLabel(fieldName) {
    const labels = {
        'nome': 'Nome',
        'email': 'Email',
        'mensagem': 'Mensagem'
    };
    return labels[fieldName] || fieldName;
}

// Função para mostrar notificações
function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-sm transform transition-all duration-300 translate-x-full`;
    
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    notification.className += ` ${bgColor} text-white`;
    
    notification.innerHTML = `
        <div class="flex items-center">
            <span class="mr-2">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
            <p>${message}</p>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Função para inicializar efeito de estrelas
function initStarsEffect() {
    const starsContainer = document.getElementById('stars-container');
    const footerStarsContainer = document.getElementById('footer-stars-container');
    
    if (starsContainer) {
        // Criar estrelas dinamicamente
        createDynamicStars(starsContainer);
        
        // Criar estrelas que piscam
        createTwinklingStars(starsContainer);
        
        // Criar estrelas cadentes ocasionais
        createShootingStars(starsContainer);
    }
    
    if (footerStarsContainer) {
        // Criar estrelas dinâmicas no footer
        createFooterStars(footerStarsContainer);
    }
}

// Função para criar estrelas dinâmicas
function createDynamicStars(container) {
    const starCount = 100;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'dynamic-star';
        
        // Posição aleatória
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Tamanho aleatório
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Opacidade aleatória
        star.style.opacity = Math.random() * 0.8 + 0.2;
        
        // Delay de animação aleatório
        star.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(star);
    }
}

// Função para criar estrelas que piscam
function createTwinklingStars(container) {
    const twinkleCount = 30;
    
    for (let i = 0; i < twinkleCount; i++) {
        const star = document.createElement('div');
        star.className = 'twinkle-star';
        
        // Posição aleatória
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Tamanho aleatório
        const size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Duração de animação aleatória
        const duration = Math.random() * 3 + 2;
        star.style.animationDuration = duration + 's';
        
        // Delay aleatório
        star.style.animationDelay = Math.random() * 3 + 's';
        
        container.appendChild(star);
    }
}

// Função para criar estrelas cadentes
function createShootingStars(container) {
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% de chance a cada intervalo
            const shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';
            
            // Posição inicial aleatória
            shootingStar.style.left = Math.random() * 100 + '%';
            shootingStar.style.top = Math.random() * 50 + '%';
            
            container.appendChild(shootingStar);
            
            // Remover após a animação
            setTimeout(() => {
                if (shootingStar.parentNode) {
                    shootingStar.remove();
                }
            }, 2000);
        }
    }, 3000); // Verificar a cada 3 segundos
}

// Função para criar estrelas no footer
function createFooterStars(container) {
    const footerStarCount = 50; // Menos estrelas no footer para não sobrecarregar
    
    for (let i = 0; i < footerStarCount; i++) {
        const star = document.createElement('div');
        star.className = 'footer-dynamic-star';
        
        // Posição aleatória
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Tamanho aleatório (menor que no hero)
        const size = Math.random() * 2 + 0.5;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Opacidade aleatória (mais sutil)
        star.style.opacity = Math.random() * 0.6 + 0.1;
        
        // Delay de animação aleatório
        star.style.animationDelay = Math.random() * 4 + 's';
        
        container.appendChild(star);
    }
}

// Função para inicializar partículas
function initParticles() {
    const hero = document.getElementById('hero');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    hero.appendChild(particlesContainer);
    
    // Criar partículas
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

// Função para criar partícula individual
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Posição aleatória
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Tamanho aleatório
    const size = Math.random() * 3 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Duração da animação aleatória
    const duration = Math.random() * 4 + 3;
    particle.style.animationDuration = duration + 's';
    
    // Delay aleatório
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(particle);
}

// Função para scroll suave
function initSmoothScrolling() {
    const ctaBtn = document.getElementById('cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function() {
            const projetosSection = document.getElementById('projetos');
            if (projetosSection) {
                projetosSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Scroll suave para todos os links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Função para efeito de digitação
function initTypingEffect() {
    const heroText = document.querySelector('#hero p');
    if (!heroText) return;
    
    const text = heroText.textContent;
    heroText.textContent = '';
    heroText.classList.add('text-reveal');
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroText.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            heroText.classList.add('revealed');
        }
    };
    
    // Iniciar efeito após um delay
    setTimeout(typeWriter, 1000);
}

// Função para efeitos de parallax
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Função para animar números (contador)
function animateNumbers() {
    const numberElements = document.querySelectorAll('[data-number]');
    
    numberElements.forEach(element => {
        const target = parseInt(element.dataset.number);
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    });
}

// Função para efeito de hover 3D nos cards
function init3DHover() {
    const cards = document.querySelectorAll('.team-card, .project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// Função para lazy loading de imagens
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Função para scroll to top
function initScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top fixed bottom-8 right-8 bg-white text-black border-2 border-black p-3 rounded-full shadow-lg opacity-0 invisible transition-all duration-300 hover:bg-gray-100 z-40';
    
    document.body.appendChild(scrollToTopBtn);
    
    function updateScrollToTopButton() {
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 300) {
            scrollToTopBtn.classList.remove('opacity-0', 'invisible');
        } else {
            scrollToTopBtn.classList.add('opacity-0', 'invisible');
        }
    }
    
    window.addEventListener('scroll', updateScrollToTopButton);
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Função para preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }
}

// Função para cursor personalizado
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor fixed w-6 h-6 bg-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-200';
    document.body.appendChild(cursor);
    
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'custom-cursor-follower fixed w-12 h-12 border-2 border-purple-500 rounded-full pointer-events-none z-50 transition-all duration-300';
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        followerX += (mouseX - followerX) * 0.05;
        followerY += (mouseY - followerY) * 0.05;
        
        cursor.style.transform = `translate(${cursorX - 12}px, ${cursorY - 12}px)`;
        cursorFollower.style.transform = `translate(${followerX - 24}px, ${followerY - 24}px)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Esconder cursor padrão
    document.body.style.cursor = 'none';
    
    // Mostrar cursor personalizado apenas em elementos interativos
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .interactive');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(1.5)';
            cursorFollower.style.transform += ' scale(1.2)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
            cursorFollower.style.transform = cursorFollower.style.transform.replace(' scale(1.2)', '');
        });
    });
}

// Função para inicializar o carrossel de pessoas
function initTeamCarousel() {
    const people = [
        {
            name: 'Marco Capano',
            role: 'Desenvolvedor Full-Stack',
            bio: 'Desenvolvedor apaixonado por criar aplicações robustas e escaláveis, transformando ideias em código funcional e elegante.',
            avatar: 'M',
            gradient: 'from-purple-400 to-blue-500',
            image: './img/marco.jpeg' // Foto do Marco
        },
        {
            name: 'Fellipe Farias',
            role: 'Desenvolvedor Full-Stack',
            bio: 'Desenvolvedor apaixonado por criar aplicações robustas e escaláveis, transformando ideias em código funcional e elegante.',
            avatar: 'F',
            gradient: 'from-blue-400 to-purple-500',
            image: './img/farias.jpg' // Foto do Fellipe
        },
        {
            name: 'Miguel Groutto',
            role: 'Desenvolvedor Front-end',
            bio: 'Especialista em desenvolvimento frontend, criando interfaces responsivas e interativas com as mais modernas tecnologias web.',
            avatar: 'M',
            gradient: 'from-purple-500 to-blue-400',
            image: './img/miguelgroutto.JPEG' // Foto do Miguel (corrigindo extensão)
        }
    ];
    
    let currentIndex = 0;
    let isTransitioning = false;
    
    // Elementos do DOM
    const personAvatar = document.getElementById('person-avatar');
    const personImage = document.getElementById('person-image');
    const personInitial = document.getElementById('person-initial');
    const personName = document.getElementById('person-name');
    const personRole = document.getElementById('person-role');
    const personBio = document.getElementById('person-bio');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicators = document.querySelectorAll('.indicator');
    const activeCard = document.getElementById('active-card');
    
    // Função para gerenciar avatar (foto ou letra)
    function updateAvatar(person) {
        if (person.image) {
            // Tentar carregar a imagem
            const img = new Image();
            img.onload = function() {
                console.log(`Imagem carregada com sucesso: ${person.image}`);
                personImage.src = person.image;
                personImage.alt = `Foto de ${person.name}`;
                personImage.classList.remove('hidden');
                personInitial.classList.add('hidden');
                personAvatar.classList.remove('bg-gradient-to-br', 'from-purple-400', 'to-blue-500', 'from-blue-400', 'to-purple-500', 'from-purple-500', 'to-blue-400');
            };
            img.onerror = function() {
                console.log(`Erro ao carregar imagem: ${person.image}`);
                // Se a imagem falhar, mostrar letra com gradiente
                showInitial(person);
            };
            img.src = person.image;
        } else {
            // Se não houver imagem, mostrar letra
            showInitial(person);
        }
    }
    
    // Função para mostrar letra com gradiente
    function showInitial(person) {
        personImage.classList.add('hidden');
        personInitial.textContent = person.avatar;
        personInitial.classList.remove('hidden');
        personAvatar.className = `w-36 h-36 mx-auto mb-8 rounded-full bg-gradient-to-br ${person.gradient} flex items-center justify-center text-white text-5xl font-bold overflow-hidden`;
    }
    
    // Função para atualizar o card com animação
    function updateCard(index, direction = 'right') {
        if (isTransitioning) return;
        isTransitioning = true;
        
        const person = people[index];
        const card = personAvatar.parentElement.parentElement;
        
        // Adicionar classe de transição baseada na direção
        if (direction === 'left') {
            card.classList.add('slide-out-left');
        } else {
            card.classList.add('slide-out-right');
        }
        
        // Adicionar efeito nos botões durante transição
        [prevBtn, nextBtn].forEach(btn => btn.classList.add('transitioning'));
        indicators.forEach(ind => ind.classList.add('transitioning'));
        
        setTimeout(() => {
            // Atualizar conteúdo
            updateAvatar(person);
            personName.textContent = person.name;
            personRole.textContent = person.role;
            personBio.textContent = person.bio;
            
            // Atualizar cor do cargo baseado na pessoa
            if (person.name === 'Fellipe Farias') {
                personRole.className = 'text-blue-600 font-semibold mb-4 text-lg';
            } else {
                personRole.className = 'text-purple-600 font-semibold mb-4 text-lg';
            }
            
            // Adicionar classe de entrada baseada na direção
            if (direction === 'left') {
                card.classList.remove('slide-out-left');
                card.classList.add('slide-in-left');
            } else {
                card.classList.remove('slide-out-right');
                card.classList.add('slide-in-right');
            }
            
            // Remover classes de transição após animação
            setTimeout(() => {
                card.classList.remove('slide-in-left', 'slide-in-right');
                [prevBtn, nextBtn].forEach(btn => btn.classList.remove('transitioning'));
                indicators.forEach(ind => ind.classList.remove('transitioning'));
                isTransitioning = false;
            }, 400);
        }, 200);
    }
    
    // Função para atualizar indicadores
    function updateIndicators(index) {
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Função para ir para próxima pessoa
    function nextPerson() {
        if (isTransitioning) return;
        const nextIndex = (currentIndex + 1) % people.length;
        updateCard(nextIndex, 'left'); // Mudou para 'left' - card sai para esquerda
        currentIndex = nextIndex;
        updateIndicators(currentIndex);
    }
    
    // Função para ir para pessoa anterior
    function prevPerson() {
        if (isTransitioning) return;
        const prevIndex = (currentIndex - 1 + people.length) % people.length;
        updateCard(prevIndex, 'right'); // Mudou para 'right' - card sai para direita
        currentIndex = prevIndex;
        updateIndicators(currentIndex);
    }
    
    // Função para ir para pessoa específica
    function goToPerson(index) {
        if (isTransitioning || index === currentIndex) return;
        
        const direction = index > currentIndex ? 'left' : 'right'; // Inverteu a lógica
        updateCard(index, direction);
        currentIndex = index;
        updateIndicators(currentIndex);
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextPerson);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevPerson);
    }
    
    // Event listeners para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToPerson(index));
    });
    
    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (isTransitioning) return;
        
        if (e.key === 'ArrowLeft') {
            prevPerson();
        } else if (e.key === 'ArrowRight') {
            nextPerson();
        }
    });
    
    // Auto-play opcional (descomente se quiser)
    // setInterval(nextPerson, 5000);
    
    // Inicializar com primeira pessoa
    updateIndicators(0);
}

// Função para otimizações de touch (placeholder)
function initTouchOptimizations() {
    // Otimizações para dispositivos touch
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
}

// Inicializar funcionalidades adicionais
document.addEventListener('DOMContentLoaded', function() {
    init3DHover();
    initLazyLoading();
    initScrollToTop();
    initPreloader();
    // initCustomCursor(); // Descomente se quiser cursor personalizado
});

// Função para detectar preferências de movimento reduzido
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Ajustar animações baseado nas preferências do usuário
if (prefersReducedMotion()) {
    document.documentElement.style.setProperty('--animation-duration', '0.1s');
    document.documentElement.style.setProperty('--transition-duration', '0.1s');
}

// Função para modo escuro (opcional)
function initDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
        });
        
        // Verificar preferência salva
        if (localStorage.getItem('darkMode') === 'true') {
            document.documentElement.classList.add('dark');
        }
    }
}

// Função para analytics (opcional)
function initAnalytics() {
    // Aqui você pode adicionar Google Analytics ou outras ferramentas
    console.log('Portfolio MFM carregado com sucesso!');
}

// Inicializar analytics
initAnalytics();
