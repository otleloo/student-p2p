# 🧠 AI Agent Prompt: Debug & Build My Project

## 🎯 Objective

You are an expert AI development agent assigned to fully debug, stabilize, and build a production-ready version of this full-stack web application. The app uses the following technologies:

### ⚙️ Tech Stack:
- **Next.js** (App Router)
- **Express.js** (`server.js`)
- **Prisma ORM** (with SQLite or PostgreSQL)
- **Shadcn UI** + Tailwind CSS
- **NextAuth.js** for authentication

---

## ✅ Your Mission (Step-by-Step)

### 1. **Comprehensive Debugging**
- Scan the entire project for any:
  - Runtime errors (server/client)
  - Build errors (e.g., JSX parsing, missing imports)
  - Console warnings
  - Prisma schema mismatches
  - Broken API routes
  - Misused Socket.IO event handling
- ✅ **Fix every issue immediately** with accurate, minimal code changes
- Ensure there are no unhandled rejections or unexpected token errors


### 2. **Ensure Prisma Compatibility**
- Validate `prisma.schema` against database
- Apply any pending migrations
- Regenerate Prisma client
- Ensure all Prisma queries in API routes are safe and return expected results

### 3. **Build the Application**
- Run `npm run build` (or `next build`)
- Resolve any errors preventing a clean build
- Ensure `.next/` output is valid and stable

### 4. **Run Production Server**
- Use `NODE_ENV=production node server.js`
- Ensure startup time is fast (< 2s)
- No crashes or unexpected behavior
- Socket.IO and all API endpoints must remain functional

---

## 🔁 Final Deliverables

- ✅ Fixed codebase
- ✅ Clean Prisma migrations applied
- ✅ Fully working production build
- ✅ Instructions or `README` if anything changed

---

📌 Be precise and avoid surface-level patches. Prioritize stability, correctness, and production-readiness.


