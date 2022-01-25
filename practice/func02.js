// const f1 = require('./func01');
//可省略副檔名只有兩種檔案第一個js檔第二個json檔（優先順序）
const f1 = require(__dirname + '/func01');
console.log(__dirname);
//__dirname當前的資料夾位置
console.log("func02:",f1(8));