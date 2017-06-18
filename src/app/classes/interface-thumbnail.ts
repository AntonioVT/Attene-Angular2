export class InterfaceThumbnail {

    public urlImage: string;
    public urlInterface: string;
    public itfTitle: string;
    public itfCategory: string;
    public bVerticalMode: boolean;

    constructor(urlImage: string, urlInterface: string, itfTitle: string, itfCategory: string, bVerticalMode: boolean){
        this.urlImage = urlImage;
        this.urlInterface = urlInterface;
        this.itfTitle = itfTitle;
        this.itfCategory = itfCategory;
        this.bVerticalMode = bVerticalMode;
    }

}
