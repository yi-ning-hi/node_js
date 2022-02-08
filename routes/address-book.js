const express = require('express');
const db = require('./../modules/connect-db');

const router = express.Router();

router.get('/list',async(req,res)=>{
    const perPage = 5; //每頁最多幾筆

    let page = req.query.page ? parseInt(req.query.page) : 1; //用戶要看第幾頁

    const output = {
        // success:false,
        perPage,
        page,
        totalRows:0,
        totalPages:0,
        row:[]
    }; //輸出

    const t_sql = "SELECT COUNT(1) num FROM address_book";
    const [rs1] = await db.query(t_sql);
    const totalRows = rs1[0].num;
    let totalPages = 0;
    if(totalRows){
        output.totalPages = Math.ceil(totalRows/perPage);
        output.totalRows = totalRows;

        const sql =  `SELECT * FROM address_book LIMIT ${perPage*(page-1)},${perPage}`;
        const [rs2] = await db.query(sql);
        output.rows = rs2;
    }

    res.json(output);
});

module.exports = router;