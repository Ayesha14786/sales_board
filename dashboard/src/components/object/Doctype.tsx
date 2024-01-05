

import { Idoctype, TdoctypePosition, TflowExtract } from "./types";
import { FlowData } from "../FlowData";

export abstract class Cdoctype implements Idoctype{
    doctype: string;
    flowExtract: TflowExtract
    parent: string;
    get_position: TdoctypePosition;
    abstract getChild(): Idoctype;

    
    constructor(iFlowExtract: TflowExtract){

        this.doctype = iFlowExtract.data[0].doctype;
        this.getChild();
        this.parent = '';
        this.get_position = { x:0, y:0 };
        const { data, error, isValidating } = FlowData();
        this.flowExtract = { data, error, isValidating };


        //console.log(data, error, isValidating)
    }

}

export class CdoctypeBase extends Cdoctype{
    doctype: string;
    flowExtract: TflowExtract
    parent: string;
    get_position: TdoctypePosition;
    getChild(): Idoctype{
        const doctyype: Idoctype = new CdoctypeBase(this.flowExtract)
        return doctyype
    }

    
    constructor(iFlowExtract: TflowExtract){
        super(iFlowExtract)
        this.doctype = iFlowExtract.data[0].doctype;
        this.getChild();
        this.parent = '';
        this.get_position = { x:0, y:0 };
        const { data, error, isValidating } = FlowData();
        this.flowExtract = { data, error, isValidating };
    }

}