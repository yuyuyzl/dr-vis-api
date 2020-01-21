const db=require("../db");

export default {
    patient:{
        requestOptions:{
            api:'patient',
            v:'1.0',
            data:{}
        },
        middleware: async(params)=>{
            if(params.all) {
                delete params.all;
                return db.patient.findAll({where: params});
            }
            return db.patient.findOne({where: params});
        }
    },
    lab:{
        requestOptions:{
            api:'lab',
            v:'1.0',
            data:{}
        },
        middleware: async(params)=>{
            return db.labtest.findAll({where: params, order: ["date"]});
        }
    },
    analyze:{
        requestOptions:{
            api:'analyze',
            v:'1.0',
            data:{}
        },
        middleware: async(params)=>{
            return db.analyze.findAll({where:params,order:["date"]});
        }
    }
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