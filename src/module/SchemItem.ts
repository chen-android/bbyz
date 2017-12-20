export class SchemItem{
    /* 车次id */
    SchemID:string;
    /* 发车日期 */
    DriveDate:string;
    /* 隶属站编号 */
    StationNo:string;
    /* 隶属站名称 */
    StationName:string;
    /* 车次号 */
    SchemNo:number;
    /* 班次类别 */
    SchemType:string;
    /* 1正班 2加班 */
    SchemTypeCode:number;
    /* 发车时间 */
    DriveTime:string;
    /* 线路名称 */
    RouteName:string;
    /* 车型名称 */
    BusTypeName:string;
    /* 承运单位 */
    CarrayCompanyName:string;
    /* 车牌号 */
    LicenseNo:string;
    /* 检票口 */
    CheckGateNo:string;
    /* 是否开班 1开班  0停班  2停班有售 */
    IsRun:number;
    /* 是否强制门检放行 1不验证合法性，强制放行  0正常状态 */
    IsForcePass:number;
    /* 终点站码 */
    EndStopNo:string;
    /* 终点站名 */
    EndStopName:string;
    /* 起座号 */
    StartSeatNo:number;
    /* 止座号 */
    EndSeatNo:number;
    /* 座位数 */
    TotalSeatNum:number;
    /* 余座 */
    LeastSeatNum:number;
    /* 已售票数 */
    SaledNum:number;
    /* 预定张数 */
    ReserveNum:number;
    /* 价格 */
    Price:string;
}