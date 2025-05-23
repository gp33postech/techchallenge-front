
# 📘 TechChallenge 3 - Front-end do Blog

## 📑 Índice

- [Introdução](#introdução)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Uso](#instalação-e-uso)
  - [1. Clone os Repositórios](#1-clone-os-repositórios)
  - [2. Rodar com Docker](#2-rodar-com-docker)
  - [3. Rodar Localmente (sem Docker)](#3-rodar-localmente-sem-docker)
- [Acesso Online](#acesso-online)
- [Rotas Utilizadas para se Conectar com Backend](#rotas-utilizadas-para-se-conectar-com-backend)
- [Estrutura do Projeto (Frontend)](#estrutura-do-projeto-frontend)
- [Dependências](#dependências)

---

## 📘 Introdução

Este projeto foi desenvolvido como parte das atividades da Pós-Tech (Fase 3), com o objetivo de criar o front-end de uma aplicação de blog.  
A plataforma permite que **docentes** gerenciem e publiquem postagens, enquanto os **alunos** podem acessá-las e lê-las de forma intuitiva.  
A aplicação possui funcionalidades como criação, listagem, edição e exclusão de postagens.

Frontend desenvolvido com **React + Vite**, estilizado com **TailwindCSS**.

---

## 🚀 Tecnologias Utilizadas

### 🔧 Backend

- Node.js
- Express
- MongoDB + Mongoose
- Multer (upload de imagens)
- Dotenv
- Swagger (documentação da API)

### 💻 Frontend

- React
- Vite
- TailwindCSS
- React Router DOM
- React Slick (carrossel de posts)
- Axios

### 🐳 Docker

- Docker
- Docker Compose
- Nginx (para servir o frontend em produção)

---

## 🧭 Instalação e Uso

### 1. Clone os Repositórios

```bash
# Backend
git clone https://github.com/seu-usuario/techchallenge-backend.git

# Frontend
git clone https://github.com/gp33postech/techchallenge-front.git
```

### 2. Rodar com Docker

#### Backend

```bash
cd techchallenge-backend
docker-compose up --build
```

#### Frontend

```bash
cd techchallenge-front
docker-compose up --build
```

> Certifique-se de que o arquivo `.env.docker` existe no frontend e contém:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Rodar Localmente (sem Docker)

#### Backend

```bash
cd techchallenge-backend
npm install
npm start
```

#### Frontend

```bash
cd techchallenge-front
npm install
npm run dev
```

---

## 🌐 Acesso Online

A aplicação também está disponível online via Render:

🔗 https://techchallenge-front.onrender.com

---

## 🔗 Rotas Utilizadas para se Conectar com Backend

**Base URL:** `http://localhost:5000/api`

### 📬 Posts

- `GET /posts` — Listar todos os posts
- `GET /posts/:id` — Obter post por ID
- `POST /posts` — Criar novo post (`multipart/form-data`)
- `PUT /posts/:id` — Editar post existente (`multipart/form-data`)
- `DELETE /posts/:id` — Deletar post

---

## 📁 Estrutura Principal do Projeto (Frontend)

```
techchallenge-front/
├── public/                  # Arquivos públicos
├── src/
│   ├── assets/              # Imagens e outros recursos estáticos
│   ├── components/          # Componentes reutilizáveis
│   ├── context/             # Contextos do React
│   ├── hooks/               # Hooks personalizados
│   ├── pages/               # Páginas principais
│   ├── services/            # Lógica de comunicação com API
│   ├── styles/              # Estilos personalizados
│   ├── App.jsx              # Componente principal da aplicação
│   └── main.jsx             # Arquivo de entrada
├── .env                     # Variáveis de ambiente
├── .env.docker              # Variáveis de ambiente para Docker
├── Dockerfile               # Configuração de build
├── docker-compose.yml       # Orquestração com Docker
├── nginx.conf               # Configuração do Nginx
├── package.json             # Dependências e scripts
└── README.md                # Documentação do projeto

```

---

## 📦 Dependências

### Backend

- express
- mongoose
- cors
- dotenv
- multer
- swagger-jsdoc
- swagger-ui-express

### Frontend

- react
- react-dom
- react-router-dom
- axios
- react-slick
- slick-carousel
- tailwindcss
- vite

---

## Relatos e desafios no desenvolvimento
Alguns dos desafios encontrados pela equipe durante o desenvolvimento foram a resolução do erro de CORS, aplicar o upload de imagem, familiarização com as ferramentas apresentadas em aula e integração de todo o conteúdo teórico com a abordagem prática exigida no desafio em grupo.

## GRUPO 9
#### ADRIANO BATISTA DE ARAÚJO - RM: 360317
#### FILIPE ARAÚJO DA COSTA - RM: 360594
#### GABRIELA MIDORI AFUSO - RM: 360009 
#### PEDRO CARVALHO CALLEJAS - RM: 360449