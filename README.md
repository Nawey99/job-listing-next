🧳 Job Listing Dashboard
A simple Next.js + Tailwind CSS app displaying job cards and their detailed view, powered by data fetched from an external API.
🛠 Tech Stack

Next.js
TypeScript
Tailwind CSS
Fetch API (for HTTP requests)

📸 Screenshots

🧪 Run Locally

Clone the repository:
git clone <repository-url>
cd job-listing-next


Install dependencies:
npm install


Run the development server:
npm run dev


Open the app:Visit http://localhost:3000 in your browser.


🌐 Pages

/: Displays all job cards fetched from the API.
/jobs/[id]: Detailed view of a specific job, fetched by ID from the API.

🗃 Folder Structure

components/: Reusable UI elements (e.g., JobCard.tsx, JobDetail.tsx).
pages/: Next.js routing (e.g., index.tsx, jobs/[id]/page.tsx).
public/: Static assets like images and screenshots.
next.config.js: Configuration for Next.js, including image domain settings.

📡 API Integration
The app fetches job listings from the following API:

Base URL: https://akil-backend.onrender.com/
Endpoints:
GET /opportunities/search: Retrieves all job listings.
GET /opportunities/:id: Retrieves a specific job by ID.


Documentation: API Docs

Ensure the API is accessible and the res.cloudinary.com domain is configured in next.config.js for image loading.
📄 License
MIT