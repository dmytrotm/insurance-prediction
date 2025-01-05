# Insurance Price Prediction

## Overview
This project is designed to predict insurance prices using machine learning models. It includes a React-based frontend for user interaction and a Django backend that hosts the machine learning model. The backend also manages the API requests and serves the prediction data.

## Prerequisites
- Python 3.x
- Node.js and npm
- Virtual environment tools for Python (`venv`)

## Setup Instructions

Follow these steps to set up and run the project locally.

### 1. Clone the repository
First, clone the repository to your local machine:
```bash
git clone https://github.com/dmytrotm/insurance-prediction.git
```

### 2. Open the repository
Navigate to the project folder:
```bash
cd insurance-prediction
```

### 3. Create and activate a virtual environment
Create a virtual environment to isolate the project's Python dependencies and activate it:

- On Windows:
    ```bash
    python -m venv venv
    .\venv\Scripts\activate
    ```
- On macOS/Linux:
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

### 4. Install Python dependencies
With the virtual environment activated, install the required Python packages:
```bash
cd backend
pip install -r requirements.txt
```

### 5. Set up the backend
Run the Django development server:
    - On Windows:
        ```bash
        python manage.py runserver
        ```
    - On macOS/Linux:
        ```bash
        python3 manage.py runserver
        ```

The backend will be available at `http://localhost:8000`.

### 6. Set up the frontend
1. Open a new terminal window, if you are in `backend` 
```bash 
cd ..
```
2. Activate the virtual environment again:
    - On Windows:
        ```bash
        .\venv\Scripts\activate
        ```
    - On macOS/Linux:
        ```bash
        source venv/bin/activate
        ```
3. Navigate to the frontend folder:
    ```bash
    cd frontend
    ```
4. Install the required npm packages:
    ```bash
    npm install
    ```
5. Run the frontend development server:
    ```bash
    npm run dev
    ```

The frontend will be available at `http://localhost:5173`.

### 7. Verify the setup
- Open `http://localhost:8000` to ensure the backend is running.
- Open `http://localhost:5173` to ensure the frontend is running.

The frontend should now be connected to the backend, and you can interact with the app to make insurance price predictions.