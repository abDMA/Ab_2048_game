//cratting 16 board into gamae-block 
// genera random number of blocks
//swipe right
//swipe left
//swipe down
//swipe up 
//combine blocks by  clicking on arrow buttons
//check if there is 2048 and win
//check if there is no empty blocks and lose

const gameBlock = document.querySelector('.game-blocks')
const scoreDisplay = document.querySelector('.score span')
const best = document.querySelector('.bestScore')
const newGame = document.querySelector('.new button')
const left = document.querySelector('.left')
const up = document.querySelector('.up')
const right = document.querySelector('.right')
const down = document.querySelector('.down')
let saveScore = localStorage.getItem('bestScore')||0;
best.innerHTML = ` ${saveScore}`
newGame.addEventListener('click',()=>{
    window.location.reload();

})

right.addEventListener('click',()=>{
    moveRight()
    combinerow()
    moveRight()
    generateRandomNumber()
});
left.addEventListener('click',()=>{
    moveLeft()
    combinerow()
   moveLeft()
    generateRandomNumber()
});
up.addEventListener('click',()=>{
    moveUp()
    combineColumns()
    moveUp()
    generateRandomNumber()
});
down.addEventListener('click',()=>{
    movedown()
    combineColumns()
    movedown()
    generateRandomNumber()
});

let width = 4
let score = 0
let square = []
// genera random number of blocks
function createBoard() {
    for (let i = 0; i < width*width; i++) {
        const block = document.createElement('div');
        block.innerHTML = 0 
        block.classList.add('block');
        gameBlock.appendChild(block)
        square.push(block)
        
       
      
}
generateRandomNumber()
generateRandomNumber()
}
createBoard()
//generate random number of blocks
function generateRandomNumber() {
    const randomNumber = Math.floor(Math.random() * square.length) 
    if (square[randomNumber].innerHTML == 0 ){
        square[randomNumber].innerHTML = 2
        lose()
        changeColor()
    }else generateRandomNumber()
}
//swipe right
function moveRight(){
for (let i = 0; i < 16; i++) {
   if (i % 4 === 0) {
     let totalOne = square[i].innerHTML
     let totalTwo = square[i+1].innerHTML
     let totalThree = square[i+2].innerHTML
     let totalFour = square[i+3].innerHTML
     let row = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
     let filetRow = row.filter(num => num)
     let missing = 4 - filetRow.length
     let zero = Array(missing).fill(0)
     let fillLeft = zero.concat(filetRow)
     square[i].innerHTML = fillLeft[0]
     square[i+1].innerHTML = fillLeft[1]
     square[i+2].innerHTML = fillLeft[2]
     square[i+3].innerHTML = fillLeft[3]
     
   }
   
}
}moveRight()
//swipe left
function moveLeft(){
    for (let i = 0; i < 16; i++) {
       if (i % 4 === 0) {
         let totalOne = square[i].innerHTML
         let totalTwo = square[i+1].innerHTML
         let totalThree = square[i+2].innerHTML
         let totalFour = square[i+3].innerHTML
         let row = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
         let filetRow = row.filter(num => num)
         let missing = 4 - filetRow.length
         let zero = Array(missing).fill(0)
         let fillLeft = filetRow.concat(zero)
         square[i].innerHTML = fillLeft[0]
         square[i+1].innerHTML = fillLeft[1]
         square[i+2].innerHTML = fillLeft[2]
         square[i+3].innerHTML = fillLeft[3]
         
       }
       
    }
    }
    //swip down
    function movedown(){
        for (let i = 0; i < 4; i++){
            let totalOne = square[i].innerHTML
            let totalTwo = square[i+width].innerHTML
            let totalThree = square[i+(width*2)].innerHTML
            let totalFour = square[i+(width*3)].innerHTML
            let row = [parseInt(totalOne) , parseInt(totalTwo) , parseInt(totalThree) , parseInt(totalFour)]
            let filetRow = row.filter(num => num)
            let missing = 4 - filetRow.length
            let zero = Array(missing).fill(0)
            let fillLeft = zero.concat(filetRow)
            square[i].innerHTML = fillLeft[0]
            square[i+width].innerHTML = fillLeft[1]
            square[i+width*2].innerHTML = fillLeft[2]
            square[i+width*3].innerHTML = fillLeft[3]
        }
    }
     //swip up
     function moveUp(){
        for (let i = 0; i < 4; i++){
            let totalOne = square[i].innerHTML
            let totalTwo = square[i+width].innerHTML
            let totalThree = square[i+(width*2)].innerHTML
            let totalFour = square[i+(width*3)].innerHTML
            let row = [parseInt(totalOne) , parseInt(totalTwo) , parseInt(totalThree) , parseInt(totalFour)]
            let filetRow = row.filter(num => num)
            let missing = 4 - filetRow.length
            let zero = Array(missing).fill(0)
            let fillLeft = filetRow.concat(zero)
            square[i].innerHTML = fillLeft[0]
            square[i+width].innerHTML = fillLeft[1]
            square[i+width*2].innerHTML = fillLeft[2]
            square[i+width*3].innerHTML = fillLeft[3]
        }
    }
    

