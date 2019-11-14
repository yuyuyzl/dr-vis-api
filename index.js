const Koa=require("koa");
const router=require("koa-router")();
const config=require("./config");
const db=require("./db");

const app=new Koa();

app.use(async (ctx,next)=>{
    ctx.set("Access-Control-Allow-Origin","*");
    await next();
});

router.get("/",async ctx=>{
    ctx.body="Dr.Vis API";
});

router.get("/p",async ctx=>{
    const query=ctx.query;
    const data=await db.patient.findAll({where:query});
    ctx.body=data;
});

router.get("/p/:id",async ctx=>{
    const id=ctx.params.id;
    const data=await db.patient.findOne({where:{pdid:+id}});
    ctx.body=data;
});

router.get("/lab/:id",async ctx=>{
    const id=ctx.params.id;
    const query=ctx.query;
    const data=await db.labtest.findAll({where:{pdid:+id,...query},order:["date"]});
    ctx.body=data;
});

router.get("/analyze/:id",async ctx=>{
    const id=ctx.params.id;
    const query=ctx.query;
    const data=(await db.analysis.findAll({where:{pdid:+id,...query},order:["date"]}));
    ctx.body=data;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.api.port);
console.log("Listen on "+config.api.port);