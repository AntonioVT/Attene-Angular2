import { CurrentUser } from "app/classes/current-user";

export class Screenshot {
    public categoryId: number;
    public gameId: number;
    public gameName: string;
    public ssDescription: string;
    public ssTags: any[];
    public ssOriginalURL: string;
    public ssMediumURL: string;
    public ssThumbnailURL: string;
    public currentUser: CurrentUser;

    constructor(){
        this.gameId = null;
        this.categoryId = -1;
        this.ssDescription = null;
        this.ssTags = [];
        this.currentUser = null;
    }
}

