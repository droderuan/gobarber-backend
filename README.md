# GoBarber

GoBarber back-end developed during Rocketseat's bootcamp.

## 🚀 What is it?
The back-end was developed to serve both a front-end and a mobile application. It allows users to be created and appointments to be scheduled.

---

## 🏗 How is it structured?

### 🛠 Architecture
The API follows the REST pattern and applies three SOLID principles. It is structured using Domain-Driven Design (DDD) and developed following Test-Driven Development (TDD).

### 🗄 Database
A total of three databases were used:

- **SQL with PostgreSQL**
- **Document NoSQL with MongoDB**
- **Key-Value NoSQL with Redis**

#### PostgreSQL
Used for storing data that requires security and persistence. It was implemented for user tables, appointments, and user tokens (for password reset).

#### MongoDB
Used mainly for notifications, such as email dispatch, containing the recipient and message body. Since this data does not require high security and has a flexible structure, it can change over time.

#### Redis
Currently being implemented as a Write-Back Cache to reduce database load by storing information in server memory and creating data caching.

---

## 🐳 Docker
Each database runs inside a Docker container with its respective image. To install:

### PostgreSQL
```sh
docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

### MongoDB
```sh
docker run --name mongodb -p 27071:27017 -d -t mongo
```

### Redis
```sh
docker run --name redis -p 6379:6379 -d -t redis:alpine
```

---

## 🌐 External Services
The back-end has two configured services for the production environment:

- **Email sending** using Amazon SES
- **File storage (profile images)** using Amazon S3

To use these services, you need to create an AWS account, add the services, and fill in the `.env` file accordingly.

---

## 📥 How to download and run it on your machine?

### 1️⃣ Clone the repository
```sh
git clone https://github.com/your-username/gobarber.git
cd gobarber
```

### 2️⃣ Create the `.env` file
Follow the structure of `.env.example`:

```ini
APP_EXPIRES=dev # Use 'dev' for development or any other value for production
MAIL_PROVIDER=ethereal # Use 'ethereal' for development or 'ses' for production (requires AWS variables)
STORAGE_PROVIDER=disk # Use 'disk' for development or 's3' for production (requires AWS variables)
```

### 3️⃣ Install dependencies
```sh
yarn install
```

### 4️⃣ Run the application
```sh
yarn dev:server
```

### 5️⃣ Run database migrations
```sh
yarn typeorm db:migrate
```

---

## 🔧 Tools used
- **VS Code**
- **Insomnia** (for API requests)
- **DBeaver** (to visualize PostgreSQL database)
- **MongoDB Compass** (to visualize MongoDB database)
