export interface SubCategoryObject{
    visiblity: boolean,
    subCategories: string[],
    rank?:number
}
export interface RegCredentials{
    name: String,
    credential: String,
    password: String,
    otp?: String;
}

export interface Signin{
    email: String,
    password: String
}