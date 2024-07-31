export interface Post {
  id: number;
  title: string;
  content: string;
}

const posts: Post[] = [
  { id: 1, title: 'First Post', content: 'This is the first post' },
  { id: 2, title: 'Second Post', content: 'This is the second post' },
];

export const fetchPosts = async (): Promise<Post[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(posts), 500);
  });
};

export const addPost = async (post: Omit<Post, 'id'>): Promise<Post> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newPost = { ...post, id: posts.length + 1 };
      posts.push(newPost);
      resolve(newPost);
    }, 200);
  })
};