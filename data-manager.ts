import Apis from './api/index'

interface IApi {
    requestOptions:any,
    middleware?:Function,
}

class DataManager {
    private readonly dict: Record<string,IApi>;
    constructor(apis:Record<string,IApi>){
        this.dict={...apis};
        for (let [key,api] of Object.entries(apis)){
            this.dict[api.requestOptions.api+api.requestOptions.v]=api;
            if(!this.dict[api.requestOptions.api]||(this.dict[api.requestOptions.api].requestOptions.v<api.requestOptions.v))
                this.dict[api.requestOptions.api]=api;
        }
    }

    async callApi(api,v, params){
        if(!this.dict[api+(v||"")]) throw "API未注册";
        try{
            return {
                api:this.dict[api+(v||"")].requestOptions.api,
                v:this.dict[api+(v||"")].requestOptions.v,
                data:(await this.dict[api+(v||"")].middleware(params))
            };
        }catch (e){
            throw e;
        }
    }
}

export default new DataManager(Apis);
module.exports=new DataManager(Apis);