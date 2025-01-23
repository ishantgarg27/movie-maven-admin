import api from '@/lib/axios';

export interface Theater {
  id: string;
  name: string;
  location: string;
  totalSeats: number;
}

export const theaterService = {
  createTheater: async (theaterData: Omit<Theater, 'id'>) => {
    const response = await api.post('/theaters', theaterData);
    return response.data;
  },

  getAllTheaters: async () => {
    const response = await api.get('/theaters');
    return response.data;
  },

  getTheaterById: async (id: string) => {
    const response = await api.get(`/theaters/${id}`);
    return response.data;
  },

  updateTheater: async (id: string, theaterData: Partial<Theater>) => {
    const response = await api.put(`/theaters/${id}`, theaterData);
    return response.data;
  },

  deleteTheater: async (id: string) => {
    const response = await api.delete(`/theaters/${id}`);
    return response.data;
  },

  getTheatersByMovie: async (movieId: string) => {
    const response = await api.get(`/theaters/movie/${movieId}`);
    return response.data;
  },
};