import { Injectable } from "@angular/core";
import { DebugLog } from "../module/DebugLog";

@Injectable()
export class LogUtil{
    requestLogs: Array<DebugLog>;
    responseLogs: Array<DebugLog>;
    constructor(){
        this.requestLogs = new Array();
        this.responseLogs = new Array();
    }

    saveRequestLogs(title:string,log:string){
        if(this.requestLogs.length>15){
            this.requestLogs.shift();
        }
        this.requestLogs.push(new DebugLog(title,new Date(),log));
    }
    saveResponseLogs(title: string,log: string) {
        if (this.responseLogs.length > 15) {
            this.responseLogs.shift();
        }
        this.responseLogs.push(new DebugLog(title, new Date(), log));
    }
}