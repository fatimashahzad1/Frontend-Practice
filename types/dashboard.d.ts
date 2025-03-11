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
    author: { id: number; name: string };
    createdAt: string;
    postImage?: string | null;
}

interface Followers {
    id: number;
    name: string;
    email: string;
    following: {
        id: number;
        name: string;
        email: string;
    }[];
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
