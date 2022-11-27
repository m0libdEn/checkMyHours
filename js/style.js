const solve=document.getElementById('solve')
const add = document.getElementById('add')

const table=document.getElementById('tbody')
const num = document.getElementById('num')
const salary = document.getElementById('salary')
const gross = document.getElementById('gross')
const tax = document.getElementById('withoutTax')

let arrOfLines = []
let totalHours = 0

add.addEventListener('click', function() {
    totalHours+=arrOfLines[arrOfLines.length-1].solveTime()
    num.innerHTML = fromMinToHours(totalHours)
    arrOfLines.push(new Line)
})

function makeInput(input, value){
    value = document.createElement('input')
    value.setAttribute("type","time")
    input.appendChild(value)
    return value
}

function fromHoursToMin(el) {
    return el.value.split(':')[0]*60+el.value.split(':')[1]*1
}
function fromMinToHours(el) {
  return el%60 > 9? `${Math.trunc(el/60)}:${el%60}`:`${Math.trunc(el/60)}:0${el%60}`
}

class Line{
    constructor(start, lunch1, lunch2, end, total){
        let line = document.createElement("tr")
        table.appendChild(line)

        let CreateStart = document.createElement("td")
        line.appendChild(CreateStart)
        this.start = makeInput(CreateStart, start)

        let CreateLunch1 = document.createElement("td")
        line.appendChild(CreateLunch1)
        this.lunch1 = makeInput(CreateLunch1, lunch1)

        let CreateLunch2 = document.createElement("td")
        line.appendChild(CreateLunch2)
        this.lunch2 = makeInput(CreateLunch2, lunch2)

        let CreateEnd = document.createElement("td")
        line.appendChild(CreateEnd)
        this.end = makeInput(CreateEnd, end )

        total = document.createElement("td")
        total.innerHTML = ''
        line.appendChild(total)
        this.total= total
    }
    solveTime(){
        let startInMin = fromHoursToMin(this.start)
        let startLunchInMin = fromHoursToMin(this.lunch1)
        let finishLunchInMin = fromHoursToMin(this.lunch2)
        let endInMin = fromHoursToMin(this.end)
        let res = endInMin - (finishLunchInMin - startLunchInMin) - startInMin
        this.total.innerHTML = fromMinToHours(res)
        return res
    }
}



solve.addEventListener('click',function() {
    let earnedmoney = 0
    if (totalHours > 4800) {
        let overtime = totalHours - 4800
        earnedmoney = 80*salary.value + ((Math.trunc(overtime/60))+(overtime%60)/60)*salary.value*1.5
    }else{
        earnedmoney = ((Math.trunc(totalHours/60))+(totalHours%60)/60)*salary.value
    }
    gross.innerHTML = `${earnedmoney.toFixed(2)} $`
    tax.innerHTML = `${(earnedmoney.toFixed(2)*0.85).toFixed(2)} $`

})      

arrOfLines.push(new Line())