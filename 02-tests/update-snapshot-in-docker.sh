docker run --rm \
  -v $PWD:/app \
  -w /app \
  --network=host --ipc=host \
  mcr.microsoft.com/playwright:v1.56.1-noble \
  bash -c "npx playwright test snapshot -u"
