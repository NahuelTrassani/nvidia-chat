# 🤖 NVIDIA Chat

Chatbot interactivo construido con **React + Vite** que consume la API de NVIDIA para chatear con modelos de lenguaje como **Llama 3.1 8B Instruct**.

Proyecto de práctica enfocado en el uso de **React Hooks** modernos.

---

## 🚀 Tech Stack

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [NVIDIA NIM API](https://build.nvidia.com/) — compatible con la API de OpenAI

---

## 🧠 Hooks practicados

| Hook | Uso |
|------|-----|
| `useState` | Manejo de mensajes e input del usuario |
| `useEffect` | Scroll automático al último mensaje |
| `useRef` | Referencia al contenedor del chat |
| `useCallback` | Función de envío optimizada |

---

## ⚙️ Instalación

```bash
git clone https://github.com/NahuelTrassani/nvidia-chat
cd nvidia-chat
npm install
```

Creá un archivo `.env` en la raíz del proyecto:

```
VITE_NVIDIA_API_KEY=tu_api_key_aquí
```

Luego levantá el servidor de desarrollo:

```bash
npm run dev
```

---

## 🔑 Obtener API Key

1. Entrá a [build.nvidia.com](https://build.nvidia.com)
2. Seleccioná el modelo **Llama 3.1 8B Instruct**
3. Generá tu API Key gratuita

---

## 📁 Estructura del proyecto

```
nvidia-chat/
├── src/
│   ├── components/
│   │   └── Chat.jsx
│   ├── App.jsx
│   └── main.jsx
├── .env
└── index.html
```

---

## 👤 Autor

**Nahuel Trassani** — [GitHub](https://github.com/NahuelTrassani)