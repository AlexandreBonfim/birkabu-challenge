# Birkabu Challenge

A system for veterinary medical records. This system allows veterinarians to upload medical records (PDF, images, etc), automatically extracts relevant information and presents it in a structured format.

## Architecture

- **Backend**: Ruby on Rails (API Mode)
  - **Database**: PostgreSQL
  - **Storage**: ActiveStorage (Local)
  - **Processing**: `DocumentProcessorService` (Modular design for text extraction)
  - **Testing**: RSpec

## Features

- **Document Upload**: Upload PDF, JPG, PNG, DOCX files.
- **Automatic Processing**: Extracts data from documents using Regex (MVP).
- **Data Retrieval**: View processed data and document status.

## Getting Started

### Prerequisites

- Docker & Docker Compose

### Installation & Execution

1.  **Clone the repository**

    ```bash
    git clone https://github.com/AlexandreBonfim/birkabu-challenge.git
    cd birkabu-challenge
    ```

2.  **Start the application**

    ```bash
    docker compose up --build
    ```

3.  **Access the application**
    - Frontend: [http://localhost:5173](http://localhost:5173)
    - Backend API: [http://localhost:3000](http://localhost:3000)

### Running Tests

To run the backend test suite:

```bash
docker compose run --rm backend bundle exec rspec
```

## Technical Decisions

- **Ruby on Rails**: Chosen for its robustness and rapid API development capabilities.
- **ActiveStorage**: Used for file handling to abstract storage backend (easy to switch to S3 later).
- **Service Object Pattern**: `DocumentProcessorService` encapsulates the business logic for processing, making it easy to swap the extraction strategy (e.g., to use an LLM) without affecting the controller.
- **TDD**: Followed Test-Driven Development for all backend features.

## Future Improvements

- **LLM Integration**: Replace Regex extraction with OpenAI/Gemini API for intelligent parsing of unstructured data.
- **OCR**: Integrate `tesseract-ocr` or similar for image-based documents.
- **Authentication**: Add user authentication (Devise/JWT).
