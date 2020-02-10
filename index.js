const Koa=require("koa");
const router=require("koa-router")();
const config=require("./config");
//const db=require("./db");
const bodyParser = require('koa-bodyparser')
const DataManager=require('./data-manager');

const app=new Koa();

app.use(bodyParser());
app.use(async (ctx,next)=>{
    await next();
    ctx.set("Access-Control-Allow-Origin",ctx.header.origin||"*");
    ctx.set("Access-Control-Allow-Credentials","true");
    ctx.set("Access-Control-Allow-Headers","*");
});

router.get("/:apiPath/:apiVersion?",async (ctx,next)=> {
    if (ctx.query.data) ctx.apiParams = JSON.parse(ctx.query.data);
    await next();
});

router.post("/:apiPath/:apiVersion?",async (ctx,next)=> {
    if (ctx.request.body) ctx.apiParams = ctx.request.body;
    await next();
});


router.all("/:apiPath/:apiVersion?",async (ctx,next)=>{
    if(!config.api.secret||ctx.query.secret===config.api.secret)ctx.sudo=true;
    ctx.responseData={};
    ctx.responseRaw={
        api:ctx.params.apiPath,
        v:ctx.params.apiVersion,
    };
    try {
        if (!ctx.sudo) {
            if (ctx.params.apiPath !== "analyze" && (!ctx.apiParams.pdid || !(config.api.whitelist.indexOf(+ctx.apiParams.pdid) >= 0))) throw "权限不足";
        }
        await next();
        ctx.responseRaw.ret = ["SUCCESS::调用成功"];
    }catch (e) {
        ctx.responseRaw.ret=["FAILED::"+e];
        ctx.responseRaw.data=null;
    }finally {
        ctx.body=JSON.stringify(ctx.responseRaw);
    }
});

router.all("/:apiPath/:apiVersion?", async (ctx,next)=>{
    ctx.responseRaw={...ctx.responseRaw,...await DataManager.callApi(ctx.params.apiPath, ctx.params.apiVersion, ctx.apiParams)};
    if(!ctx.sudo){
        if(ctx.responseRaw.data&&ctx.responseRaw.data.dataValues)delete ctx.responseRaw.data.dataValues.name;
        if(ctx.responseRaw.data&&ctx.responseRaw.data.dataValues)delete ctx.responseRaw.data.dataValues.birthDate;
    }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.api.port);
console.log("Listen on "+config.api.port);