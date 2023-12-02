const fs = require('fs')

// 创建写入流对象
const ws = fs.createWriteStream('./观书有感.txt')

ws.write('咏鹅\r\n')
ws.write('鹅鹅鹅\r\n')
ws.write('曲项向天歌\r\n')
ws.write('白毛浮绿水\r\n')
ws.write('红掌拨清波\r\n')


// 关闭通道
ws.close()