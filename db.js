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
    deathReasonText:{
        type:Sequelize.STRING(45),
        allowNull:true
    },
    height: {
        type: Sequelize.DECIMAL(20,10),
        allowNull: true
    },
    weight: {
        type: Sequelize.DECIMAL(20,10),
        allowNull: true
    },
    originDisease:{
        type:Sequelize.STRING(45),
        allowNull:true
    },
    diabetes:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    outcome:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    duplicate:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    ...Object.fromEntries([
        'scr',
        'heart_failure',
        'lung_infect',
        'chd',
        'mi',
        'ci',
        'ch',
        'amputation',
        'urea',
        'albumin',
        'hgb',
        'ca',
        'p',
        'pth',
        'bmi',
        'epi',
        'sbp',
        'dbp',
        'death_number'
    ].map(name => [name, (
        {
            type: Sequelize.DOUBLE,
            allowNull: true
        }
    )]))


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
