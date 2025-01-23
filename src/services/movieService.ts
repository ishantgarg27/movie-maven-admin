import api from '@/lib/axios';

export interface Movie {
  id: string;
  title: string;
  description: string;
  duration: number;
  genre: string;
  releaseDate: string;
  posterUrl: string;
}

export const movieService = {
  createMovie: async (movieData: Omit<Movie, 'id'>) => {
    const response = await api.post('/movies', movieData);
    return response.data;
  },

  getAllMovies: async () => {
    const response = await api.get('/movies');
    return response.data;
  },

  getMovieById: async (id: string) => {
    const response = await api.get(`/movies/${id}`);
    return response.data;
  },

  updateMovie: async (id: string, movieData: Partial<Movie>) => {
    const response = await api.put(`/movies/${id}`, movieData);
    return response.data;
  },

  deleteMovie: async (id: string) => {
    const response = await api.delete(`/movies/${id}`);
    return response.data;
  },
};