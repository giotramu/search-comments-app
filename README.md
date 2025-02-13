# Search Comments

Welcome! 🎉 This is a simple search comments web-app, built as a technical challenge for a Front-End Developer position at Jobrapido.com.

You have two ways to run this project: using a package manager (like pnpm or npm) or with Docker.

Pick the one that works best for you! 👇

- [🛠 Option 1: Using pnpm (or npm)](#-option-1-using-pnpm-or-npm)
- [🐳 Option 2: Running with Docker](#-option-2-running-with-docker)


## Installation

### 🛠 Option 1: Using pnpm (or npm)

#### Step 1: Install Node.js
Make sure you have Node.js 20.x or 22.x installed. If not, grab it from [nodejs.org](https://nodejs.org/).

#### Step 2: Install pnpm
If you don’t have pnpm yet, install it globally:

```sh
npm install -g pnpm
```

#### Step 3: Install dependencies
Navigate to the project directory and install the required packages:

```sh
pnpm install
```

### 🎨 Development

To start the development server, just run:

```sh
pnpm dev
```

By default, the app runs at `http://localhost:3000/`. Open it in your browser and you're good to go!

### 📦 Building for production

To generate an optimized production build, run:

```sh
pnpm build
```

Once built, you can preview it locally with:

```sh
pnpm serve
```

### ✅ Running Tests

This project includes tests to ensure everything works as expected. To run them, use:

```sh
pnpm test
```

For additional checks:

- Linting issues: `pnpm check:src`
- TypeScript type validation: `pnpm check:tsc`

## 🐳 Option 2: Running with Docker

If you prefer running the project inside a Docker container, follow these steps.

### Step 1: Build the Docker Image

```sh
docker build -t seminar-registration .
```

### Step 2: Run tests inside Docker

```sh
# bash/zsh
docker run -v $(pwd):/mnt -v /mnt/node_modules -p 9090:9090 -w /mnt seminar-registration ./scripts/tests.sh

# fish
docker run -v (pwd):/mnt -v /mnt/node_modules -p 9090:9090 -w /mnt seminar-registration ./scripts/tests.sh
```

### Step 3: Run the application inside Docker

```sh
# bash/zsh
docker run -v $(pwd):/mnt -v /mnt/node_modules -p 9090:9090 -w /mnt seminar-registration ./scripts/run.sh

# fish
docker run -v (pwd):/mnt -v /mnt/node_modules -p 9090:9090 -w /mnt seminar-registration ./scripts/run.sh
```

After running the last command, you should be able to access the app at:

👉 http://localhost:9090/
