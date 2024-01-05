export interface Idoctype {
    doctype: string,
    getChild:() => Idoctype, //method returning Idoctype
    parent: string,
    get_position: TdoctypePosition
}


export type TdoctypePosition={
    x: number
    y: number
}

export type Tmsg = {
    doctype: string
    level: number
    parent: string
}

export type TflowExtract={
    data: Tmsg[]
    error: any,
    isValidating: boolean
}