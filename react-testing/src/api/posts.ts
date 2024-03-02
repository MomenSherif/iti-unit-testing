import axios from 'redaxios';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const fetchPosts = () =>
  axios
    .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.data);
