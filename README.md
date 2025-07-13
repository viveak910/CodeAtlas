# CodeAtlas   ![Build Status](https://img.shields.io/badge/build-passing-brightgreen) [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Overview 📖

**CodeAtlas** is a competitive programming analytics dashboard that aggregates and displays a user's programming contest statistics in one place. The project allows users to enter their handles for popular competitive programming platforms (currently **CodeForces** and **LeetCode**) and then visualizes their performance statistics, rankings, and progress. The system fetches data from the platforms' APIs and presents insights like problem-solving counts, contest ratings, ranks, and more in an easy-to-read dashboard.

This project is particularly useful for students and competitive programming enthusiasts to track their progress across platforms, compare with peers (via a leaderboard), and identify areas for improvement. It was originally developed as a DBMS course project and showcases a full-stack implementation with persistent storage and a modern web UI.

## Features ✨

* **Unified Profile Analytics:** Enter your CodeForces handle and LeetCode username (plus a custom user ID and college name) to generate a combined profile. The backend will fetch your latest stats from both platforms and create a consolidated profile record. Key metrics include:

  * *CodeForces:* Current rating, max rating, current rank, max rank achieved.
  * *LeetCode:* Total problems solved out of total, problems solved by difficulty (easy/medium/hard), acceptance rate, global ranking.
* **Visualizations:** The frontend provides interactive visual components to display your stats. For example, pie charts or bars for LeetCode solve distribution (easy/medium/hard), line charts for CodeForces rating over time, and other performance graphs (handled in the `PerformanceGraphs.tsx` component). This helps in visual analysis of your strengths and progress.
* **Leaderboard:** A leaderboard page lists all users who have profiles in the system, allowing comparison. Users can be ranked (e.g., by CodeForces rating or LeetCode solved count) and filtered by college or other criteria. This is useful for college contests or group comparisons.
* **Data Persistence:** Profile data is stored in a PostgreSQL database via JPA entities, so your history is saved. Each time a profile is added, it is saved as a record (with a unique ID) in the `competitive_profile` table, and user handle info in the `app_user` table. This means the leaderboard and profiles persist across sessions, and you can retrieve profiles later without re-fetching from external APIs every time.
* **Real-time Fetching:** When creating a profile, the system pulls fresh data from live APIs (CodeForces official API, and LeetCode via their API or scraping) so the statistics are up-to-date. The backend uses dedicated service modules for this (e.g., `CodeforcesService` and `LeetCodeService`) which handle making HTTP requests and parsing the JSON responses.
* **REST API:** The backend exposes a clean RESTful API (documented below) so the data can be accessed or integrated easily. This API is used by the React frontend, but can also be used by other clients.
* **Ease of Use:** Frontend form validation ensures that inputs (usernames, etc.) are provided, and error handling is implemented for cases like "user not found" or external API failure. The UI is built with a responsive design (using Tailwind CSS), so it works on mobile and desktop.
* **Extensible:** The modular architecture allows adding more platforms (e.g., HackerRank, AtCoder) by adding new service and controller logic. The database schema can accommodate additional fields or tables if needed. The code is organized to separate platform-specific logic in services, making it easier to extend.

## Tech Stack 🛠

**Frontend:** The client-side is built with **TypeScript** and **React** (bootstrapped with Vite). It uses **Tailwind CSS** for styling, enabling a modern, responsive UI. The project structure suggests a focus on component reusability and state management via React hooks (e.g., form input state, fetched data state). Key tools and libraries include:

* **React + Vite:** Fast development environment and bundle for a React app in TypeScript. The source is in the `codeatlas-frontend` directory, with an `index.html` and entry point `main.tsx` mounting the React app.
* **TypeScript:** Provides static typing for reliability. All React components (`.tsx` files) and utility modules are written in TypeScript. Shared types (for profile data, etc.) are defined under `src/types/index.ts` for consistency between components.
* **Tailwind CSS:** Used for quickly styling the components with utility classes. The presence of `tailwind.config.js` and usage in CSS suggests that styling is largely done using Tailwind's utility-first classes, ensuring the UI is clean and customizable.
* **Charts & Visualization:** The `PerformanceGraphs.tsx` component indicates that graphical representations of data are included. Likely a library (such as Chart.js, Recharts, or similar) is used under the hood to render charts for user stats, although the specific library isn't explicitly listed in the snippet. These graphs display things like the distribution of solved problems or rating changes over time.

