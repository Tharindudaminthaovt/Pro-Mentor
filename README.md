# 🎓 Pro-Mentor Platform - Microservices-Based Career Networking System

This repository hosts the complete source code for **Pro-Mentor**, a microservices-based platform developed to bridge the gap between IT undergraduates at NSBM and industry professionals. The platform combines machine learning-based career guidance, job/event listings, post-sharing, and real-time mentorship to enhance graduate employability.

---

## 🧭 Repository Structure

Each folder in the root directory represents a distinct microservice or application component:

/Pro-Mentor
│
├── auth-service/ # Manages users, roles, and Keycloak integration (Node.js, Express)
├── social-service/ # Manages posts, jobs, events, and chat features (Quarkus)
├── ml-service/ # Career prediction service using ML model (Python, Django)
├── mail-service/ # Handles system emails triggered via RabbitMQ (Node.js)
├── cdn-service/ # Handles media/content uploads and delivery (Node.js)
├── shared-environment/ # Contains Keycloak config, shared resources, and environment setup
├── shared-library/ # Reusable Node.js utility functions (published to NPM)
├── front-end/ # Frontend app developed in React + TypeScript
└── README.md # You're here!


---

## 🚀 Project Highlights

- 🔐 **Authentication**: Secure login and multi-tenancy using **Keycloak**
- 💬 **Real-time Mentorship**: Chat system connecting students and IT professionals
- 🧠 **ML-Based Career Guidance**: Random Forest-based predictions (90.39% accuracy)
- 📦 **Microservices**: Scalable architecture with Docker, RabbitMQ, and Ingress-Nginx
- 🖥️ **Frontend**: Responsive and dynamic UI built in React with TypeScript
- ☁️ **Cloud-Ready**: Designed for deployment in a Kubernetes environment

---

## 🛠️ How to Get Started

### 1. Clone the Repository

```bash
git clone https://github.com/Tharindudaminthaovt/Pro-Mentor.git
cd Pro-Mentor
```
## 2. Explore Each Service
Each microservice has its own README.md file with specific instructions on:
```bash
Setup

Environment variables

Running locally (Docker or Node)

API Endpoints

Start by reading:

auth-service/README.md

social-service/README.md

ml-service/README.md

shared-environment/README.md

🧪 Development Tools
Containerization: Docker & Docker Compose

CI/CD: GitHub Actions, SonarCloud

Package Management: NPM for Node.js services

ML Training: Python, Scikit-learn (Random Forest)

Dataset Sources: Kaggle (US IT Jobs, Job Descriptions)

