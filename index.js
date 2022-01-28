console.log(process.env.NODE_ENV);
require('dotenv').config();
const express = require('express');
const multer = require('multer');
// const upload = multer({ dest: 'tmp_uploads/' })
const upload = require(__dirname+'/modules/upload-imgs')
const fs = require('fs').promises;

const app = express();


app.set('view engine', 'ejs')
//只要用到set(做設定)，要放在所有路由最前面
//view engine樣板處理器

// app.get('/a.html', (req, res) => {
//     res.send('<h2>動態內容</h2>');
// });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
//use不管什麼方法都會進來


app.get('/', (req, res) => {
    res.render('home', { name: 'Ning' });
    //沒有預設content-type，使用send會是html格式方式呈現res.type('text/html')
});

// app.get('/json-sales', (req, res) => {
//     const sales = require('./data/sales');//進來變陣列
//     // TODO 排序
//     console.log(sales);
//     res.send(sales[0].name);
//     // res.json(sales[0].age);
// });

app.get('/json-sales', (req, res) => {
    // res.json(req.query.orderByCol)
    //req.query.orderByCol=age
    //req.query.orderByRule=desc
    const orderByCol = req.query.orderByCol;
    const orderByRule = req.query.orderByRule;
    const sales = require('./data/sales');//進來變陣列
    // TODO 排序
    res.render('json-sales', { sales });
    console.log(sales);
    // if (orderByCol == 3 && orderByRule ==1) {
    //     sales.sort(function (a, b) {
    //         return a[3] - b[3];
    //     });
    // };




});

app.get('/try-qs', (req, res) => {
    res.json(req.query);
});

// const urlencodedParser = express.urlencoded({extended:false});
// app.post('/try-post',urlencodedParser,(req, res) => {
//     res.json(req.body);

// });
app.post('/try-post', (req, res) => {
    res.json(req.body);
});

app.get('/try-post-form', (req, res) => {
    res.render('try-post-form');
});
app.post('/try-post-form', (req, res) => {
    res.render('try-post-form', req.body);
});
app.post('/try-upload', upload.single('avatar'), async(req, res) => {
    res.json(req.file);
    // const types = ['image/jpeg', 'image/png']
    // if (req.file && req.file.originalname) {
    //     if (types.includes(req.file.mimetype)) {
    //         await fs.rename(req.file.path,__dirname+'/public/img/'+req.file.originalname);
    //         return res.redirect('/img/'+req.file.originalname);
    //     }else{
    //         return res.send('檔案類型不符合');
    //     }
    // }
    // res.send('bad');
});
//(single：單張圖片，avatar：欄位名稱)

//********* 所有路由的最後面
app.use((req, res) => {
    // res.type('text/plain')
    res.status(404);
    res.send('<h2>走錯路了</h2>');
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server started: ${port} - `, new Date());
});