**Backend:** The server is a **Java 17+** application built with **Spring Boot**. It is a RESTful application following typical Spring Boot project structure. Key technologies and frameworks:

* **Spring Boot & Spring MVC:** Powers the REST API. Controllers are annotated with `@RestController` and handle routes for profile creation and retrieval. Spring makes it easy to map JSON requests to Java objects (e.g., using `@RequestBody` to parse incoming JSON into a `UserHandle` object).
* **Spring Data JPA:** Used for database interactions. Entities like `CompetitiveProfile` and `UserHandle` are annotated with `@Entity` and are mapped to tables in Postgres. Repositories extend `JpaRepository` (e.g., `CompetitiveProfileRepository`) to provide CRUD operations without boilerplate SQL. A custom finder method `findAllByUserId` is defined to query profiles by the user’s ID.
* **Database:** **PostgreSQL** is the primary database. The application uses the PostgreSQL JDBC driver and expects a running Postgres instance. Connection details (URL, username, password) are configured in `application.properties`. By default, it uses a local Postgres with database name, user **postgres**, and password **mysecret** (these can be changed per environment). The backend creates tables for the entities on startup (via JPA auto DDL).
* **External API clients:** The backend service layer (classes `CodeforcesService` and `LeetCodeService`) handles fetching data from the respective external APIs. For CodeForces, it calls the official **CodeForces API** (e.g., `https://codeforces.com/api/user.info?handles=...`) to get user info. For LeetCode, it likely calls an unofficial API or uses web scraping/GraphQL to retrieve user stats (such as via LeetCode's GraphQL endpoint). The JSON responses are parsed using the org.json library – we see usage of `JSONObject` to parse and extract fields. This avoids needing to create separate DTO classes for the external data.
* **Logging & Error Handling:** The backend uses SLF4J/Logback (Spring Boot default) for logging. In the Profile generation flow, it logs warnings if the external data is missing or in an unexpected format, and errors if fetch fails. This helps in debugging issues with external API calls or data parsing.
* **CORS Configuration:** To enable the React frontend (which typically runs on a different port/domain in development) to call the APIs, CORS is enabled for all origins in development. The `WebConfig` class (annotated with `@Configuration`) implements `WebMvcConfigurer` to allow all origins and methods for the API endpoints. This is important for local testing (and can be tightened in production as needed).

**Overall Stack:** This is a classic **RESTful web application** with a clear separation of concerns – a TypeScript/React frontend for the user interface, and a Java/Spring Boot backend providing a JSON API with persistence. The two are decoupled and communicate over HTTP (e.g., the React app calls `POST /profile` to create a profile, etc.). The choice of Spring Boot and React ensures scalability: more features (or more competitive programming sites) can be integrated with minimal friction.

## Project Structure 📁

The repository is organized into two main parts: the backend server and the frontend client. Below is a high-level overview of the directory structure and key files:

```plaintext
CodeAtlas/
├── backend/                   # Spring Boot backend (Maven project)
│   ├── pom.xml                # Maven configuration (dependencies, build settings)
│   ├── mvnw, mvnw.cmd         # Maven Wrapper scripts for Linux/Windows
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/dbms/CodeAtlas/
│   │   │   │   ├── controller/      # REST Controllers 
│   │   │   │   │   ├── ProfileController.java    # Handles profile creation (fetch & save):contentReference[oaicite:33]{index=33}:contentReference[oaicite:34]{index=34}
│   │   │   │   │   ├── AllController.java        # Handles retrieval of profiles & leaderboard:contentReference[oaicite:35]{index=35}:contentReference[oaicite:36]{index=36}
│   │   │   │   │   ├── CodeforcesController.java # (Optional) Endpoints for CodeForces data (if used)
│   │   │   │   │   └── LeetCodeController.java   # (Optional) Endpoints for LeetCode data (if used)
│   │   │   │   ├── model/           # JPA Entities (data models)
│   │   │   │   │   ├── UserHandle.java          # Entity for storing user handles (CF handle, LC username, etc.):contentReference[oaicite:37]{index=37}:contentReference[oaicite:38]{index=38}
│   │   │   │   │   └── CompetitiveProfile.java  # Entity for combined profile stats (fields for CF and LC stats):contentReference[oaicite:39]{index=39}:contentReference[oaicite:40]{index=40}
│   │   │   │   ├── repository/      # Data repositories
│   │   │   │   │   ├── UserHandleRepository.java        # Interface for UserHandle DB operations
│   │   │   │   │   └── CompetitiveProfileRepository.java # Interface for CompetitiveProfile DB operations:contentReference[oaicite:41]{index=41}:contentReference[oaicite:42]{index=42}
│   │   │   │   ├── service/         # Services for external API calls and business logic
│   │   │   │   │   ├── CodeforcesService.java   # Fetches data from CodeForces API (user info, etc.)
│   │   │   │   │   └── LeetCodeService.java     # Fetches data from LeetCode (using GraphQL or scraping)
│   │   │   │   └── CodeAtlasApplication.java    # Main application entry point (Spring Boot initializer)
│   │   │   └── resources/
│   │   │       ├── application.properties      # Backend configuration (DB URL, credentials, etc.):contentReference[oaicite:43]{index=43}
│   │   │       └── ... (other config files if any)
│   │   └── test/                # (Optional) Test classes
│   │       └── ... (e.g., CodeAtlasApplicationTests.java)
│   └── README.md (optional)    # (If present, documentation related to backend)
├── codeatlas-frontend/         # React + Vite frontend (Node.js project)
│   ├── public/ or index.html   # HTML template for React app (Vite serves this)
│   ├── src/
│   │   ├── pages/              # Page components corresponding to routes
│   │   │   ├── HomePage.tsx           # Home/landing page (overview or welcome)
│   │   │   ├── ProfilePage.tsx        # Page to input handles and view profile stats
│   │   │   └── LeaderboardPage.tsx    # Page displaying the leaderboard of profiles
│   │   ├── components/         # Reusable UI components 
│   │   │   ├── ProfileForm.tsx        # Form to input userId, CodeForces and LeetCode handles, etc.
│   │   │   ├── ProfileStats.tsx       # Component to display combined profile statistics (uses charts, etc.)
│   │   │   ├── LeaderboardTable.tsx   # Table to display list of profiles (sortable, filterable by college)
│   │   │   ├── PerformanceGraphs.tsx  # Visual graphs for performance (e.g., rating history, solve distribution)
│   │   │   └── Navigation.tsx         # Navbar or header component for navigation between pages
│   │   ├── services/           # Modules for API calls and data handling
│   │   │   ├── api.ts                 # Functions to call backend API endpoints (using fetch/axios)
│   │   │   └── mockApi.ts             # Mock data for testing UI without backend (dummy responses)
│   │   ├── types/              # TypeScript type definitions 
│   │   │   └── index.ts              # Shared interfaces/types (e.g., CompetitiveProfile type matching backend)
│   │   ├── App.tsx             # Root React component defining routes or layout
│   │   ├── main.tsx            # React entry point that bootstraps the app
│   │   └── index.css           # Global CSS (includes Tailwind's base imports)
│   ├── package.json            # Frontend NPM dependencies and scripts (React, Vite, Tailwind, etc.)
│   ├── vite.config.ts          # Vite configuration for bundling the app
│   ├── tailwind.config.js      # Tailwind CSS configuration (theme customization)
│   ├── .eslintrc or eslint.config.js # ESLint configuration for code linting
│   └── README.md (optional)    # (If present, documentation related to frontend)
├── LICENSE                     # MIT License file:contentReference[oaicite:44]{index=44}:contentReference[oaicite:45]{index=45}
└── README.md                   # (Top-level README for the project – you are reading it!)
```

**Note:** The project was later restructured to nest the backend code under a `/backend` folder and the frontend under `/codeatlas-frontend`. Originally, the repository started with only the backend, and the frontend was added in a later commit. This structure cleanly separates the two applications.

## Setup and Local Development ⚙️

To run CodeAtlas on your local machine for development or testing, follow these steps:

### Prerequisites

* **Java Development Kit (JDK) 17 or later** – The backend is built with Java/Spring Boot. Ensure `java --version` is 17+.
* **Apache Maven** – Used to build and run the Spring Boot application. (If you don't have Maven installed, you can use the provided Maven Wrapper scripts `./mvnw` on Unix or `mvnw.cmd` on Windows.)
* **Node.js and npm** – The frontend requires Node.js (recommend v16+ or latest LTS) and npm (comes with Node) to install packages and run the dev server.
* **PostgreSQL** – A running Postgres database instance. You can install Postgres locally or use Docker. By default the app expects a database on `localhost:5432` with a database name and user **postgres** (password **mysecret**). If your setup differs, you'll need to update the Spring Boot configuration.

### Backend: Running the Spring Boot server

1. **Database setup:** Make sure PostgreSQL is running and create a database (e.g., named `codeatlas` or use the default `postgres` DB). Update the `backend/src/main/resources/application.properties` if needed with your DB name/credentials. For example:

   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/codeatlas
   spring.datasource.username=postgres
   spring.datasource.password=mysecret
   # (These defaults are already set in the file; adjust if your DB uses different user/pw)
   spring.jpa.hibernate.ddl-auto=update
   ```

   The last line ensures that JPA will create/update tables automatically. On first run, it will create tables like `competitive_profile` and `app_user` as needed.

2. **Build & run the backend:** In the project root (where the `backend/` folder is located), start the Spring Boot application. You can do this via Maven:

   ```bash
   cd backend
   # If Maven is installed:
   mvn spring-boot:run
   # If using Maven Wrapper:
   ./mvnw spring-boot:run
   ```

   This will compile the code and launch the server on **[http://localhost:8080](http://localhost:8080)** by default. You should see in the console logs that the application has started.
   Alternatively, you can build the JAR and run it:

   ```bash
   mvn package
   java -jar target/CodeAtlas-0.0.1-SNAPSHOT.jar   # filename may vary
   ```

3. **Verify API is running:** Once the backend is up, you can test it quickly by accessing the test endpoint. Open a browser or use curl:

   ```bash
   curl http://localhost:8080/hello
   ```

   This should return `"hello world"` (a simple test endpoint). If you get that response, the backend is running correctly.

### Frontend: Running the React app

1. **Install dependencies:** Open a new terminal, go to the `codeatlas-frontend` directory, and install NPM packages:

   ```bash
   cd codeatlas-frontend
   npm install
   ```

   This will download all required packages as specified in `package.json` (React, Tailwind, etc.).

2. **Configure environment:** By default, the React app will likely call the backend at `http://localhost:8080` (since CORS is enabled for all origins in dev). If the backend is on a different host/port, you might need to adjust the API base URL in the frontend code (possibly in a config or in the `api.ts` service file).

3. **Start the development server:** Run:

   ```bash
   npm run dev
   ```

   This starts the Vite development server. By default, it will open the app at **[http://localhost:5173](http://localhost:5173)** (or another port, which it will display in the console). The app will automatically reload if you edit any source files.

4. **Open the app:** If it didn’t open automatically, navigate to the URL (usually [http://localhost:5173](http://localhost:5173)). You should see the CodeAtlas front page. From here, you can navigate to the profile creation page or whichever UI is set as home.

5. **Using the app:** Enter a **User ID** (this is just an identifier for the profile within CodeAtlas, e.g., your name or alias), your CodeForces handle, your LeetCode username, and your college (optional) in the Profile form, then submit (e.g., click "Add Profile"). The app will send a request to the backend to fetch data. If everything is configured correctly, you should see your combined profile stats displayed. You can then view the **Leaderboard** page to see the entry added (and any others).

**Note:** On the first run, the database will be empty. Adding a profile via the form will create the entry in the database. You can add multiple profiles (for different users) to populate the leaderboard. The data fetch might take a couple of seconds if calling external APIs. In case of any errors (e.g., a wrong username), the app should handle it (check for error messages near the form or in the browser console/network).

### Troubleshooting

* If the backend fails to start, check the console for errors. Common issues are incorrect database configuration (e.g., wrong password) or port conflicts. Adjust `application.properties` or free the port 8080 if needed.
* If the frontend cannot reach the backend (you see network errors in browser dev tools), ensure the backend is running on the correct port and not blocked by firewall. Also confirm that the frontend is indeed calling the correct URL. During development, since both are on localhost but different ports, the CORS config in backend should allow it (which we have configured).
* To test the backend independently, you can use tools like Postman or curl to hit the API endpoints (documented below) with sample data.

## Production Deployment 🚀

For production, you will want to deploy both the backend and frontend, possibly on separate hosting or together. Here are some recommended strategies:

**1. Deploying Backend (Spring Boot API):**
You can package the backend as a self-contained JAR (via `mvn package`) and deploy it on any server or cloud service that supports Java. Popular options include:

* **Cloud Platforms:** AWS (Elastic Beanstalk or an EC2 VM), Heroku, Google Cloud Run, Microsoft Azure, etc. These can run the JAR or containerize it.

* **Containerization:** Create a Docker image for the backend and run it in a container environment. For example, use an official OpenJDK base image. A sample Dockerfile could be:

  ```Dockerfile
  FROM maven:3.8.7-openjdk-17 AS build
  WORKDIR /app
  COPY backend/pom.xml . 
  COPY backend/src ./src 
  RUN mvn package -DskipTests

  FROM openjdk:17-jdk-slim
  WORKDIR /app
  COPY --from=build /app/target/CodeAtlas-*.jar app.jar
  EXPOSE 8080
  CMD ["java", "-jar", "app.jar"]
  ```

  This builds the JAR and then runs it in a minimal Java image. You would also set environment variables for `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`, etc., to configure the database in production (or use a **Docker Compose** file to link a Postgres container). Ensure to also handle production-level concerns (like using `spring.profiles.active=prod` and an external `application-prod.properties` for production settings).

* **Database in Production:** You will need a Postgres database in prod. This can be a managed DB service or a Docker container. Update the JDBC URL accordingly. For example, if using a cloud Postgres, set the URL with host, port, and DB name, and ensure the port is open to the backend.

**2. Deploying Frontend (React App):**
The React app is a static Single Page Application after a production build. You have a few choices:

* **Build and host static files:** Run `npm run build` to generate the production static files (in `dist/` by default). These files (HTML, JS, CSS, assets) can be served by any static hosting service (Netlify, Vercel, GitHub Pages, AWS S3 + CloudFront, etc.). For example, you can easily deploy to Netlify by linking your repo or by uploading the `dist` folder. On Vercel, since this is not a Next.js project, you would also deploy it as a static site (Vercel detects Vite and does this automatically).
* **Serve via backend:** Alternatively, you can have the Spring Boot serve the static files. One way is to build the React app and then copy the `dist` contents into `backend/src/main/resources/static/` before building the Spring Boot jar. Spring Boot will then serve the frontend on the same domain (e.g., `GET /` serving `index.html`). This simplifies deployment to a single unit. However, this requires a little setup (perhaps an automated step or Maven plugin to copy files). This approach may be more complex to set up, so many prefer the first option (separate static hosting).
* **Docker (nginx):** Another containerized approach: build the React app, then use an Nginx image to serve the static files. For example, an Nginx Docker image could serve the contents of the React `dist/` folder on port 80. You could then run both the Nginx container (for frontend) and the backend container together (using Docker Compose or in a Kubernetes pod). Ensure the frontend is configured to call the correct backend URL (in production you might set it to the backend's domain name).

**3. Configuration considerations:** In production, you may want to restrict the CORS settings (e.g., only allow the frontend's domain to call the APIs, rather than `*`). You can do this by adjusting `WebConfig` or using Spring properties for allowed origins. Also, make sure to secure any sensitive info (the APIs themselves currently do not require auth since it's just public stats, but if you expanded this to user accounts, you'd add proper authentication).

**4. Domain and SSL:** If deploying frontend and backend separately, you might have them on subdomains (e.g., `app.codeatlas.com` for frontend and `api.codeatlas.com` for backend). Ensure to use HTTPS in production. If both are on the same domain, you can avoid some CORS issues. Tools like Nginx or cloud load balancers can help route traffic.

In summary, CodeAtlas can be deployed like any standard Java web service plus static frontend. Using Docker Compose is a convenient way to tie together the **backend**, **database**, and a static file server for **frontend**:

```yaml
version: '3'
services:
  db:
    image: postgres:13-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=mysecret
      - POSTGRES_DB=codeatlas
    volumes:
      - db_data:/var/lib/postgresql/data
  backend:
    build: backend/.
    ports:
      - "8080:8080"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/codeatlas
      - SPRING_DATASOURCE_USERNAME=postgres
      - SPRING_DATASOURCE_PASSWORD=mysecret
    depends_on:
      - db
  frontend:
    image: nginx:alpine
    volumes:
      - ./codeatlas-frontend/dist:/usr/share/nginx/html:ro
    ports:
      - "80:80"
volumes:
  db_data:
```

In this hypothetical Compose file, the React app is built (ensure to run `npm run build` beforehand, or use a multi-stage Dockerfile for it) and served via Nginx, while the backend connects to the Postgres service. This is just one way; adapt based on your deployment target.

## API Endpoints 📑

The backend exposes a set of RESTful API endpoints. Below is the list of available endpoints with their methods, paths, and descriptions. All endpoints accept and return **JSON** data (except the simple hello test). The base URL assumes your backend server (for local dev, `http://localhost:8080`).

* **POST** **`/profile`** – Create a new Competitive Programming profile.

  * **Description:** Triggers the backend to fetch data from CodeForces and LeetCode for the given usernames, compile the stats, save to the database, and return the combined profile. This is the main endpoint to add a user's data.
  * **Request Body:** JSON object with the following fields:

    * `userId` (string) – A unique identifier for the user/profile within CodeAtlas (can be a username or any ID you choose).
    * `codeforcesUsername` (string) – The user's CodeForces handle.
    * `leetcodeUsername` (string) – The user's LeetCode username.
    * `college` (string) – The user's college or affiliation (for leaderboard filtering).
      *(Additional fields will be ignored; all are required for a complete profile.)*
  * **Response:** JSON object representing the **CompetitiveProfile** created, with fields:

    * `id` – Internal ID of the profile (auto-generated primary key).
    * `userId` – (Echoed from request) the user’s ID.
    * `cfHandle` – CodeForces handle.
    * `cfRating` – Current CodeForces rating.
    * `cfMaxRating` – Highest CodeForces rating achieved.
    * `cfRank` – Current CodeForces title (rank).
    * `cfMaxRank` – Highest CodeForces title achieved.
    * `lcHandle` – LeetCode username.
    * `lcTotalSolved` – Total questions solved on LeetCode.
    * `lcTotalQuestions` – Total questions available (this gives context to the solved count).
    * `lcEasySolved`, `lcMediumSolved`, `lcHardSolved` – Number of easy/medium/hard problems solved.
    * `lcAcceptanceRate` – LeetCode acceptance rate (percentage of submissions that were accepted).
    * `lcRanking` – LeetCode global ranking.
    * `college` – College name (as provided). <br>Additionally, any new profile is persisted in the database (and can be retrieved later via GET endpoints). The response status will be **200 OK** if successful with the profile JSON in the body. If the request data is invalid or an error occurs fetching external data, you may get a 4xx/5xx error with an error message.

  **Sample Request:**

  ```json
  {
    "userId": "john_doe",
    "codeforcesUsername": "johnDoe_CF",
    "leetcodeUsername": "johnDoe123",
    "college": "Example University"
  }
  ```

  **Sample Response:**

  ```json
  {
    "id": 5,
    "userId": "john_doe",
    "cfHandle": "johnDoe_CF",
    "cfRating": 1420,
    "cfMaxRating": 1500,
    "cfRank": "specialist",
    "cfMaxRank": "expert",
    "lcHandle": "johnDoe123",
    "lcTotalSolved": 350,
    "lcTotalQuestions": 2500,
    "lcEasySolved": 150,
    "lcMediumSolved": 160,
    "lcHardSolved": 40,
    "lcAcceptanceRate": 57.8,
    "lcRanking": 123456,
    "college": "Example University"
  }
  ```

  This example shows a possible profile JSON. The actual values depend on the user's real stats. If a user is not found on one of the platforms, the backend may return an error or omit those stats (the implementation currently expects both to exist; error handling will log issues, but the API might still return a profile with whatever data could be fetched).

* **GET** **`/profiles`** – Retrieve all profiles (leaderboard data).

  * **Description:** Returns a list of all competitive profiles currently stored in the system. This is used to display the leaderboard in the frontend.
  * **Request:** No parameters or body. Just a simple GET.
  * **Response:** JSON array of CompetitiveProfile objects. Each object has the same fields as described above (id, userId, cf stats, lc stats, etc.). If no profiles exist, it returns an empty array.
  * **Example:**
    Request: `GET http://<server>/profiles`
    Response:

    ```json
    [
      {
        "id": 5,
        "userId": "john_doe",
        "cfHandle": "johnDoe_CF",
        "cfRating": 1420, ...
        "college": "Example University"
      },
      {
        "id": 6,
        "userId": "jane_smith",
        "cfHandle": "jsmith_cf",
        "cfRating": 1600, ...
        "college": "Another College"
      }
    ]
    ```

    (Two profile objects shown in this example.) The response status is **200 OK** always, even if the list is empty (in which case you just get `[]`). This endpoint corresponds to `AllController.getAllProfiles()` on the backend.

* **GET** **`/profiles/{userId}/stats`** – Retrieve profile(s) by userId.

  * **Description:** Looks up profiles by the given `userId` path variable. This is useful to fetch a specific user's profile or verify if a userId is already taken. Note: In the current design, userId is provided by the user and not guaranteed unique by the system (it's not a primary key, just a field in the CompetitiveProfile). However, it's expected users choose distinct IDs. This endpoint will return any profiles matching that ID.
  * **Request:** `{userId}` should be URL-encoded if it contains special characters. For example, `GET /profiles/john_doe/stats`.
  * **Response:** JSON array of CompetitiveProfile objects that have that `userId`. Typically, this would be either a single-element array (exact match) or empty if not found. If not found, the endpoint currently returns a **404 Not Found** (with no body). If found, returns 200 OK with the array.
  * **Example:**
    Request: `GET /profiles/john_doe/stats`
    Response (if found):

    ```json
    [
      {
        "id": 5,
        "userId": "john_doe",
        "cfHandle": "johnDoe_CF",
        "...": "..."
      }
    ]
    ```

    (If multiple profiles had the same userId by mistake, you would get all of them in the array.) The frontend uses this maybe to fetch the newly created profile or check uniqueness. On the backend, this is handled by `findAllByUserId` method in repository and returns `notFound()` if the result list is empty.

* **GET** **`/hello`** – Simple health-check or test endpoint.

  * **Description:** Returns a plain text "hello world". This was likely used to verify that the server is running and reachable. It does not require any parameters. In production, this could be removed or restricted, but it's harmless.
  * **Response:** 200 OK with content-type text/plain, body: `"hello world"`.

* **(Possible)** **GET** **`/codeforces/{handle}`** – **(Optional/Advanced)** Fetch CodeForces data directly.

  * **Description:** *This endpoint exists in the code (CodeforcesController) but may not be fully utilized by the frontend.* It presumably takes a CodeForces handle and returns some data (possibly the raw API response or a processed subset). Similarly, there might be a `/leetcode/{username}` in LeetCodeController. These were likely created early in development to test fetching functionality before the unified profile was implemented.
  * **Status:** In the final design, these may not be needed since `POST /profile` covers the use case by calling services internally. However, they are part of the codebase. If enabled, you could use them for debugging (e.g., to fetch CodeForces info without touching the database). Implementation details: CodeforcesController might map to `/codeforces` and use `CodeforcesService` to return JSON (perhaps directly returning the string from the API). Use with caution, as they might return data in a different format than the combined profile.
  * **Example:** `GET /codeforces/vivek` (would fetch CodeForces info for user "vivek"). The output would match CodeForces API's format, e.g.,

    ```json
    {
      "status": "OK",
      "result": [ {...user data...} ]
    }
    ```

    (This is speculative; please refer to the actual controller code if you intend to use it.)

**Note:** All API endpoints currently do not require authentication (open API). In a multi-user scenario or production deployment, you might want to add auth (e.g., using Spring Security with JWT or session login) to control who can add or view profiles. As it stands, anyone who can reach the API could potentially add or read data. This is acceptable for a demo or small-scale use but should be addressed if this project is extended for real-world use.

## Contributing 🤝

Contributions are welcome! If you'd like to improve CodeAtlas, follow these guidelines:

* **Issue Tracking:** If you find a bug or have a feature request, please open an issue on GitHub describing the problem or suggestion. Include as much detail as possible (and screenshots/logs if it's a UI or crash issue).
* **Feature Development:** Before spending significant effort on a new feature, it might be good to discuss it in an issue to ensure it aligns with the project goals. We especially welcome contributions like adding support for new competitive programming platforms (e.g., HackerEarth, AtCoder), improving the UI/UX, or optimizing data fetching.
* **Pull Requests:** Fork the repository, create a new branch for your changes (use a descriptive branch name, e.g., `feature/add-atcoder-support`), and commit your changes with clear messages. Ensure that your code builds and the app runs. Then open a Pull Request to the `main` branch of this repo. The PR template (if any) will guide you to provide details about your changes.
* **Code Style:** Try to follow the coding style of the project. For Java backend, use typical Java conventions (naming, formatting). For React/TypeScript, the project includes an ESLint config, so run `npm run lint` (if available) to catch any stylistic issues. We prefer functional React components and hooks. Keep components small and focused.
* **Testing:** If you add new functionality, consider adding tests. The backend has a placeholder for tests; you can add JUnit tests for service methods or controller endpoints. For frontend, you can add React testing library tests if applicable. While this project currently may not have extensive tests, any new contributions should not decrease reliability.
* **Commit Messages:** Use clear, concise commit messages. Start with a short summary (e.g., "Add feature X to do Y"), and include details in the body if needed. This helps maintainers when reviewing history.
* **Sync with Upstream:** If your fork falls behind, rebase or merge upstream main to avoid conflicts. Resolve any merge conflicts locally.
* **Respect License:** By contributing, you agree that your contributions will be under the same MIT License (see below). That ensures the project remains open and free to use.

We appreciate all contributions, big or small. Thanks for helping improve CodeAtlas!

## License 📄

This project is licensed under the **MIT License**. This means you are free to use, modify, and distribute this software as you wish, as long as you include the copyright notice. See the [LICENSE](LICENSE) file for full details.

```
MIT License (c) 2025 Viveak Vagalaboina

Permission is hereby granted, free of charge, to any person obtaining a copy...
```

In summary, you can use this project for personal or commercial purposes. If you do use it or build on it, a shout-out or link back to the original repo would be appreciated but is not required.

## Author 🙍

**Viveak Vagalaboina** – creator and maintainer of CodeAtlas. You can find him on GitHub as [@viveak910](https://github.com/viveak910). This project was initially created as part of an academic endeavor and has been open-sourced for anyone interested in competitive programming analytics. Feel free to reach out or raise an issue if you have questions about the project.

---

*Happy coding, and may your rating always increase!* 🎉👨‍💻👩‍💻
