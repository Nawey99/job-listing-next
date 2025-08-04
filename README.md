# 💼 Job Listing Dashboard

A sleek and responsive **Next.js + Tailwind CSS** application for browsing and viewing job opportunities — powered by an external API.

---

## 🚀 Tech Stack

* ⚛️ **Next.js** — React-based framework
* 🔿 **TypeScript** — Static type checking
* 🎨 **Tailwind CSS** — Utility-first CSS framework
* 🌐 **Fetch API** — For client-side and server-side HTTP requests

---

## 📸 Screenshots

> Dashboard
> ![Dashboard Page](image.png)

> Job Detail Page
> ![Job Detail Page](image-1.png)

---

## 🧪 Getting Started Locally

### 1⃣ Clone the Repository

```bash
git clone https://github.com/Nawey99/job-listing-next
cd job-listing-next
```

### 2⃣ Install Dependencies

```bash
npm install
```

### 3⃣ Start the Dev Server

```bash
npm run dev
```

### 4⃣ Open the App

Visit [http://localhost:3000](http://localhost:3000) in your browser

---

## 🌐 Available Pages

| Route        | Description                             |
| ------------ | --------------------------------------- |
| `/`          | Displays all job cards                  |
| `/jobs/[id]` | Detailed view of a specific job listing |

---

## 🗂 Folder Structure

```
job-listing-next/
├── components/       # Reusable UI components
│   ├── JobCard.tsx
│   └── JobDetail.tsx
├── pages/            # Next.js routing
│   ├── index.tsx
│   └── jobs/[id]/page.tsx
├── public/           # Static assets (e.g., images, icons)
├── next.config.js    # Next.js configuration
└── ...
```

---

## 📱 API Integration

Data is fetched from the following public API:

> 🔗 **Base URL**: `https://akil-backend.onrender.com/`

### Endpoints:

* `GET /opportunities/search` – Fetch all job listings
* `GET /opportunities/:id` – Fetch a specific job by ID

✅ Make sure:

* The API is live and responsive.
* You’ve configured `res.cloudinary.com` in `next.config.js` for image support.

---

## 📄 License

Licensed under the [MIT License](LICENSE).
