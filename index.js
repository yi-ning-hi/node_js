console.log(process.env.NODE_ENV);
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const moment = require('moment-timezone');
const multer = require('multer');
// const upload = multer({ dest: 'tmp_uploads/' })
const upload = require(__dirname + '/modules/upload-imgs')
const fs = require('fs').promises;
const db = require('./modules/connect-db');

const app = express();


app.set('view engine', 'ejs')
//只要用到set(做設定)，要放在所有路由最前面
//view engine樣板處理器

// app.get('/a.html', (req, res) => {
//     res.send('<h2>動態內容</h2>');
// });

// Top-level middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

app.use(session({
    saveUninitialized:false,//儲存未初始化
    resave:false,
    secret:'jkfjsiokdfcqwvfvlksfvdjhjvuwrfsjhfweeyyyyHHHJoirkofjvj',
    cookie:{
        maxAge:1200000
    },
}));
//use不管什麼方法都會進來

//自訂的 頂層 middleware
app.use((req,res,next)=>{
    res.locals.shin = '哈囉';
    // res.send('ooooo'); //回應之後，不會往下個路由規則
    next();
});

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
app.post('/try-upload', upload.single('avatar'), async (req, res) => {

    res.json(req.file);
    //(req.file)拿到的是obj
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


app.post('/try-uploads', upload.array('photos'), async (req, res) => {

    const result = req.files.map(({mimetype,filename,size})=>{
        return {mimetype,filename,size};
    });
    //{mimetype,filename,size}三個變成區域變數


    // const result = req.files.map(el => {
    //     return {
    //         "mimetype": el.mimetype,
    //         "filename": el.filename,
    //         "size": el.size
    //     }
    // });

    res.json(result);
    //(req.files)拿到的是array
});

app.get('/my-params1/:action/:id',(req,res)=>{
    res.json(req.params);
});

app.get('/my-params2/:action?/:id?',(req,res)=>{
    res.json(req.params);
});
app.get('/my-params3/*/*?',(req,res)=>{
    res.json(req.params);
});

app.get(['/xxx','/yyy'],(req,res)=>{
    res.json({x:'y',url:req.url});
});

app.get(/^\/m\/09\d{2}-?\d{3}-?\d{3}$/i,(req,res)=>{
    let u = req.url.split('?')[0];
    u = u.slice(3);
    //i不區分大小寫
    //用空字串取代掉所有的-
    u = u.replace(/-/g,''); //u = u.split('-').join('');

    res.json({mobile:u});
});

app.use('/admin2',require('./routes/admin2'));

app.get('/try-session',(req,res)=>{
req.session.my_var = req.session.my_var || 0;
req.session.my_var++;
res.json(req.session);
});

app.get('/try-moment',(req,res)=>{
    const fm = 'YYYY-MM-DD HH:mm:ss';
    res.json({
        mo1: moment(new Date()).format(fm),
        mo2: moment().tz('Europe/London').format(fm),
        mo3: moment(req.session.cookie.expires).format(fm),
        mo4: moment(req.session.cookie.expires).tz('Europe/London').format(fm),
    })
    });

app.get('/try-db',async(req,res)=>{
        const sql = "SELECT * FROM `room-detail` LIMIT 5";

        const [rs, fields] = await db.query(sql);
        res.json(rs);
        });
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