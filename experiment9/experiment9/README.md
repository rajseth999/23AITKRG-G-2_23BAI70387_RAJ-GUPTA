# Experiment 9 – Secure & Scalable Full Stack System

## Overview
A complete full-stack application demonstrating:
- **Spring Security** with JWT filter chain
- **OAuth2** Google Login with auto-provisioning
- **Role-Based Access Control (RBAC)** – ADMIN / MODERATOR / USER
- **JPA performance optimization** – batching, paging, projections, indexes, HikariCP
- **CORS** configured for React frontend
- **React** frontend with protected routes

---

## Project Structure

```
experiment9/
├── backend/                  ← Spring Boot application
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/experiment9/
│       │   ├── SecureScalableApp.java       ← Entry point
│       │   ├── config/
│       │   │   ├── SecurityConfig.java      ← Filter chain, CORS, OAuth2, RBAC
│       │   │   └── DataInitializer.java     ← Seed roles, users, products
│       │   ├── controller/
│       │   │   ├── AuthController.java      ← /api/auth/login, /register
│       │   │   ├── ProductController.java   ← CRUD with RBAC + pagination
│       │   │   ├── UserController.java      ← /api/users/me, admin list
│       │   │   └── TestController.java      ← RBAC demo endpoints
│       │   ├── model/
│       │   │   ├── User.java
│       │   │   ├── Role.java / ERole.java
│       │   │   ├── Product.java
│       │   │   └── AuthProvider.java
│       │   ├── repository/
│       │   │   ├── UserRepository.java      ← JOIN FETCH to avoid N+1
│       │   │   ├── RoleRepository.java
│       │   │   └── ProductRepository.java   ← Pagination, projections
│       │   └── security/
│       │       ├── JwtUtils.java            ← Generate & validate JWT
│       │       ├── AuthTokenFilter.java     ← Reads Bearer token per request
│       │       ├── AuthEntryPointJwt.java   ← 401 JSON response
│       │       ├── UserDetailsImpl.java
│       │       ├── UserDetailsServiceImpl.java
│       │       └── OAuth2AuthenticationSuccessHandler.java
│       └── resources/
│           └── application.properties
│
└── frontend/                 ← React application
    ├── package.json
    ├── public/index.html
    └── src/
        ├── App.js                           ← Routes
        ├── index.js
        ├── services/
        │   ├── api.js                       ← Axios + JWT interceptors
        │   └── AuthContext.js               ← Global auth state
        ├── components/
        │   ├── Navbar.js
        │   └── PrivateRoute.js              ← Route guard with role check
        └── pages/
            ├── LoginPage.js
            ├── RegisterPage.js
            ├── OAuth2CallbackPage.js
            ├── ProductsPage.js              ← Paginated CRUD
            ├── ProfilePage.js               ← RBAC live test
            ├── AdminPage.js
            └── OtherPages.js
```

---

## Prerequisites

| Tool | Version |
|------|---------|
| Java | 17+ |
| Maven | 3.8+ |
| Node.js | 18+ |
| npm | 9+ |

---

## Running the Backend

```bash
cd backend
mvn spring-boot:run
```

Backend starts on **http://localhost:8080**

**Auto-seeded demo accounts:**

| Username | Password | Role |
|----------|----------|------|
| admin | Admin@123 | ADMIN + USER |
| moderator | Mod@123 | MODERATOR + USER |
| user | User@123 | USER |

**H2 Console:** http://localhost:8080/h2-console  
JDBC URL: `jdbc:h2:mem:experiment9db`

---

## Running the Frontend

```bash
cd frontend
npm install
npm start
```

Frontend starts on **http://localhost:3000**

---

## Google OAuth2 Setup (Optional)

1. Go to https://console.cloud.google.com/
2. Create a project → APIs & Services → Credentials → OAuth 2.0 Client ID
3. Authorized redirect URI: `http://localhost:8080/oauth2/callback/google`
4. Copy your Client ID and Secret into `application.properties`:

```properties
spring.security.oauth2.client.registration.google.client-id=YOUR_CLIENT_ID
spring.security.oauth2.client.registration.google.client-secret=YOUR_CLIENT_SECRET
```

---

## API Endpoints

### Auth
| Method | URL | Access | Description |
|--------|-----|--------|-------------|
| POST | /api/auth/login | Public | Login, returns JWT |
| POST | /api/auth/register | Public | Register new user |
| GET | /oauth2/authorize/google | Public | Start Google OAuth2 |

### Products
| Method | URL | Access | Description |
|--------|-----|--------|-------------|
| GET | /api/products | Authenticated | Paginated list |
| GET | /api/products/search?keyword= | Authenticated | Search by name |
| GET | /api/products/{id} | Authenticated | Single product |
| POST | /api/products | ADMIN / MODERATOR | Create product |
| PUT | /api/products/{id} | ADMIN / MODERATOR | Update product |
| DELETE | /api/products/{id} | ADMIN only | Delete product |

### Users
| Method | URL | Access | Description |
|--------|-----|--------|-------------|
| GET | /api/users/me | Authenticated | Current user profile |
| GET | /api/users | ADMIN only | All users |

### RBAC Test
| Method | URL | Access |
|--------|-----|--------|
| GET | /api/public/hello | Public |
| GET | /api/user/profile | USER / MOD / ADMIN |
| GET | /api/mod/dashboard | MOD / ADMIN |
| GET | /api/admin/dashboard | ADMIN only |

---

## Key Security Concepts Demonstrated

### 1. JWT Filter Chain
`AuthTokenFilter` runs before every request, validates the Bearer token, and
sets the `SecurityContext` — no session needed.

### 2. OAuth2 Flow
Google redirects back to `/oauth2/callback/google` → `OAuth2AuthenticationSuccessHandler`
provisions the user (if new) with `ROLE_USER`, generates a JWT, and redirects
to the React frontend with `?token=...`.

### 3. RBAC with `@PreAuthorize`
```java
@DeleteMapping("/{id}")
@PreAuthorize("hasRole('ADMIN')")   // Only ADMIN can delete
public ResponseEntity<Void> deleteProduct(...) { ... }
```

### 4. JPA Performance Techniques
- `JOIN FETCH` to avoid N+1 on user → roles
- `Pageable` for server-side pagination (never load all rows)
- Projection query returning only `id, name, price`
- `@Index` on `products.name` and `products.category`
- HikariCP connection pool with tuned `maximum-pool-size`
- Hibernate batch inserts: `jdbc.batch_size=20`

### 5. CORS Configuration
Only `http://localhost:3000` is allowed as origin.
Credentials and specific headers are explicitly permitted.

---

## Production Checklist
- [ ] Replace H2 with PostgreSQL / MySQL in `application.properties`
- [ ] Move JWT secret to environment variable (never hardcode)
- [ ] Set `spring.jpa.hibernate.ddl-auto=validate` (not `create-drop`)
- [ ] Enable HTTPS / TLS on backend
- [ ] Set `app.frontend.url` to your real domain for CORS
- [ ] Add refresh token endpoint for long-lived sessions
