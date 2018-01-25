
/* providers */
import { HttpServices } from "../providers/http/http.service";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { AppVersion } from "@ionic-native/app-version";
import { Keyboard } from "@ionic-native/keyboard";
import { File } from "@ionic-native/file";
import { FileOpener } from "@ionic-native/file-opener";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { Device } from "@ionic-native/device";
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { EncryptUtils } from "../utils/EncryptUtils";
import { UpgradeService } from "../providers/upgrade.service";
import { StorageUtils } from "../providers/storage/StorageUtils";
import { DialogUtil } from "../utils/DialogUtil";
import { LogUtil } from "../utils/LogUtil";

/* modules */
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

export const MODULES = [
    BrowserModule,
    HttpClientModule,
]
export const PROVIDERS = [
    StatusBar,
    SplashScreen,
    AppVersion,
    Keyboard,
    File,
    FileOpener,
    FileTransfer,
    FileTransferObject,
    Device,
    AndroidPermissions,
    InAppBrowser,
    EncryptUtils,
    HttpServices,
    UpgradeService,
    StorageUtils,
    DialogUtil,
    LogUtil,
]