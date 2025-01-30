interface GetAllPeopleResponse {
  people: People[];
}

interface People {
  id: number;
  name: string;
  email: string;
  isFollowedByCurrentUser: boolean;
}

interface GetAllArticlesResponse {
  articles: Article[];
  pagination: {
    total_count: number;
  };
}

interface Article {
  id: number;
  title: string;
  description: string;
  estimatedTime: string;
  creator: { name: string };
}
