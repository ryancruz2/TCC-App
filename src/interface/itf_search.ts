export interface SearchInterface{
    readonly id: string,
    readonly name: string,
    readonly maker: string,
    readonly "image": string,
    readonly companies: ReadonlyArray<string>
}