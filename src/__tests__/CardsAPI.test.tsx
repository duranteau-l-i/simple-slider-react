// import { fetchData } from '../API/CardsAPI';
// import { fakeData } from '../__mocks__/CardsAPI';

// describe('Fetch', () => {
// it('call api', () => {
//   fetch.mockResponse(() => fetchData().then(res => fakeData));
//   fetch.mockReject(() => fetchData().then(res => Promise.reject(res)));
// });
// });

import { fetchData } from '../API/CardsAPI';

describe('Cards API', () => {
  it('2 + 2 = 4', () => {
    expect(2 + 2).toEqual(4);
  });
});
