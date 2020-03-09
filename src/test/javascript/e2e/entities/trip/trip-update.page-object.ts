import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class TripUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('clientApp.trip.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  startTimeInput: ElementFinder = element(by.css('input#trip-startTime'));

  endTimeInput: ElementFinder = element(by.css('input#trip-endTime'));
}
