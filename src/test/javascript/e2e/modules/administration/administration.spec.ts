/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from '../../page-objects/navbar-page';

import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Administration', () => {
  let navBarPage: NavBarPage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    await navBarPage.login('admin', 'admin');
    await waitUntilDisplayed(navBarPage.adminMenu);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });

  it('should load metrics', async () => {
    const metricsPage = await navBarPage.getMetricsPage();
    expect(await metricsPage.title.isDisplayed()).to.be.true;
    expect(await metricsPage.title.getText()).not.to.be.empty;
  });

  it('should load health', async () => {
    const healthPage = await navBarPage.getHealthPage();
    expect(await healthPage.title.isDisplayed()).to.be.true;
    expect(await healthPage.title.getText()).not.to.be.empty;
  });

  it('should load configuration', async () => {
    const configurationsPage = await navBarPage.getConfigurationsPage();
    expect(await configurationsPage.title.isDisplayed()).to.be.true;
    expect(await configurationsPage.title.getText()).not.to.be.empty;
  });

  it('should load audits', async () => {
    const auditsPage = await navBarPage.getAuditsPage();
    expect(await auditsPage.title.isDisplayed()).to.be.true;
    expect(await auditsPage.title.getText()).not.to.be.empty;
  });

  it('should load logs', async () => {
    const logsPage = await navBarPage.getLogsPage();
    expect(await logsPage.title.isDisplayed()).to.be.true;
    expect(await logsPage.title.getText()).not.to.be.empty;
  });
});
