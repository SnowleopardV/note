// 类型系统按照是否做隐式类型转换, 分为:
// 1. 强类型, 不做隐式类型转换, 如Python中, print(1 + '1') 在运行时报错： # TypeError: unsupported operand type(s) for +: 'int' and 'str'
// 2. 弱类型, console.log(1 + '1'); 在js和ts中, 会做隐式类型转换, 最终输出结果为 '11'
