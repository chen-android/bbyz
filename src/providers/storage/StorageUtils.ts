import { User } from './../../module/User';
import { CacheData } from './CacheData';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable()
export class StorageUtils{
    constructor(public storage:Storage){}
    public set(key: string, value: any) {
        this.storage.set(key, value).then(() => {
            if (CacheData.isDebug) {
                console.log("保存成功：" + key);
            }
        }).catch(() => {
            if (CacheData.isDebug) {
                console.log("保存失败：" + key);
            }
        })
    }

    public get<T>(key: string): Promise<T> {
        return this.storage.get(key);
    }

    public setUser(user: User): Promise<any> {
        return this.storage.set("user", user);
    }
    public getUser(): Promise<User> {
        return this.storage.get("user");
    }
}