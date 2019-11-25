import { ICard } from '../Components/App';

export const URL = 'http://localhost:3001/cards';

// export default class API {
//   static fetchData = async (url = URL): Promise<ICard[]> => {
//     return await fetch(url).then(response => response.json());
//   };
// }

export const fetchData = (url = URL): Promise<ICard[]> =>
  fetch(url).then(response => response.json());
