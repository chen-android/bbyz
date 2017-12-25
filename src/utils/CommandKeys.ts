export class CommandKeys {
    /* 登录 */
    public static login: [string, string] = ["0x0008", "登录"];
    /** 意见反馈 */
    public static feedback: [string, string] = ["0x0400", "意见反馈"];
    /* 查询可操作车站 */
    public static canSelectedStation: [string, string] = ["0x0401", "查询可操作车站"];
    /* 筛选页日期 */
    public static filterDate: [string, string] = ["0x0500", "筛选页日期"];
    /* 承运单位 */
    public static company: [string, string] = ["0x0501", "承运单位"];
    /* 车辆信息 */
    public static busId: [string, string] = ["0x0502", "查询车辆信息"];
    /* 可用车型 */
    public static busType: [string, string] = ["0x0503", "可用车型"];
    /* 站点信息 */
    public static site: [string, string] = ["0x0504", "站点信息"];
    /* 班次信息 */
    public static schemlist: [string, string] = ["0x0505", "班次信息"]
    /* 查询车次途经站 */;
    public static stopList: [string, string] = ["0x0506", "查询车次途经站"];
    /* 留座状态 */
    public static keepStatus: [string, string] = ["0x0507", "查询留座状态"];
    /* 查询客流汇总 */
    public static passengerFlowSummary: [string, string] = ["0508", "查询客流汇总"];
    /* 查询车次售票情况 */
    public static searchBusSale: [string, string] = ["0509", "查询车次售票情况"];
    /* 修改班次信息 */
    public static modifySchem: [string, string] = ["0x0601", "修改班次信息"];
    /* 设置班次可售 */
    public static stopSchem: [string, string] = ["0x0602", "设置班次站点可售"];
    /* 停班 */
    public static shiftClose: [string, string] = ["0x0603", "停班"];
    /* 开班 */
    public static shiftOpen: [string, string] = ["0x0604", "开班"];
    /* 克隆班线 */
    public static clone: [string, string] = ["0x0605", "克隆"];
    /* 班次留座 */
    public static keepSeat: [string, string] = ["0x0606", "班次留座"];
    /* 停班/留座 原因 */
    public static closeReason: [string, string] = ["050A", "停班/留座原因"];
    /* 查询车次售票情况 */
    public static searchBusSaleDetail: [string, string] = ["050B", "查询售票明细"];
    /* 查询车次售票情况 */
    public static searchTicketNumber: [string, string] = ["050C", "票号追踪"];
    /* 查询车次售票情况 */
    public static searchIssueBus: [string, string] = ["050D", "疑问班次查询"];
}