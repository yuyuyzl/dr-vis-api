const db=require("../db");

export default {
    p:{
        requestOptions:{
            api:'p',
            v:'1.0',
            data:{}
        },
        middleware: async(params)=>{
            const id=params.id;
            return db.patient.findOne({where: {pdid: +id}});
        }
    },

}

/*
router.get("/p",async ctx=>{
    const query=ctx.query;
    const data=await db.patient.findAll({where:query});
    ctx.responseData=data;
});

router.get("/p/:id",async ctx=>{
    const id=ctx.params.id;
    const data=await db.patient.findOne({where:{pdid:+id}});
    ctx.responseData=data;
});

router.get("/lab/:id",async ctx=>{
    const id=ctx.params.id;
    const query=ctx.query;
    const data=await db.labtest.findAll({where:{pdid:+id,...query},order:["date"]});
    ctx.responseData=data;
});

router.get("/analyze/:id",async ctx=>{
    const id=ctx.params.id;
    const query=ctx.query;
    const data=(await db.analysis.findAll({where:{pdid:+id,...query},order:["date"]}));
    ctx.responseData=data;
});

 */