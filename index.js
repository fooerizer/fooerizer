const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const supertest = require('supertest')
const app = new Koa()

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

var Cat = mongoose.model('Cat', { name: String })

app.use(bodyParser())

app.use(async ctx => {
  var kitty = new Cat({ name: ctx.request.body['name'] })
  ctx.body = await kitty.save()
})



let request = supertest(app.listen())
request.post('/')
  .field('name', 'foo')
  .expect(200, function(err, res) {
    if (err) throw err
    console.log('k')
    process.exit()
  })
