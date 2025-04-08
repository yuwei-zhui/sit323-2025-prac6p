# SIT323 6.1P - Deploying a Node.js Application on a Kubernetes Cluster

This project is part of the SIT323 Cloud Native Application Development course. In this task, I deployed a containerized Node.js application (developed in Task 5.1P) onto a Kubernetes cluster using Docker Desktop’s built-in Kubernetes. The application is orchestrated with Kubernetes resources such as Deployment and Service, and demonstrates the fundamentals of deploying and managing microservices in a cloud native environment.

## 📂 Repository

The code and configuration files are hosted on GitHub:  
[https://github.com/yuwei-zhui/sit323-2025-prac6p](https://github.com/yuwei-zhui/sit323-2025-prac6p)

## 🛠️ Project Setup

### Step 1: Prepare Environment

- **Tools Required:**
  - Docker Desktop (with Kubernetes enabled)
  - Git
  - Visual Studio Code (or another code editor)
  - Node.js (for the application)
  
- **Prerequisites:**
  - Basic knowledge of Docker, Kubernetes, and Node.js.
  - Ensure Docker Desktop’s Kubernetes is running correctly (verify with `kubectl get nodes`).

### Step 2: Build the Docker Image

1. **Create a Dockerfile**  
   In my project directory, create a `Dockerfile` with the following content:

   ```dockerfile
   FROM node:14
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 3323
   CMD ["node", "app.js"]
   ```

   *Explanation:*  
   - Uses the official Node.js image.
   - Sets the working directory.
   - Copies dependencies and installs them.
   - Copies the remaining source code.
   - Exposes port 3323 (adjust if needed).
   - Starts the application using the command: `node app.js`.

2. **Build the Image**  
   Run the following command in project directory:

   ```bash
   docker build -t zhuiyuwei/calculator:latest .
   ```

### Step 3: Create the Kubernetes Deployment

1. **Write the Deployment YAML File**  
   Create a file named `service.yaml` with the following content:

   ```yaml
   apiVersion: apps/v1
kind: Deployment
metadata:
  name: calculator-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: calculator
  template:
    metadata:
      labels:
        app: calculator
    spec:
      containers:
      - name: sit323-2025-prac5p
        image: zhuiyuwei/calculator:latest
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 3323
   ```

2. **Apply the Deployment**  
   Deploy the application with the command:

   ```bash
   kubectl apply -f deployment.yaml
   ```

### Step 4: Create the Kubernetes Service

1. **Write the Service YAML File**  
   Create a file named `service.yaml` with the following content:

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: nodejs-service
   spec:
     type: NodePort
     selector:
       app: nodejs-app
     ports:
     - port: 3323
       targetPort: 3323
       nodePort: 30323
   ```

2. **Apply the Service Configuration**  
   Run:

   ```bash
   kubectl apply -f service.yaml
   ```

### Step 5: Verify the Deployment

1. **Check Pod Status:**

   ```bash
   kubectl get pods
   ```

   Ensure that all Pods are in the `Running` state.

2. **Access the Application:**  
   Using Docker Desktop, access the application via the Kubernetes service by navigating to:

   ```
   http://localhost:30323
   ```


### Step 6: Commit and Upload Code

1. **Commit my Changes:**

   ```bash
   git add .
   git commit -m "Update Commit"
   ```

2. **Push to GitHub:**

   ```bash
   git push origin main
   ```

Ensure my repository contains the following essential files:
- `Dockerfile`
- `deployment.yaml`
- `service.yaml`
- Application source code and related configuration files
- This README file

## 💻 Usage

1. **Start the Kubernetes Cluster:**  
   Open Docker Desktop and ensure Kubernetes is running.

2. **Build and Deploy:**  
   Build the Docker image locally and then deploy using the provided YAML files.
  
3. **Access the Application:**  
   Visit `http://localhost:30080` to interact with the Node.js application.

## 📕 Conclusion

This task demonstrated the process of deploying a containerized Node.js application onto a Kubernetes cluster using Docker Desktop’s integrated Kubernetes. The project includes building a Docker image, creating Kubernetes Deployment and Service resources, and ensuring smooth interaction with the deployed microservice. This deployment workflow is a core skill in cloud native application development and paves the way for future scaling and orchestration tasks.