//combine blocks by  clicking on arrow buttons (row)
function combinerow(){
    for (let i = 0; i < 15; i++) {
        if (square[i].innerHTML === square[i+1].innerHTML ) {
            let combine = parseInt(square[i].innerHTML) + parseInt(square[i+1].innerHTML)
            square[i].innerHTML = combine
            square[i+1].innerHTML = 0
            score += combine
            scoreDisplay.innerHTML = score
            saveScore = score>= saveScore ? score :saveScore;
            localStorage.setItem('bestScore',saveScore)


        }
        
    }
     changeColor()
    win()
   
}

//combine blocks by  clicking on arrow buttons (columns)
function combineColumns(){
    for (let i = 0; i < 12; i++) {
        if (square[i].innerHTML === square[i+width].innerHTML ) {
            let combine = parseInt(square[i].innerHTML) + parseInt(square[i+width].innerHTML)
            square[i].innerHTML = combine
            square[i+width].innerHTML = 0
            score += combine
            scoreDisplay.innerHTML = score
            saveScore = score>= saveScore ? score :saveScore;
            localStorage.setItem('bestScore',saveScore)
        }
        
    }
    changeColor()
    win()
   
}


document.addEventListener('keydown', (e) =>{
    //moving right to left
    if (e.key === 'ArrowRight'){
        moveRight()
        combinerow()
        moveRight()
        generateRandomNumber()
        
       
        
    }else if (e.key === 'ArrowLeft'){
       moveLeft()
        combinerow()
       moveLeft()
        generateRandomNumber()
    }else if (e.key === 'ArrowUp'){
        moveUp()
        combineColumns()
        moveUp()
        generateRandomNumber()
    }else if (e.key ==='ArrowDown'){
        movedown()
        combineColumns()
        movedown()
        generateRandomNumber()
    }

} )

//check if there is 2048 and win

function win(){
    for (let i = 0; i < square.length; i++) {
        
       
        
        if (square[i].innerHTML == 2048) {
            setTimeout(()=>{
                alert('AWSOME YOU WIN')
               { window.location.reload();
}

            },200)
          
           
        }
    }}
   




//check if there is no empty blocks and lose
function lose(){
    let zero = 0 
    for (let i = 0; i < square.length; i++) {
        if (square[i].innerHTML == 0) {
           zero++
        }
       }
    if (zero === 0){
        setTimeout(()=>{
            alert('GAME OVER YOU LOSE')
            window.location.reload();

        },200)
    }}
   
    function changeColor(){
        const blocks = document.querySelectorAll('.block')
        for (let i = 0; i < square.length; i++) {
            if (square[i].innerHTML == 8) {
                blocks[i].classList.add('cream')
            }else if (square[i].innerHTML == 16){
                blocks[i].classList.remove('cream')
                blocks[i].classList.add('cream-foncee')
            }else if (square[i].innerHTML == 32){
                blocks[i].classList.remove('cream-foncee')
                blocks[i].classList.add('cream-red')
            }else if (square[i].innerHTML == 64){
                blocks[i].classList.remove('cream-red')
                blocks[i].classList.add('cream-r')
            }else if (square[i].innerHTML == 128){
                blocks[i].classList.remove('cream-r')
                blocks[i].classList.add('cream-a')
            }else if (square[i].innerHTML ==256){
                blocks[i].classList.remove('cream-a')
                blocks[i].classList.add('cream-b')
            }
            else if (square[i].innerHTML ==256){
                blocks[i].classList.remove('cream-a')
                blocks[i].classList.add('cream-b')
            }
            else{
                blocks[i].classList.remove('cream')
                blocks[i].classList.remove('cream-foncee')
                blocks[i].classList.remove('cream-red')
                blocks[i].classList.remove('cream-r')
                blocks[i].classList.remove('cream-a')
                blocks[i].classList.remove('cream-a')
            }

        }
      
     
      
    }

