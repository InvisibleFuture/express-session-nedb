# express-session-nedb
Use nedb as the storage container for session, and ensure that nedb and the project use the same version of dependencies, so that session data can also be queried and managed.

使用 nedb 作为 session 的存储容器, 且保障nedb与项目使用统一版本依赖, 使 session 数据也可以被查询和管理

```bash
npm install express-session-nedb
```


```javascript
import nedb               from 'nedb'
import express            from 'express'
import expressSession     from 'express-session'
import expressSessionNedb from 'express-session-nedb'

const sessions = new nedb({
  filename:`./db/session.db`,
  autoload:true,
  timestampData:true
})

const app = express()
const store = expressSessionNedb(expressSession, sessions)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
  secret: 'shizukana',
  name:'sid',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 180 * 24 * 3600000 },
  store: store
}))

app.get('/api/sessions' function(req, res, next) {
  const { page, pageSize, ...query } = req.query
  sessions.find(query, (err, docs) => {
    res.json({ page, pageSize, list: docs })
  })
})

app.listen(3000)
```
