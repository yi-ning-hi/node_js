console.log(process.env.NODE_ENV);
require('dotenv').config();
const express = require('express');
const app = express();

app.set('view engine','ejs')
//只要用到set(做設定)，要放在所有路由最前面

// app.get('/a.html', (req, res) => {
//     res.send('<h2>動態內容</h2>');
// });

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home',{name:'Ning'});
    //沒有預設content-type，使用send會是html格式方式呈現res.type('text/html')
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