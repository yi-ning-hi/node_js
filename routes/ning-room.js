const express = require('express');
const db = require('./../modules/connect-db');
const upload = require('./../modules/upload-imgs');

const router = express.Router();

async function getListData(req, res) {
    const perPage = 5; //每頁最多幾筆

    let page = req.query.page ? parseInt(req.query.page) : 1; //用戶要看第幾頁
    if (page < 1) {
        return res.redirect('/room/list');
    }
    const conditions = {};
    let search = req.query.search ? req.query.search : '';
    search = search.trim(); //去掉頭尾空白
    let sqlWhere = ' WHERE 1 ';
    if (search) {
        sqlWhere += ` AND \`name\` LIKE ${db.escape('%' + search + '%')}`;
        conditions.search = search;
    }

    const output = {
        // success:false,
        perPage,
        page,
        totalRows: 0,
        totalPages: 0,
        row: [],
        conditions
    }; //輸出

    const t_sql = `SELECT COUNT(1) num FROM RoomPlatform ${sqlWhere}`;
    // return res.send(t_sql); //除錯用
    const [rs1] = await db.query(t_sql);
    const totalRows = rs1[0].num;
    // let totalPages = 0;
    if (totalRows) {
        output.totalPages = Math.ceil(totalRows / perPage);
        output.totalRows = totalRows;
        if (page > output.totalPages) {
            //到最後一頁
            return res.redirect(`/room/list?page=${output.totalPages}`);
        }
        // const sql = `SELECT * FROM \`RoomPlatform\` ${sqlWhere} ORDER BY sid DESC LIMIT ${perPage * (page - 1)},${perPage}`;
        // return res.send(sql);//除錯用
const sql=`SELECT * FROM \`RoomPlatform\` ${sqlWhere} ORDER BY sid DESC`
        const [rs2] = await db.query(sql);
        // rs2.forEach(el => {
        //     el.birthday = res.locals.toDateString(el.birthday);
        // });
        output.rows = rs2;
    }

    return output;
    // res.json(output);
    // res.render('address-book/list', output);
}
router.get('/', async (req, res) => {
    res.redirect('/address-book/list');
});
router.get('/list', async (req, res) => {
    res.render('address-book/list', await getListData(req, res));
});
router.get('/api/list', async (req, res) => {
    res.json(await getListData(req, res));
});
router.get('/add', async (req, res) => {
    res.render('address-book/add');
});
// multiple/form-data
router.post('/add2', upload.none(), async (req, res) => {
    res.json(req.body);
});
//application/x-www-form-urlencoded
//application/json

router.post('/add', async (req, res) => {
    const output = {
        success: false,
        error: ''
    };
    // const sql = "INSERT INTO address_book SET ?";
    // const obj = {...req.body, created_at: new Date()};

    // const [result] = await db.query(sql, [obj]);
    // console.log(result);

    const sql = "INSERT INTO `address_book`(`name`, `email`, `mobile`, `birthday`, `address`, `created_at`) VALUES (?,?,?,?,?,NOW())"
    const [result] = await db.query(sql, [
        req.body.name,
        req.body.email,
        req.body.mobile,
        req.body.birthday || null,
        req.body.address,
    ]);
    console.log(result);
    output.success = !!result.affectedRows;
    output.result = result;
    res.json(output);
});

router.get('/delete/:sid', async (req, res) => {
    // req.get('Referer') //從哪裡來
    const sql = "DELETE FROM address_book WHERE sid=?";
    const [result] = await db.query(sql,[req.params.sid]);
    res.redirect('/address-book/list');
});

router.get('/edit/:sid', async (req, res) => {
    const sql = "SELECT * FROM address_book WHERE sid=?";
    const [rs] = await db.query(sql,[req.params.sid]);
    if(! rs.length){
        return res.redirect('/address-book/list');
    }
    res.render('address-book/edit',rs[0]);
});

router.post('/edit/:sid', async (req, res) => {
    const output = {
        success:false,
        error:''
    };

    const sql = "UPDATE `address_book` SET ? WHERE sid= ?";

    const [result] = await db.query(sql, [req.body, req.params.sid]);

    console.log(result);
    output.success = !! result.changedRows;
    output.result = result;

    res.json(output);
})

// router.get('/list', async (req, res) => {
//     const perPage = 5; //每頁最多幾筆

//     let page = req.query.page ? parseInt(req.query.page) : 1; //用戶要看第幾頁
//     if (page < 1) {
//         return res.redirect('/address-book/list');
//     }

//     const output = {
//         // success:false,
//         perPage,
//         page,
//         totalRows: 0,
//         totalPages: 0,
//         row: []
//     }; //輸出

//     const t_sql = "SELECT COUNT(1) num FROM address_book";
//     const [rs1] = await db.query(t_sql);
//     const totalRows = rs1[0].num;
//     let totalPages = 0;
//     if (totalRows) {
//         output.totalPages = Math.ceil(totalRows / perPage);
//         output.totalRows = totalRows;
//         if (page > output.totalPages) {
//             //到最後一頁
//             return res.redirect(`/address-book/list?page=${output.totalPages}`);
//         }
//         const sql = `SELECT * FROM address_book LIMIT ${perPage * (page - 1)},${perPage}`;
//         const [rs2] = await db.query(sql);
//         output.rows = rs2;
//     }

//     // res.json(output);
//     res.render('address-book/list', output);
// });

module.exports = router;