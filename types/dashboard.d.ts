interface GetAllPeopleResponse {
  people: People[];
}

interface People {
  id: number;
  name: string;
  email: string;
  isFollowedByCurrentUser: boolean;
  pictureUrl: string;
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
  articleImage?: string | null;
  creator: { name: string };
}

interface Chats {
  id: number;
  messages: ChatMessage[];
  users: ChatUser[];
}

interface ChatMessage {
  content: string;
  createdAt: Date;
}

interface ChatUser {
  name: string;
}

interface Message {
  id: number;
  content: string;
  createdAt: string;
  isMine: boolean;
  senderId: number;
  senderName: fatima;
  chatId: number;
}

interface Post {
  id?: number;
  content: string;
  title?: string;
  author: { id: number; name: string; pictureUrl: string };
  createdAt: string;
  postImage?: string | null;
  type: number | string;
  eventDate?: string | null;
  eventTime?: string | null;
}

interface Job {
  id: number;
  role: string;
  hourlyRate: string;
  location: string;
  createdAt: string;
  company: {
    id: number;
    name: string;
    pictureUrl: string;
    companyName: string;
  };
}

interface Followers {
  id: number;
  name: string;
  email: string;
  following: {
    id: number;
    name: string;
    email: string;
    pictureUrl: string;
  }[];
}

interface UnFollowedUser {
  address: string;
  bio: string;
  country: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  location: string;
  name: string;
  phoneNumber: string;
  profession: string;
  pictureUrl: string;
}

interface IncomingCall {
  callerId: number;
  callerName: string;
  receiverId: number;
  channelName: string;
  receiverName: string;
}

interface Call {
  id: number;
  createdAt: string;
  initiator: CallUser;
  receiver: CallUser;
  status: string;
  callSend: boolean;
  callReceived: boolean;
}

interface CallUser {
  id: number;
  name: string;
}
