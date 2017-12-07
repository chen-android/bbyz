export class Common {
    private appId: string;
    private usId: string;
    private loginStatus: string;
    private pushToken: string;
    private terminalType: string;
    private imei: string;
    private appVer: string;
    private mobileVer: string;
    private channelVer: string;
    private platformCode: string;
    private phone: string;

    public get $appId(): string {
        return this.appId;
    }

    public set $appId(value: string) {
        this.appId = value;
    }

    public get $usId(): string {
        return this.usId;
    }

    public set $usId(value: string) {
        this.usId = value;
    }

    public get $loginStatus(): string {
        return this.loginStatus;
    }

    public set $loginStatus(value: string) {
        this.loginStatus = value;
    }

    public get $pushToken(): string {
        return this.pushToken;
    }

    public set $pushToken(value: string) {
        this.pushToken = value;
    }

    public get $terminalType(): string {
        return this.terminalType;
    }

    public set $terminalType(value: string) {
        this.terminalType = value;
    }

    public get $imei(): string {
        return this.imei;
    }

    public set $imei(value: string) {
        this.imei = value;
    }

    public get $appVer(): string {
        return this.appVer;
    }

    public set $appVer(value: string) {
        this.appVer = value;
    }

    public get $mobileVer(): string {
        return this.mobileVer;
    }

    public set $mobileVer(value: string) {
        this.mobileVer = value;
    }

    public get $channelVer(): string {
        return this.channelVer;
    }

    public set $channelVer(value: string) {
        this.channelVer = value;
    }

    public get $platformCode(): string {
        return this.platformCode;
    }

    public set $platformCode(value: string) {
        this.platformCode = value;
    }

    public get $phone(): string {
        return this.phone;
    }

    public set $phone(value: string) {
        this.phone = value;
    }
}