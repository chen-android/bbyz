import { Common } from "../../module/Common";

export class CacheData {
    public static url: string = "http://121.199.31.187:8091/api/Mobile";

    /**
     * 网络请求的common
     */
    private static common: Common = new Common();

    public static getCommon(): Common {
        return this.common;
    }

    /** 是否是android平台运行*/
    public static isAndroid: boolean = false;
    /** 是否是ios平台运行 */
    public static isIos: boolean = false;

    /** 是否是debug模式 */
    /** 暂时这么判断，后续更改 */
    public static isDebug: boolean = false;

    /** 工号 */
    public static id:string;

    /** 选择的车站id */
    public static stationId:string;

    /**注销以后要重置的数据 */
    public static reset():void{
        CacheData.id = undefined;
        CacheData.stationId = undefined;
    }

    /** http请求key */
    public static secureKeys:Map<string,string> = new Map();
}