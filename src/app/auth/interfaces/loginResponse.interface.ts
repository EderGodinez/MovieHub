

export interface LoginResponse {
    message:string,
    user:userResponse,
    token:string
}

interface userResponse
{
    id:number
    name:string
    email:string
    role:string
    favoritesMediaId:any
}
