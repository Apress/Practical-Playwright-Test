# Getting Started

You can use Docker to have a Linux sandbox

```bash
docker run --rm -it --net host debian:bookworm-slim bash
```

## TL;DR
Prepare your Linux environment with this (drop `sudo` in Docker with root):
```bash
sudo apt update
sudo apt install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
nvm install --lts
nvm use --lts
npx playwright install-deps
```

Let's start by creating a new project

```bash
cd ~
mkdir playwright-example
cd playwright-example
npm init -y

We've just initialized an empty Node.js project, now let's install Playwright Test.

```bash
npm init playwright
```

We'll now check the installation and run the tests:
```bash
npx playwright test
```
