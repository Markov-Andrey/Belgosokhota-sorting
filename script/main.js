let processFormBtn = document.querySelector(".buttonProcess")
let clearFormBtn = document.querySelector(".buttonClear")
let inputName = document.querySelector('#inputName')
let inputNum = document.querySelector('#inputNum')
let output = document.querySelector('#outputString')


processFormBtn.addEventListener("click", function() {

  let form = new FormProcessor(inputName.value, inputNum.value)
  form.processForm()
})

clearFormBtn.addEventListener("click", function() {
  inputName.value = ''
  inputNum.value = ''
  output.innerHTML = '&nbsp;'
})

class FormProcessor {
  constructor(inputName, inputNum) {
    this.inputName = inputName;
    this.inputNum = inputNum;
    this.strArr = [];
    this.strArrRange = [];
    this.outputNum = '';
    this.separator = ','; //метод разделения строки (запятая)
    this.join = ', ';     //метод сборки строки (запятая с пробелом)
    this.wrapStart = '('; //начало обертки (скобка)
    this.wrapEnd = ')';   //конец обертки (скобка)
    this.output = document.querySelector('#outputString');
  }

  //блок обработки данных
  processForm() {
    this.arrStrSplit(); //разбивка строки на массив, очистка от пробелов
    this.arrSort();     //сортировка массива по возрастанию
    this.arrStrRange(); //компоновка по диапазонам
    this.arrStrJoin();  //сборка строки в массив
    this.outputSrt();   //выходящая строка и добавление в буфер обмена
  }

  arrStrSplit() {
    this.strArr = this.inputNum.split(this.separator);
    for (let i = 0; i < this.strArr.length; i++) {
      this.strArr[i] = this.strArr[i].trim();
    }
  }

  arrSort() {
    this.strArr = this.strArr.sort((a, b) => a - b);
  }

  arrStrRange() {
    this.strArr = this.strArr.filter((e, i, a) => a.indexOf(e) === i);
    this.strArrRange = this.strArr.slice(0);
    for (let i = 0; i < this.strArr.length; i++) {
      if (
        this.strArr[i] == this.strArr[i + 1] - 1 &&
        this.strArr[i] == this.strArr[i + 2] - 2
      ) {
        this.strArrRange[i + 1] = '-';
      }
    }

    for (let i = this.strArrRange.length - 1; i > 0; i--) {
      if (this.strArrRange[i] === this.strArrRange[i - 1]) {
        this.strArrRange.splice(i - 1, 1);
        i++;
      }
    }
  }

  arrStrJoin() {
    this.outputNum = '';
    for (let i = 0; i < this.strArrRange.length; i++) {
      if (i < this.strArrRange.length - 1) {
        if (
          this.strArrRange[i + 1] == '-' ||
          this.strArrRange[i] == '-'
        ) {
          this.outputNum += this.strArrRange[i];
        } else {
          this.outputNum += this.strArrRange[i] + this.join;
        }
      } else {
        this.outputNum += this.strArrRange[i];
      }
    }
  }

  outputSrt() {
    this.outStr = `${this.inputName} ${this.wrapStart}${this.outputNum}${this.wrapEnd}`;
    this.output.innerHTML = this.outStr
  }
}