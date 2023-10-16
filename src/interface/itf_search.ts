export interface SearchInterface{
    readonly _id: number,
    readonly Name: string,
    readonly Maker: string,
    readonly Image: string,
    readonly companies: ReadonlyArray<string>,
    readonly "__v": number
}

export interface ICompany{
  _id: number;
  nameCompany: string;
  nameProperty: string;
  nameFantasy: string;
  address: string;
  email: string;
  phone: string;
  countAvaliacoes: number;
  nota: number;
  [key: string]: any; 
}