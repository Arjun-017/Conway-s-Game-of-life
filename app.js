
const container = document.getElementById('container')
const stepbtn = document.getElementById('step-btn')
const runbtn = document.getElementById('run-btn')
let matrix = []
var temporary = new Array()

let temp = {}
var x = 0
var y = 0
let z = ''
var index = 0
let speed = 0
let generation = 0
let gencount = 0
let evolution = 0
let running = false


for(var i=10;i<100;i++){
    for(var j=10;j<100;j++){
        t = document.createElement('div')
        t.setAttribute('class','cell')
        t.setAttribute('id','cell'+i+j)
        container.appendChild(t)
    }
}

for(var i=10;i<100;i++){
    for(var j=10;j<100;j++){
        temp = {
            id: 'cell'+i+j,
            value: 0
        }
        matrix.push(temp)
    }
}

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click',e => {
        cell.style.backgroundColor = 'wheat'
        targetId = cell.getAttribute('id')
        z = targetId.slice(4)
        console.log(z)
        x = z%100
        y = Math.floor(z/100)
        index = (y-10)*90+(x-10)
        targetCell = matrix[index]
        targetCell.value = 1
        matrix[index] = targetCell
        console.log(matrix[index])

    })
})

runbtn.addEventListener('click', run)
stepbtn.addEventListener('click', step)

function update(){
 
    for(var i = 10;i<100;i++){
        for(var j = 10;j<100;j++){
            index = (i-10)*90+(j-10)
            if(matrix[index].value == 0){
                document.getElementById('cell'+i+j).style.backgroundColor = '#272727'
            }
            if(matrix[index].value == 1){
                document.getElementById('cell'+i+j).style.backgroundColor = 'wheat' 
            }
        }
    }
    
}

function run(){
    if(!running){
        runbtn.innerText = 'Stop'
        running = true
        speed = parseInt(document.getElementById('speed').value)
        generation = parseInt(document.getElementById('generation').value)
        if(speed>10 && speed<0){
            speed = 1
        }
        if(generation>5000 && generation<0){
            generation = 100
        }
        console.log(speed)
        gencount = 1
        evolution = setInterval(mainLoop,(2000/speed))    
    }
    else{
        runbtn.innerText = 'Run'
        running = false
        clearInterval(evolution)

    }
}

function step(){
    gencount = 0
    generation = 1
    let neighbour = 0
    let life = 0
    let index = 0
    let newCell = {}
    temporary = duplicateMatrix()

    for(var i = 10;i<100;i++){
        for(var j = 10; j<100;j++){
            life = 0
            index = 90*(i-10)+(j-10)
            neighbour = getNeighbours(i,j)
            if(temporary[index].value == 1){
                if((neighbour<2)||(neighbour>3)){
                    life = 0
                }
                if((neighbour==2)||(neighbour==3)){
                    life = 1
                }
            }
            else{
                if(neighbour==3){
                    life = 1
                }
           }
           
           newCell = matrix[index]
           newCell.value = life
           matrix[index] = newCell
        }
        
    }
    update()
}

function mainLoop(){
    if(gencount>=generation){
        clearInterval(evolution)
    }
    gencount += 1
    let neighbour = 0
    let life = 0
    let index = 0
    let newCell = {}
    temporary = duplicateMatrix()

    for(var i = 10;i<100;i++){
        for(var j = 10; j<100;j++){
            life = 0
            index = 90*(i-10)+(j-10)
            neighbour = getNeighbours(i,j)
            if(temporary[index].value == 1){
                if((neighbour<2)||(neighbour>3)){
                    life = 0
                }
                if((neighbour==2)||(neighbour==3)){
                    life = 1
                }
            }
            else{
                if(neighbour==3){
                    life = 1
                }
           }
           
           newCell = matrix[index]
           newCell.value = life
           matrix[index] = newCell
        }
        
    }
    update()
    console.log(matrix)
}

function getNeighbours(i,j){
    let neighbours = 0
    
    if((i>10 && i<99)&&(j>10 && j<99)){
        neighbours = temporary[(i-10)*90+(j-10-1)].value+temporary[(i-10)*90+(j-10+1)].value+temporary[(i-10-1)*90+(j-10)].value+temporary[(i-10+1)*90+(j-10)].value+temporary[(i+1-10)*90+(j+1-10)].value+temporary[(i-1-10)*90+(j-1-10)].value
        +temporary[(i+1-10)*90+(j-1-10)].value+temporary[(i-1-10)*90+(j+1-10)].value
    }

    return neighbours
}

function duplicateMatrix(){
    var dupli = new Array()
    var t = new Array()

    for(var i=10;i<100;i++){
        for(var j=10;j<100;j++){
            index = (i-10)*90+(j-10)
            temp = {
                id: 'cell'+i+j,
                value: matrix[index].value
            }
            dupli.push(temp)
        }
    }

    return dupli
}

function test(){
    var temporary = new Array()
    temporary = duplicateMatrix()
    console.log(temporary)
}