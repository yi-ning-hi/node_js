const express = require("express");
const upload = require('./../modules/upload-imgs')
const db = require('./../modules/connect-db')
//參照index.js的const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  res.locals.shin += "admin2";
  next();
});

router.get("/myform/:sid", async (req, res) => {
  const sid = parseInt(req.params.sid) || 0;
  const [rs] = await db.query(
    `SELECT account,avatar,nickname FROM admins WHERE sid=${sid}`
  );
  res.json(rs);
});
router.put("/myform/:sid", upload.single('avatar'), async (req, res) => {
  let modifyAvatar = "";
  if (req.file && req.file.filename) {
    modifyAvatar = ` , avatar="${req.file.filename}"`;
  };
  const sql = `UPDATE admins SET nickname=? ${modifyAvatar} WHERE sid=?`

  const result= await db.query(sql,[req.body.nickname,req.params.sid]);
  res.json(result);
});

router.get("/", (req, res) => {
  res.send("admin2:root");
});

router.get("/abc", (req, res) => {
  res.json({
    originalUrl: req.originalUrl,
    "locals.shin": res.locals.shin,
  });
});

router.get("/def", (req, res) => {
  res.json({
    originalUrl: req.originalUrl,
    "locals.shin": res.locals.shin,
  });
});

router.get("/:p1?/:p2?", (req, res) => {
  let { params, url, originalUrl, baseUrl } = req;

  res.json({
    params,
    url,
    originalUrl,
    baseUrl,
    "locals.shin": res.locals.shin,
  });
});
module.exports = router;
