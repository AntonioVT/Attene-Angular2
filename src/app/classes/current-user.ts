export class CurrentUser {

    public username: string;
    public sKey: string;
    public email: string;

    constructor(username: string, sKey: string, email: string){
        this.username = username;
        this.sKey = sKey;
        this.email = email;
    }
}
