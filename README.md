# 🛍️ Searchspring UI Challenge  
_A Frontend Implementation by **Devang Patel**_

---

## 🚀 Overview

This project was built as part of the **Searchspring Frontend Challenge** for [Athos Commerce](https://www.athoscommerce.com).  
It demonstrates a complete, scalable, and user-friendly search experience using the [Searchspring Search API](https://searchspring.zendesk.com/hc/en-us/sections/115000119223-Search-API).

Users can:
- Search products dynamically from the API.  
- View product details including image, name, and pricing.  
- Navigate paginated results.  
- Add items to a cart (live badge counter).  
- Enjoy a responsive, elegant, and accessible design.

---

## 🌐 Live Demo & Repository

🔗 **Live Demo:** [https://searchspring-product-search.netlify.app]  
💻 **Repository:** [https://github.com/Devang96870/searchspring-frontend](https://github.com/Devang96870/searchspring-frontend)

---

## 🧠 Challenge Requirements

The following points summarize the challenge instructions provided by **Athos Commerce**:

> Build a simple search page using the **Searchspring API** (`https://searchspring.zendesk.com/hc/en-us/sections/115000119223-Search-API`).

### Requirements:
- An **input box** for search with a **Search button** beside it.  
- On pressing **Enter** or **Search**, fetch and display results.  
- Use the following API parameters:
  - `siteId=#####`
  - `resultsFormat=native`
  - `q` = the user’s search term
- Display:
  - Product **image** (`thumbnailImageUrl`)
  - Product **name**
  - Product **price**
  - If product has **msrp > price**, show it crossed out.
- Include **pagination**:
  - Disable “Previous” on the first page.
  - Disable “Next” on the last page.
  - Allow moving to next/previous pages with new API requests.
