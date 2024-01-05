export type TPos = {
    x: number,
    y: number
}
export interface TDoctype {
    doctypeName: string,
    level: number,
    pos: TPos
    parent: TDoctype
    children: TDoctype[]
}
