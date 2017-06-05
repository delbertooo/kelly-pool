import { KellyPoolClientPage } from './app.po';

describe('kelly-pool-client App', () => {
  let page: KellyPoolClientPage;

  beforeEach(() => {
    page = new KellyPoolClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
