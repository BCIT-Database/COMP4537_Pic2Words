# Project Requirements Checklist

## Overall Requirements

- [x] API server providing services through API.
- [x] Client web app that consumes API services.
- [x] Server uses at least one pre-trained AI/ML model from HuggingFace (hosted locally if downloaded).
- [x] Client and server hosted on different origins.
- [ ] Authentication with httpOnly cookies and JWT (no third-party APIs for authentication).
- [ ] Admin and user pages implemented.
- [ ] API documentation created using Swagger (e.g., `myAPIserver.xyz/API/v1/docs`).

## Authentication

- [ ] User registration implemented on client app with server-side authentication.
- [ ] Each user receives 20 free API calls, after which an appropriate warning is displayed.
- [ ] Authentication is token-based, using httpOnly cookies and JWT.
- [ ] Secure and follows standard practices.

## Security and Robustness

- [ ] Protection against SQL injection.
- [ ] Protection against XSS attacks.
- [ ] Password hashing before storage in the database.
- [ ] Proper CORS and header settings on the server.
- [ ] User roles: `admin` and `user`.
- [ ] User API consumption visible upon login.
- [ ] Admin can monitor user API consumption and API call stats.
- [ ] JWT secret key stored securely (environment variable preferred but optional).

## API Server Requirements

- [ ] Server and client hosted on different origins.
- [ ] Minimum 8 endpoints created.
  - [ ] At least two POST endpoints.
  - [ ] At least one DELETE endpoint.
  - [ ] At least one PUT/PATCH endpoint.
  - [ ] At least one GET endpoint.
- [ ] CRUD operations on data in DB:
  - [ ] Create using POST.
  - [ ] Read using GET.
  - [ ] Update using PUT or PATCH.
  - [ ] Delete using DELETE.
- [ ] All connections/requests done over HTTPS.
- [ ] JSON format for payloads.

## Client App Requirements

### Admin Page

- [ ] Displays API stats for each endpoint in a table.
  - [ ] Shows method, endpoint, and request count.
- [ ] Shows user API usage breakdown in a table.
  - [ ] Columns: User name, Email, Token (optional), Total requests.

### User Page

- [ ] Displays user's API consumption upon login.

## Additional Client App Requirements

- [ ] Utilizes all API endpoints.
- [ ] Somewhat mobile-friendly UX.
- [ ] Appropriate HTTP status codes sent by server and displayed on client.
- [ ] Descriptive user messages.
- [ ] All user message strings stored in a separate file.

## Database Design

- [ ] Separate tables for different entities (e.g., users, API usage stats).
- [ ] Each column serves a single purpose.
- [ ] Proper primary keys (unique integers preferred).

## API Documentation

- [ ] API documentation created using Swagger.
- [ ] Includes descriptions, URIs, available HTTP methods, and sample JSON representations.
- [ ] API documentation accessible at `example.com/doc`.

## API Versioning

- [ ] Proper API versioning (e.g., `http://api.example.com/v1`).

## Input Validation

- [x] Email format validation.
- [x] Number validation where appropriate.
- [ ] Input validation performed server-side for security.

## Attribution

- [ ] Proper attribution to ChatGPT or any resources in the Learning Hub and in the source code.

## Code Quality and Organization

- [ ] Modular folder structure (separate folders for HTML, JS, CSS).
- [ ] Clean code: good organization and modularity.
- [ ] All user message strings stored in a separate file.
- [ ] Variable declaration uses `const` first, then `let` (no `var`).
- [ ] Functions use arrow syntax where possible.
- [ ] OOP principles applied (e.g., classes for organization).
- [ ] Functions limited to single responsibility.
- [ ] Functions limited to 15 lines or fewer.

---

## Optional Recommendations(extra credit)

- [ ] Implement OOP principles.
- [ ] Use arrow functions for all function declarations.
- [ ] Ensure each function does one thing (single responsibility).
- [ ] Keep function declarations short (ideally under 15 lines).
