# express-session-nedb
使用 nedb 作为 session 的存储容器, 且保障nedb与项目使用统一版本依赖, 使 session 数据也可以被查询和管理

```bash
npm install express-session-nedb
```


```javascript
import nedb      from 'nedb'
import express   from 'express'
import session   from 'express-session'
import nedbstore from 'express-session-nedb'

const app = express()
const db = new nedb({filename:`./db/session.db`,autoload:true,timestampData:true})
const store = nedbstore(session, db)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({secret: 'shizukana', name:'sid', resave: false, saveUninitialized: false, cookie: { maxAge: 180 * 24 * 3600000 }, store: store}))


app.get('/' function(req, res, next) {
  return session_store.db.find({ "data.account.uid": req.session.account.uid }, function(err, docs) {
    return err ? res.status(500).send('错误') : res.json(docs)
  })
})

app.listen(8080)
```
