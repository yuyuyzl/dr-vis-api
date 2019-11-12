const db=require("./db");

it('should connect', async function () {
    await expect(db.sql.authenticate()).resolves.toBeUndefined();
});

it('should find something', async function () {
    expect(await db.labtest.findOne()).not.toBeNull();
    expect(await db.analysis.findOne()).not.toBeNull();
    expect(await db.patient.findOne()).not.toBeNull();
});

afterAll(()=>{db.sql.close()});