export interface UserModel {
    id?: number,
    username: string,
    password: string,
    email: string,
    creation_date: Date,
    update_date?: Date,
    deleted_date?: Date
}