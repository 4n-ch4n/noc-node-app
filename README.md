# dev
## Getting Started

This project follows the Repository Pattern and Clean Architecture principles to ensure scalability, maintainability, and testability.

### Steps to Set Up the Project

1. Clone the `env.template` file and rename it to `.env`.
2. Configure the environment variables in the `.env` file according to your setup.

### Project Structure

The project is organized as follows:

- **Domain**: Contains the core business logic and entities.
- **Application**: Includes use cases and service interfaces.
- **Infrastructure**: Handles external concerns like database access and API integrations.
- **Presentation**: Manages the user interface.

### Key Features

- Decoupled layers for better separation of concerns.
- Easy to test and extend due to adherence to Clean Architecture principles.
- Repository Pattern for abstracting data access logic.

### Running the Project

1. Install dependencies:
  ```bash
  npm install
  ```
2. Start the development server:
  ```bash
  npm run dev
  ```
3. Run tests:
  ```bash
  npm test
  ```