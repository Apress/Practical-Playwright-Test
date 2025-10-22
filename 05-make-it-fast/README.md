# Make it fast

## Sharding
Try sharding locally thanks to [act](https://nektosact.com)

Run the pipeline
```bash
act --artifact-server-path=/tmp/artifacts -W ./.github/workflows/playwright-sharding.yml
```

Then go to the artifacts folder and 
```bash
cd /tmp/artifacts/1/html-report
unzip html-report.zip
npx playwright show-report .
```
