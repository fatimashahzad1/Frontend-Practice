interface getAllPeopleResponse {
  people: People[];
}

interface People {
  id: number;
  name: string;
  email: string;
  isFollowedByCurrentUser: boolean;
}
