interface follower {
  id: number;
}

interface following {
  id: number;
}

export interface IReduxUser {
    id: number;
    username: string;
    full_name: string;
    email: string;
    profile_picture: string;
    password: string;
    profile_description: string;
    following: follower[]
    followers: following[]
    numfollowers: number;
    numfollowing: number;
  }