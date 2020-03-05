/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import SignInPage from '../../page-objects/signin-page';
import NavBarPage from '../../page-objects/navbar-page';
import { isVisible, waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Account', () => {
  let navBarPage: NavBarPage = new NavBarPage();
  let signInPage: SignInPage;
  const loginPageTitle = 'login-title';

  describe('Login Flow', () => {
    before(async () => {
      await browser.get('/');
      navBarPage = new NavBarPage();
    });

    after(async () => {
      await navBarPage.autoSignOut();
    });

    it('should fail to login with bad password', async () => {
      signInPage = await navBarPage.getSignInPage();
      expect(await signInPage.getTitle()).to.eq(loginPageTitle);
      expect(await isVisible(signInPage.dangerAlert)).to.be.false;

      await signInPage.login('admin', 'foo');

      await waitUntilDisplayed(signInPage.dangerAlert);
      expect(await signInPage.dangerAlert.isDisplayed()).to.be.true;

      await signInPage.closeButton.click();
      await waitUntilHidden(signInPage.loginForm);
    });

    it('should login with admin account', async () => {
      signInPage = await navBarPage.getSignInPage();
      expect(await signInPage.getTitle()).to.eq(loginPageTitle);
      expect(await isVisible(signInPage.dangerAlert)).to.be.false;

      await signInPage.username.clear();
      await signInPage.username.sendKeys('admin');
      await signInPage.password.clear();
      await signInPage.password.sendKeys('admin');
      await signInPage.loginButton.click();

      await waitUntilHidden(signInPage.loginForm);
      await waitUntilDisplayed(navBarPage.entityMenu);

      expect(await navBarPage.entityMenu.isDisplayed()).to.be.true;
    });
  });
});
