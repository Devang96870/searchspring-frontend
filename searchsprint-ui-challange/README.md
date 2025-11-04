# 🔍 Searchspring Frontend Challenge

A modern, fully responsive **React + TypeScript** search interface built using the **Searchspring Search API**.  
This project demonstrates clean architecture, modular design, and frontend best practices — from API integration to UX polish.

---

## 🚀 Live Demo


---

## 🧩 Project Overview
  

### 🏗️ Requirements Implemented

✅ Search bar with query input and button  
✅ API integration using Searchspring endpoint with parameters:
- `resultsFormat=native`
- `q` for query
- `page` for pagination

✅ Display product **image, name, price, and msrp**  
✅ If `msrp > price`, show crossed-out msrp next to price  
✅ Pagination with:
- Previous / Next controls  
- Numeric page buttons with ellipses  
- Responsive scrollable pagination on mobile  
✅ Product grid layout with optimized image loading and lazy decoding  
✅ “Add to Cart” demo functionality per product card  
✅ Quick search tabs (chips) for instant keyword filters  
✅ Environment-based configuration using `.env`  
✅ Clean and adaptive design with CSS Modules  
✅ Fully responsive and accessible (desktop, tablet, mobile)

---

## 🧱 Tech Stack

| Area | Technology |
|------|-------------|
| Frontend Framework | [React 18](https://react.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Build Tool | [Vite](https://vitejs.dev/) |
| Styling | CSS Modules + Modern Flex/Grid |
| Deployment | Netlify / Vercel / GitHub Pages |
| API | [Searchspring Search API](https://searchspring.zendesk.com/hc/en-us/articles/115000122263-Search-Endpoint) |

---

## ⚙️ Setup & Installation

Clone this repo and install dependencies:

```bash
cd searchspring-ui-challenge
npm install
