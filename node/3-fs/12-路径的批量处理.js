const fs = require('fs')
const path = require('path')

const files = fs.readdirSync('./')

files.filter(item => item.includes('-')).forEach((item, index) => {
  const [, name] = item.split('-')
  const newName = (index + 1 < 10 ? 0 + `${index + 1}` : index + 1) + '-' + name

  fs.renameSync(path.resolve(__dirname, item), path.resolve(__dirname, newName))
})
