//game Constants & Variables
let InputDir = {x: 0, y: 0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameOver.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');

let score = 0;
let speed = 7;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]

food = {x:2, y:6};

//Game Functions
function main(ctime)
{
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed)
    {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake)
{
    //if you came into your self.
    for(let i = 1; i < snakeArr.length; i++)
    {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        {
            return true;
        }
    }
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0)
    {
       return true;
    }

}

function gameEngine()
{
    // Part 1: Updating the snake array & food;
    if(isCollide(snakeArr))
    {
        gameOverSound.play();
        musicSound.pause();
        InputDir = {x: 0, y: 0};
        alert("Game Over. Please press any key to start game again!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
    }

    //if you have eaten the food, increament the score and regenrate the food.
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x)
    {
        foodSound.play();
        score += 1;
        if(score > hiscoreval)
        {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiScoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "score: " + score;
        snakeArr.unshift({x: snakeArr[0].x+InputDir.x, y:snakeArr[0].y+InputDir.y})
        let a = 2;
        let b = 16;
        food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
    }

    //Moving the snake
    for(let i = snakeArr.length - 2; i >= 0; i--)
    {
        //const element = array[i];
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += InputDir.x;
    snakeArr[0].y += InputDir.y;

    //Part 2:  Display the snake and food
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index === 0)
        {
            snakeElement.classList.add('head');
        }
        else
        {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    }) 

    //Part 2:  Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}




//Main Logic Started Here
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null)
{
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else
{
    hiscoreval = JSON.parse(hiscore);
    hiScoreBox.innerHTML = "HiScore: " + hiscore;
}



window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    InputDir = {x : 0, y : 1} // Start the game
    moveSound.play();
    switch(e.key)
    {
        case "ArrowUp":
            console.log("ArrowUp");
            InputDir.x = 0;
            InputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            InputDir.x = 0;
            InputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            InputDir.x = -1;
            InputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            InputDir.x = 1;
            InputDir.y = 0;
            break;
        default:
            break;
    }
});