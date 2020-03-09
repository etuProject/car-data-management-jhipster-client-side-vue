import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class LocationUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('clientApp.location.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  headingInput: ElementFinder = element(by.css('input#location-heading'));

  latitudeInput: ElementFinder = element(by.css('input#location-latitude'));

  longitudeInput: ElementFinder = element(by.css('input#location-longitude'));

  speedInput: ElementFinder = element(by.css('input#location-speed'));

  tripSelect = element(by.css('select#location-trip'));
}
