import { Site } from './../../module/Site';
import { StorageKeys } from './../../utils/StorageKeys';
import { User } from './../../module/User';
import { CacheData } from './CacheData';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable()
export class StorageUtils {
    clearableStorage: Storage;//可清除的缓存项 （如 用户名）
    constStorage: Storage;//不清除的缓存项 （如 是否是第一次打开app标记）
    constructor() {
        this.clearableStorage = new Storage({ name: "clearable_storage" });
        this.constStorage = new Storage({ name: "const_storage" });
    }

    public set(key: string, value: any) {
        this.clearableStorage.set(key, value).then(() => {
            if (CacheData.isDebug) {
                console.log("保存成功：" + key);
            }
        }).catch(() => {
            if (CacheData.isDebug) {
                console.log("保存失败：" + key);
            }
        });
    }

    public clear() {
        this.clearableStorage.clear();
    }

    public get<T>(key: string): Promise<T> {
        return this.clearableStorage.get(key);
    }

    public setUser(user: User): Promise<any> {
        return this.constStorage.set(StorageKeys.USER, user);
    }
    public getUser(): Promise<any> {
        return this.constStorage.get(StorageKeys.USER);
    }

    public setFilterSite(keyId: string, site: Array<Site>): Promise<any> {
        return this.clearableStorage.set(StorageKeys.FILTERSITE + keyId, site);
    }

    public getFilterSite(keyId: string): Promise<Array<Site>> {
        return this.clearableStorage.get(StorageKeys.FILTERSITE + keyId);
    }
}