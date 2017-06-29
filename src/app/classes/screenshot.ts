export class Screenshot {
    public gameId: number;
    public categoryId: number;
    public ssDescription: string;
    public ssTags: any[];
    public ssOriginalURL: string;
    public ssMediumURL: string;
    public ssThumbnailURL: string;

    constructor(){
        this.gameId = null;
        this.categoryId = -1;
        this.ssDescription = null;
        this.ssTags = [];
    }
}
