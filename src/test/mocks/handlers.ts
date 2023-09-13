import { rest } from 'msw';
import { API_URL } from "../../app/constants";
import mockedQuotes from './mocked';

const randomQuote = mockedQuotes[1];
const validQueries = mockedQuotes.map((q) => q.character);

const handlers = [
    rest.get(`${API_URL}`, (req, res, ctx) => {
      const character = req.url.searchParams.get('character');
  
      if (character === null) {
        return res(ctx.json([randomQuote]), ctx.delay(150));
      }
  
      if (validQueries.includes(character)) {
        const quote = mockedQuotes.find((q) => q.character === character);
        return res(ctx.json([quote?.quote]));
      }
  
      return res(ctx.json([]), ctx.delay(150));
    }),
  ];

export { handlers, randomQuote, validQueries };