import { getBooks } from '../services/book.service';

export const resolvers = {
  Query: {
    books: async (): Promise<any> => {
      return getBooks();
    },
  },
};
