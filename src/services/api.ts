import apisauce, { ApiResponse } from 'apisauce';
import { API } from '../config';

export type Tweet = {
  id: number;
  tweet: string;
  date: string;
  claps: number;
  userId: number;
};

const create = (baseURL: string = API) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    // 10 second timeout...
    timeout: 10000,
  });

  const getTweets: () => Promise<ApiResponse<Tweet[]>> = () =>
    api.get('/tweets');
  
  const postTweet: (tweet: Tweet) => Promise<ApiResponse<Tweet>> = (tweet: Tweet) =>
    api.post('/tweets', tweet);

  return {
    getTweets,
    postTweet,
    axiosInstance: api.axiosInstance,
  };
};

const api = create();

export default api;
