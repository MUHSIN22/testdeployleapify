export interface Message{
    _id: string,
    message?: string,
    username: string,
    type: string,
    roomId: string,
    imageUrl?: string,
    likes: any[],
    comments: any[],
    reports: any[],
    createdAt: string,
    reactions: string[],
}