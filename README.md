# 🚀 Portfolio MFM - Grupo de Desenvolvimento

Um site de portfólio moderno e impactante para o grupo **MFM** (Miguel, Fellipe e Marco), inspirado no estilo minimalista com toques visuais marcantes.

## ✨ Características

### 🎨 Design Visual
- **Estilo Minimalista**: Design limpo e elegante inspirado no portfólio do Miguel Groutto
- **Paleta de Cores**: Branco/preto como base com destaque em azul elétrico e roxo neon
- **Tipografia**: Fonte Poppins para uma aparência moderna e profissional
- **Gradientes**: Degradês sutis e efeitos visuais impactantes

### 🎭 Animações e Interações
- **Scroll Suave**: Navegação fluida entre seções
- **Animações de Entrada**: Elementos aparecem com efeitos fade-in e slide
- **Hover Effects**: Cards com elevação e sombras dinâmicas
- **Partículas Animadas**: Efeito visual no hero section
- **Transições Suaves**: Todas as interações com timing de 150-200ms

### 📱 Responsividade
- **Mobile-First**: Design otimizado para dispositivos móveis
- **Grid Responsivo**: Layout adaptativo para diferentes tamanhos de tela
- **Touch-Friendly**: Elementos interativos otimizados para touch

## 🏗️ Estrutura do Projeto

### Seções Principais
1. **Hero Section**: Apresentação impactante com logo MFM e call-to-action
2. **Sobre Nós**: Apresentação da equipe com cards individuais
3. **Projetos**: Galeria de projetos com hover effects
4. **Skills**: Tecnologias e ferramentas utilizadas
5. **Contato**: Formulário de contato e redes sociais
6. **Footer**: Informações finais e links

### Arquivos
```
Portfolio/
├── index.html          # Estrutura HTML principal
├── styles.css          # Estilos CSS personalizados
├── script.js           # Funcionalidades JavaScript
└── README.md           # Documentação do projeto
```

## 🚀 Como Usar

### 1. Visualização Local
1. Baixe ou clone o projeto
2. Abra o arquivo `index.html` em seu navegador
3. Ou use um servidor local:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx serve .
   
   # PHP
   php -S localhost:8000
   ```

### 2. Personalização
- **Cores**: Edite as variáveis CSS no arquivo `styles.css`
- **Conteúdo**: Modifique o texto no arquivo `index.html`
- **Funcionalidades**: Ajuste o comportamento no arquivo `script.js`

### 3. Deploy
- **GitHub Pages**: Faça upload para um repositório GitHub
- **Netlify**: Arraste a pasta do projeto para o Netlify
- **Vercel**: Conecte seu repositório GitHub ao Vercel

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilos avançados com Flexbox e Grid
- **JavaScript ES6+**: Funcionalidades interativas modernas
- **TailwindCSS**: Framework CSS utilitário (via CDN)

### Bibliotecas e Recursos
- **Font Awesome**: Ícones vetoriais
- **Google Fonts**: Tipografia Poppins
- **Intersection Observer API**: Animações baseadas em scroll
- **CSS Grid & Flexbox**: Layouts responsivos

## 🎯 Funcionalidades Implementadas

### ✅ Animações
- [x] Fade-in ao scroll
- [x] Hover effects nos cards
- [x] Partículas animadas no hero
- [x] Efeitos de parallax
- [x] Transições suaves

### ✅ Interatividade
- [x] Scroll suave entre seções
- [x] Validação de formulário
- [x] Notificações de feedback
- [x] Hover effects 3D
- [x] Scroll to top

### ✅ Responsividade
- [x] Mobile-first design
- [x] Grid responsivo
- [x] Breakpoints otimizados
- [x] Touch-friendly

### ✅ Performance
- [x] Lazy loading de imagens
- [x] Animações otimizadas
- [x] CSS otimizado
- [x] JavaScript eficiente

## 🎨 Personalização

### Cores Principais
```css
/* Azul Elétrico */
--primary-blue: #667eea;

/* Roxo Neon */
--primary-purple: #764ba2;

/* Gradientes */
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Animações
```css
/* Duração padrão */
--animation-duration: 0.3s;

/* Easing */
--easing-smooth: cubic-bezier(0.4, 0, 0.2, 1);
```

## 📱 Breakpoints Responsivos

```css
/* Mobile */
@media (max-width: 768px) { ... }

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) { ... }

/* Desktop */
@media (min-width: 1025px) { ... }
```

## 🔧 Configurações Avançadas

### Modo Escuro
```javascript
// Ativar modo escuro
document.documentElement.classList.add('dark');
```

### Cursor Personalizado
```javascript
// Descomente no script.js
initCustomCursor();
```

### Partículas
```javascript
// Ajustar quantidade de partículas
for (let i = 0; i < 50; i++) { // Altere o número 50
    createParticle(particlesContainer);
}
```

## 🚀 Melhorias Futuras

### Funcionalidades Planejadas
- [ ] Modo escuro automático
- [ ] Filtros para projetos
- [ ] Blog integrado
- [ ] Sistema de comentários
- [ ] Analytics avançado
- [ ] PWA (Progressive Web App)

### Otimizações
- [ ] Lazy loading de componentes
- [ ] Service Worker para cache
- [ ] Compressão de imagens
- [ ] Minificação de assets

## 📄 Licença

Este projeto é de uso livre para fins educacionais e comerciais.

## 👥 Equipe MFM

- **Miguel**: Designer & UI/UX
- **Fellipe**: Desenvolvedor Full-Stack  
- **Marco**: Desenvolvedor Frontend

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir melhorias
- Enviar pull requests
- Compartilhar feedback

## 📞 Contato

Para dúvidas ou sugestões sobre o projeto:
- **Email**: [seu-email@exemplo.com]
- **GitHub**: [seu-usuario]
- **LinkedIn**: [seu-linkedin]

---

**Desenvolvido com ❤️ pela equipe MFM**

*Transformando ideias em experiências digitais extraordinárias*
