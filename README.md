# Perfil Bio Premium (Inspirado no guns.lol) 🚀

Uma página de links pessoais ("link-in-bio") altamente interativa, moderna e responsiva, desenvolvida em HTML5, CSS Puro e JavaScript moderno. O projeto apresenta uma estética de ponta inspirada nas páginas do **guns.lol**, contando com animações fluidas, efeitos de desfoque (glassmorphism), temas alternáveis em tempo real e integração de som com visualizador de áudio dinâmico.

## 🌟 Recursos Principais

- **Desbloqueio de Autoplay**: Tela inicial de entrada ("Entrar") que resolve a restrição de reprodução automática de áudio nos navegadores modernos.
- **Partículas Canvas Interativas**: Fundo interativo que responde aos movimentos do cursor do mouse (atração e repulsão de nós).
- **Rastro de Cursor Customizado**: Cursor do mouse customizado com efeito físico de atraso que reage expandindo ao passar sobre links e botões.
- **Player de Áudio & Visualizador Inteligente**: Controle integrado de música com ajuste de volume, linha de progresso e visualizador responsivo em tempo real (usando a Web Audio API com fallback procedural suave caso ocorram bloqueios de CORS).
- **Simulador de Atividade do Discord**: Widget que simula em tempo real o status online e a atividade do usuário (ex: editando arquivos no Visual Studio Code) com contagem de tempo progressiva.
- **4 Temas Visuais Exclusivos**:
  - 💜 **Cyberpunk**: Cores vibrantes em tons de magenta e ciano.
  - 🧡 **Retrowave**: Estilo anos 80 com grade de perspectiva animada no fundo e fonte cursiva clássica.
  - 🌌 **Espaço Cósmico**: Fundo azul profundo com partículas estelares em tom turquesa.
  - 🤍 **Minimalista**: Design elegante e discreto focado em contraste escuro e escala de cinza.

---

## 🛠️ Tecnologias Utilizadas

- **Estruturação**: HTML5 Semântico
- **Estilização**: CSS3 Puro (Custom Properties, Flexbox, Keyframe Animations, Glassmorphism, Filtros)
- **Interatividade**: Vanilla JavaScript (Canvas API, Web Audio API, Mouse Events)

---

## 🚀 Como Executar Localmente

Como a página utiliza JavaScript dinâmico e Web Audio API, é necessário executá-la por meio de um servidor web local para evitar bloqueios de segurança dos navegadores:

### Opção 1: Usando Python
Abra o terminal na pasta do projeto e digite:
```bash
python -m http.server 8000
```
Depois, acesse no navegador: `http://localhost:8000`

### Opção 2: Usando Node.js (npm/npx)
Execute o servidor de desenvolvimento:
```bash
npx http-server -p 8000
```
Depois, acesse no navegador: `http://localhost:8000`

---

## 🤝 Como Contribuir e Editar

Este é um projeto de **código aberto**! Sinta-se à vontade para clonar, sugerir melhorias e enviar suas contribuições. 

### Como Enviar Alterações (Pull Request)

1. Faça um **Fork** deste repositório (clique no botão *Fork* no topo direito da página).
2. Clone o repositório para sua máquina local:
   ```bash
   git clone https://github.com/SEU-USUARIO/Bio-Premium.git
   ```
3. Crie uma branch para a sua alteração:
   ```bash
   git checkout -b feature/minha-nova-funcionalidade
   ```
4. Faça o commit das suas mudanças:
   ```bash
   git commit -m "feat: adiciona efeito X de animação no botão"
   ```
5. Envie para o GitHub:
   ```bash
   git push origin feature/minha-nova-funcionalidade
   ```
6. Abra um **Pull Request** no repositório original para que as alterações sejam revisadas e integradas!

---

## 📄 Licença

Este projeto está licenciado sob a licença **MIT** - consulte o arquivo [LICENSE](LICENSE) para obter mais detalhes.

---
Desenvolvido com ❤️ por [Zathxz](https://github.com/Zathxz). Inspirado na plataforma [guns.lol](https://guns.lol).
