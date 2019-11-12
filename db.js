const Sequelize=require('sequelize');
const Model=Sequelize.Model;
const conf=require("./config");

class analysis extends Model{}
class labtest extends Model{}
class patient extends Model{}

const sql=new Sequelize(...conf.sequelize);

patient.init({
    pdid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING(45),
        allowNull:true
    },
    birthDate: {
        type: Sequelize.DATE,
        allowNull: true
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    gender: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    death: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    deathDate: {
        type: Sequelize.DATE,
        allowNull: true
    },
    deathAge: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    deathReason: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    height: {
        type: Sequelize.DECIMAL(20,10),
        allowNull: true
    },
    weight: {
        type: Sequelize.DECIMAL(20,10),
        allowNull: true
    },


}, {
    sequelize: sql, modelName: "patient",freezeTableName:true,timestamps:false
});

labtest.init({
    pdid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
        primaryKey:true
    },

    ...Object.fromEntries(["wbc", "hgb", "k", "na", "cl", "co2", "glu", "alb", "urea", "cre", "ca", "p", "crp", "sys", "dia", "amount", "weight"].map(name => [name, (
        {
            type: Sequelize.DECIMAL(20, 10),
            allowNull: true
        }
    )]))

}, {
    sequelize: sql, modelName: "labtest",freezeTableName:true,timestamps:false
});

analysis.init({

    pdid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
        primaryKey:true
    },

    emdAdacare:{
        type:Sequelize.JSON,
        allowNull:true
    },
    emdStagenet:{
        type:Sequelize.JSON,
        allowNull:true
    },
    featureAtt:{
        type:Sequelize.JSON,
        allowNull:true
    },
    temporalAtt:{
        type:Sequelize.JSON,
        allowNull:true
    },
    predAdacare:{
        type:Sequelize.DECIMAL(20, 10),
        allowNull:true
    },
    predStagenet:{
        type:Sequelize.DECIMAL(20, 10),
        allowNull:true
    },
    groundtruth:{
        type:Sequelize.DECIMAL(20, 10),
        allowNull:true
    },
    stage:{
        type:Sequelize.DECIMAL(20, 10),
        allowNull:true
    },
},{
    sequelize: sql, modelName: "analysis",freezeTableName:true,timestamps:false
});

module.exports={
    sql,analysis,patient,labtest
};
