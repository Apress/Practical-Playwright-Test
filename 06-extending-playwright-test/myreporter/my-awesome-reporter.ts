import chalk from 'chalk';
import { AxeResults } from 'axe-core';
import { createHtmlReport } from 'axe-html-reporter';

import type {
  Reporter,
  FullConfig,
  Suite,
  TestCase,
  TestResult,
  FullResult,
} from '@playwright/test/reporter';
import { rm } from 'fs';

const DEFAULT_PATH = 'axe-reports';

class MyReporter implements Reporter {
  path: string;

  constructor(options: { path?: string } = {}) {
    this.path = options.path ?? DEFAULT_PATH;
    console.log(`my-awesome-reporter path set to ${this.path}`);
  }

  onBegin(config: FullConfig, suite: Suite) {
    console.log(`Starting the run with ${suite.allTests().length} tests`);
    rm(this.path, { recursive: true }, () => {});
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const attachment = result.attachments.find(
      (a) => a.name === 'accessibility-scan-results',
    );
    if (!attachment?.body) {
      return;
    }
    const scanResults: AxeResults = JSON.parse(attachment.body.toString());
    if (scanResults.violations.length === 0) {
      console.log(`${test.title} accessibility passed`);
      return;
    }

    console.log(`${test.title} accessibility failed`);
    createHtmlReport({
      results: scanResults,
      options: {
        reportFileName: `${test.id}.html`,
        outputDir: this.path,
      },
    });
  }

  async onEnd(result: FullResult) {
    console.log('To view the reports, run:');
    console.log(
      chalk.cyan(`
  npx serve ${this.path}
`),
    );
  }
}
export default MyReporter;
