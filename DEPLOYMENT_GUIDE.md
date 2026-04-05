# 🚀 Step-by-Step Deployment Guide (100% Free / No CC)

Follow these three stages to move your portfolio from your local machine to the cloud forever using Neon, Render, and Vercel.

---

## Phase 1: The Database (Neon.tech)
1. **Sign Up**: Go to [Neon.tech](https://neon.tech/) and click **"Sign up with GitHub"**.
2. **Create Project**: Name it `Portfolio`. 
3. **Get Connection Details**:
   - In your Neon Dashboard, look for the **Connection String** dropdown.
   - Choose **Parameters only**.
   - You need three values:
     - **Host**: (e.g., `ep-cool-water-123.us-east-2.aws.neon.tech`)
     - **Username**: (e.g., `ashutoshdwivedi`)
     - **Password**: (The one Neon showed you or you created).
   - **Database Name**: `neondb` (Default).

---

## Phase 2: The Backend (Render.com)
1. **Sign Up**: Go to [Render.com](https://render.com/) and click **"GET STARTED FOR FREE"**. Sign up with GitHub. (Render does not require a credit card for the Free tier).
2. **Create New Web Service**:
   - Click **New +** -> **Web Service**.
   - Connect your GitHub repository.
3. **Configure Service**:
   - **Name**: `portfolio-backend`.
   - **Root Directory**: `backend` *(This is critical so Docker finds your `src` and `pom.xml` files)*.
   - **Runtime**: Select **Docker**.
   - **Dockerfile Path**: `Dockerfile` (or `backend/Dockerfile` depending on the UI prompt).
   - **Instance Type**: Ensure **Free** is selected.
4. **Environment Variables**:
   - Click **Advanced** -> **Add Environment Variable**.
   - Add these three:
     - `SPRING_DATASOURCE_URL`: `jdbc:postgresql://<your-neon-host>:5432/neondb?sslmode=require`
     - `SPRING_DATASOURCE_USERNAME`: `<your-neon-user>`
     - `SPRING_DATASOURCE_PASSWORD`: `<your-neon-password>`
5. **Deploy**: Click **Create Web Service**. 
6. **Get your App URL**: Once it shows "Live", copy the URL (e.g., `https://portfolio-backend.onrender.com`).

---

## Phase 3: The Frontend (Vercel)
1. **Sign Up**: Go to [Vercel.com](https://vercel.com/) and **"Sign up with GitHub"**.
2. **Import Project**:
   - Click **Add New** -> **Project**.
   - Import your GitHub repository.
3. **Configure Project**:
   - **Root Directory**: Click `Edit` and select the `frontend` folder.
   - **Framework Preset**: Should auto-detect as Next.js.
4. **Environment Variables**:
   - Add a new variable:
     - **Key**: `NEXT_PUBLIC_BACKEND_URL`
     - **Value**: `https://portfolio-backend.onrender.com/api/v1` *(Use your Render URL + /api/v1)*.
5. **Deploy**: Click **Deploy**.

---

### Done! 🎉 
Your portfolio is now live. Note that Render's Free tier "sleeps" after 15 minutes of inactivity. The first time you visit the site after it sleeps, it may take 30-60 seconds for the backend to wake up. This is a common and expected behavior for free hosting!
