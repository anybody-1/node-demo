var fs = require('fs')
var path = require('path')
const action = process.argv[2]
const content = process.argv[3]
const content1 = process.argv[4]
const dbPath = path.join(__dirname, 'db')
checkDB()
let list = fetch(),
  n = content
switch (action) {
  case 'add':
    addTask()
    break
  case 'list':
    break
  case 'delete':
    removeTask()
    break
  case 'done':
    doneTask()
    break
  case 'edit':
    editTask(content1)
    break
  default:
    console.log('你的动作是：' + action)
}
if (action != 'list') {
  save(list)
}
display()
//help函数
function save() {
  let data = JSON.stringify(list)
  fs.writeFileSync(dbPath, data)
}
function fetch() {
  const db = fs.readFileSync(dbPath).toString()
  let list = JSON.parse(db)
  return list
}
function addTask() {
  list.push([content, false])
}
function editTask() {
  list[n - 1][0] = content1
}
function removeTask() {
  list.splice(n - 1, 1)
}
function doneTask() {
  list[n - 1][1] = true
}
function display() {
  list.forEach(e => {
    console.log(`${e[1] ? '[√]' : '[x]'} ${e[0]}`)
  })
}
function checkDB() {
  try {
    fs.statSync(dbPath)
  } catch (err) {
    let data = JSON.stringify([])
    fs.writeFileSync(dbPath, data)
  }
}
