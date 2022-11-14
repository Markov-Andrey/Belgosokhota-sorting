let inputName
let inputNum
let output
let outputNum
let strArr = []
let strArrRange = []
const separator = ','     //метод разделения строки (запятая)
const join = ', '         //метод сборки строки (запятая с пробелом)
const wrapStart = '('     //начало обертки (скобка)
const wrapEnd = ')'       //конец обертки (скобка)

//блок обработки данных
let processForm = () => {
  //входящие данные
  inputName = document.querySelector('#inputName').value
  inputNum = document.querySelector('#inputNum').value
  
  //логическая обработка
  arrStrSplit() //разбивка строки на массив, очистка от пробелов
  arrSort() //сортировка массива по возрастанию
  arrStrRange() //компоновка по диапазонам

  //выходящие данные
  arrStrJoin() //сборка строки в массив
  outputSrt() //выходящая строка и добавление в буфер обмена
}

//разбивка строки на массив, очистка от пробелов
let arrStrSplit = () => {
  strArr = inputNum.split(separator)
  for(i = 0; i < strArr.length; i++){
    strArr[i] = strArr[i].trim()
  }
}

////сортировка массива по возрастанию
let arrSort = () => {
  strArr = strArr.sort(function(a,b){ 
    return a - b
  })
}

//компоновка по диапазонам
let arrStrRange = () => {
  //фильтр от ошибочных повторов
  strArr = strArr.filter((e,i,a)=>a.indexOf(e)==i)
  //проверка на i + 1, перезапись массива
  strArrRange = strArr.slice(0)
  for(i = 0; i < strArr.length; i++){
    if (
      (strArr[i] == (strArr[i + 1] - 1)) && 
      (strArr[i] == (strArr[i + 2] - 2))
      ){
        strArrRange[i + 1] = '-';
      }
  }

  //очистка от ячеек с тире ("-")
  for (let i = strArrRange.length - 1; i > 0; i--) {
    if (strArrRange[i] == strArrRange[i - 1]) {
      strArrRange.splice(i - 1, 1);
      i++;
    }
  }
  strArr = strArrRange
}

//сборка строки в массив
let arrStrJoin = () => {
  outputNum = ""
  for(i = 0; i < strArr.length; i++){
    if(i < (strArr.length - 1)){
      if(
        (strArr[i + 1] == '-') ||
        (strArr[i] == '-')
        ){
        outputNum += strArr[i]
      } else {
        outputNum += strArr[i] + join
      }
    } else {
      outputNum += strArr[i]
    }
  }
}

//выходящие данные
let outputSrt = () => {
  outStr = `${inputName} ${wrapStart}${outputNum}${wrapEnd}`
  output = document.querySelector('#outputString')
  output.innerHTML = outStr

  /*Копирование строки в буфер обмена через стороннюю библиотеку*/
  let select
  select = output
  clipboard.writeText(outStr)
}

//кнопка очистки формы
let clearForm = () => {
  inputName = document.querySelector('#inputName')
  inputNum = document.querySelector('#inputNum')
  output = document.querySelector('#outputString')
  inputName.value = ''
  inputNum.value = ''
  output.innerHTML = '&nbsp;'
}