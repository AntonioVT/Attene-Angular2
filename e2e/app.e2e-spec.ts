import { AtteneFrontEndPage } from './app.po';

describe('attene-front-end App', () => {
  let page: AtteneFrontEndPage;

  beforeEach(() => {
    page = new AtteneFrontEndPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
