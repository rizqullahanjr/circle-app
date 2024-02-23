export interface IUser {
  id: number;
  username: string;
  full_name: string;
  email: string;
  profile_picture: string;
  profile_description: string;
  created_at: string;
  updated_at: string;
}

interface Thread {
  id: number;
  content: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface ReplyInterface {
  id: number;
  image: string | null; // image can be null based on your data
  content: string;
  created_at: string;
  updated_at: string;
  user_id: IUser; // nested User object
  thread_id: Thread; // nested Thread object
}

interface Reply {
  id: number;
  image: string | null;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface ThreadReplyInterface {
  content: string;
  created_at: string;
  id: number;
  image: string;
  like: Array<{ id: number; created_at: string; updated_at: string }>;
  numOfLikes: number;
  numOfReplies: number;
  replies: Array<Reply>;
  user_id: {
    id: number;
    username: string;
    full_name: string;
    email: string;
    profile_picture: string;
  };
}

export type UseCreateReplyProps = {
  content: string,
  thread_id: number,
  image?: string,
}
