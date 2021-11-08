/* eslint-disable class-methods-use-this */
const poolCon = require('../db/db');

module.exports = {
  User: class {
   async addUser() {
      const res = await this.executeQuery();
      //console.log("in modelafter query ", res);
     // const concat = this.concatStr(res);
      // const res = {rows: 10}
      return res.rows;
    }

    async executeQuery() {
      console.log('*********** in execute queryyy');
      // return 'testttttttt';
      const queryData = await poolCon.query('select * from test_schema.emp');
      return queryData;
    }

    concatStr(str) {
        console.log("in concatstrrrrrr")
      return `${str}sss`;
    }
  },
};
