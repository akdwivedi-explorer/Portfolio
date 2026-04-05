# Full-Stack Portfolio

A highly performant, CMS-driven portfolio engineered for scale and aesthetic excellence. 
Built using a modern microservice-inspired architecture separating the presentation layer from a robust Java backend.

## Tech Stack
*   **Frontend**: Next.js 16 (App Router), React, Tailwind CSS, Framer Motion
*   **Backend**: Java 21, Spring Boot 3.4, Spring Security, Spring Data JPA
*   **Database**: PostgreSQL
*   **DevOps**: Docker, Docker Compose, Kubernetes (K3s/Minikube)

---

## 🚀 Quick Start (Local Development)

### Approach 1: Using Docker Compose (Recommended)
You can spin up the entire architecture (PostgreSQL, Spring Boot Backend, Next.js Frontend) using a single command:
```bash
docker-compose up --build
```
*   **Frontend**: http://localhost:3000
*   **Backend API**: http://localhost:8080/api/v1
*   **Database**: localhost:5432

### Approach 2: Manual Start
1.  **Start the Database**: Ensure PostgreSQL is running locally on port `5432` with a database named `portfolio`.
2.  **Start the Backend**:
    ```bash
    cd backend
    ./mvnw spring-boot:run
    ```
3.  **Start the Frontend**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

---

## 🔐 Admin Console
Navigate to `http://localhost:3000/admin`.
*   **Default Username**: `ashutosh.dwivedi604@gmail.com`
*   **Default Password**: `Ak@123456`
*(Change these credentials in the backend environment variables before deploying to production).*

---

## 🏗️ Deployment (100% Free, No Credit Card Required)

This project is built to accommodate multiple deployment strategies. If you do not have a credit card, you can still host this architecture for completely free.

### Strategy 1: The DevOps Flex (Local Kubernetes + Tunnels)
To showcase your Kubernetes skills without paying for a cloud provider, you can run the cluster locally on your own machine and expose it to the internet securely.
1. Install [Minikube](https://minikube.sigs.k8s.io/) or [Docker Desktop](https://www.docker.com/products/docker-desktop/) with Kubernetes enabled.
2. Apply your manifests from the `/k8s` folder.
   ```bash
   kubectl apply -f k8s/postgres.yaml
   kubectl apply -f k8s/backend.yaml
   kubectl apply -f k8s/frontend.yaml
   ```
3. Expose your cluster using a free tunneling service that requires no credit card, such as **[Pinggy.io](https://pinggy.io/)**, **Localtunnel**, or **Ngrok**. 
   ```bash
   # Example using Pinggy to expose your frontend service:
   ssh -p 443 -R0:localhost:3000 a.pinggy.io
   ```
   *This immediately gives you a public HTTPS URL you can put on your resume!*

### Strategy 2: The Modern PaaS Architecture (Truly Permanent & Free)
If you want to host it permanently in the cloud without managing Kubernetes and without a credit card, split the services across these highly stable, generous free tiers:

1. **Database: [Neon.tech](https://neon.tech/)**
   - Provides a fully managed Serverless Postgres database. 100% free, sign up with GitHub.
   - Copy the connection string it gives you (e.g. `postgresql://user:pass@ep-cool-cloud-123.neon.tech/portfolio`).

2. **Backend: [Hugging Face Spaces](https://huggingface.co/new-space)**
   - Hugging Face allows you to run **any Docker container** for free on their "CPU Basic" hardware. Zero credit card required!
   - Create a new Space, select the **Docker** SDK, and set it to **Public**.
   - Under Settings, add your environment variables:
     - `SPRING_DATASOURCE_URL`: `jdbc:postgresql://<your-neon-host>:5432/portfolio?sslmode=require`
     - `SPRING_DATASOURCE_USERNAME`: `your-neon-user`
     - `SPRING_DATASOURCE_PASSWORD`: `your-neon-password`

3. **Frontend: [Vercel](https://vercel.com/)**
   - The best way to host Next.js. 100% free for personal use.
   - Import your GitHub repo, set the **Root Directory** to `frontend/`.
   - Add the Environment Variable `NEXT_PUBLIC_BACKEND_URL` pointing to your Hugging Face space URL (e.g. `https://username-space-name.hf.space/api/v1`).


---
## License
MIT
