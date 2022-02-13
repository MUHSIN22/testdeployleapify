export interface LoggedInUser {
    email: string
    exp: number
    iat: number
    id: string
    name: string
    username: string
    user?:string
}