# demo

## Architecture

* src/handler (inbound): Handlers responsible for parsing requests, calling the service, and sending responses. No business logic.
* src/api (domain types): Contains all the shared domain types.
* src/service (business logic): Contains all the business logic. Any required outbound calls go through the client layer.
* src/client (outbound): Contains the interfaces (e.g., `IUserRepository`) and their concrete implementations (e.g., `PostgresUserRepository`) for all outbound communication (whether that's database or other external dependencies).

## Testing

1. Unit Tests (`npm test`)
    * Target: Service Layer
    * Goal: Test all business logic in isolation
    * Method: Mock all outbound dependencies
2. Integration Tests (`npm run test:integration`)
    * Target: Inbound Layer
    * Goal: Test the full slice from request to the database and back.
    * Method: Use `supertest` to send real requests to the running app, which connects to a real Postgres database (running in Docker)

## How to Run

1. `docker-compose up`
2. `cp .env.example .env` (and edit if necessary)
3. `npm i`
4. `npm run dev`