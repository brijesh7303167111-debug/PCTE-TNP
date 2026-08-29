# 📦 Backend Service

This is the backend service for the project. It follows a modular structure with global helpers and utilities kept outside of individual modules.

Don't Push or work in other branches apart of yours
---

## 📁 Project Structure


```
backend/src/modules
├── controllers/
│   └── yourModuleController.js
├── models/
│   └── yourModuleModel.js
├── services/
│   └── yourModuleService.js
├── middlewares/
│   └── yourMiddleware.js
├── routes/
│   └── yourModuleRoutes.js
├── utils/
│   └── globalUtility.js
├── helpers/
│   └── globalHelper.js
├── config/
│   └── dbConnect.js
├── global/
│   ├── constants.js
│   └── logger.js
├── app.js
└── server.js
```

> ✅ File and variable names use `camelCase` convention.

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Iamaniketgupta/COLLEGE_T-P_Platform_Backend.git
cd COLLEGE_T-P_Platform_Backend
```

### 2. Install Dependencies

```bash
npm install
```

### 4. Install Nodemon Globally (if not already)

```bash
npm install -g nodemon
```

---

## Run the Project

### In Development

```bash
npm run dev
```

---

## ✅ Best Practices

- Use `camelCase` for file names and variables.
- Keep module-specific logic inside `controllers`, `services`, and `routes`.
- Use global files only for shared constants, helpers, or utilities.
- Organize reusable functions in `utils/` or `helpers/`.
- Separate middleware logic clearly in `middlewares/`.

---

 
