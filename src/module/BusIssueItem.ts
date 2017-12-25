export class BusIssueItem {
    SchemID: string;        // 班次号
    DriveTime: string;      // 发车日期
    BusTypeName: string;    // 车型名称
    PassID: number;         // 检票口
    EndStopName: string;    // 终点站名
    SchTypeName: string;    // 客运类别
    RunTypeName: string;    // 班次类别
    FullPrice: number;      // 全票票价
    HalfPrice: number;      // 半票票价
    StationName: string;     // 隶属站名称
    CarrierName: string;    // 承运单位名称
    LeastFreeChildNum: string;// 剩余免票携童数
}