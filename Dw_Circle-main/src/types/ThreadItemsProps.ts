type LikePostProps = {
  id?: number;
  user_id :{
    id: number;
  }
}

export type ThreadPostsProps = {
  id?: number;
  content: string;
  image: string;
  created_at: string;
  user_id: {
    full_name: string;
    profile_picture: string;
  };
  like: LikePostProps[]
  numOfLikes: number;
  numOfReplies: number;
};

export type ThreadItemsProps = {
  id?: number;
  username: string;
  userphoto: string;
  content: string;
  image: string;
  date: string;
  likes: LikePostProps[];
  replies: number;
};

export type UseThreadProps = {
  content: string,
  image: string,
}
// export type ThreadItemsPropsv1 = {
//     id?: number;
//     avatar: string;
//     date: string;
//     message: string;
//     name: string;
//     replies: number;
//     image: string;
//   };
