import { StarbaseFrontPage } from './app.po';

describe('starbase-front App', () => {
  let page: StarbaseFrontPage;

  beforeEach(() => {
    page = new StarbaseFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
