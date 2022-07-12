let colors = ['red','green','blue','yellow'];
let randomColor = [];
let userSelectedColor = [];
let level = 0;
let score = 0;
let started = false;

const btnEl = document.querySelectorAll('.btn');
const layoutEl = document.getElementById('layout');
const scoreEl = document.querySelector('#scoreBoard p');
let containerEl = document.querySelector('#container h1');
let guideEl = document.getElementById('guide');
let contentEl = document.getElementById('content');

if(window.innerWidth < 500){
    containerEl.innerText = 'Tap to Start';
    console.log('mobile');
    setTimeout(() => {
        contentEl.addEventListener('touchstart', function(){
            initStart();
            console.log('touchStart');
    })
    }, 20500);
}else{
    containerEl.innerText = 'Press a Key to Start';
    console.log('laptop');
    setTimeout(() => {
        document.addEventListener('keypress', function(){
            initStart();
            console.log('keypressed');
    });
    }, 20500);
}

const showGuide = ()=>{
    guideEl.classList.add('guideShow');
}

setInterval(() => {
    showGuide();
}, 20000);

const initStart = ()=>{
    if(!started){
        console.log('initStart');
        containerEl.textContent = `Level: ${level}`;
        scoreUpdate();
        started = true;
        getRandomColor();
    }
}

btnEl.forEach(ele =>{
    let ids = ele.getAttribute('id');
    ele.style.backgroundColor = `${ids}`;

    ele.addEventListener('click',function(){
        console.log('clicked');
        let userClick = this.getAttribute('id');
        userSelectedColor.push(userClick);   
        checkAnswer(userSelectedColor.length - 1);
        animateBtn(userClick);
    })
})


let scoreUpdate = ()=>{
    scoreEl.innerText = `Score: ${score}`;
}
const checkAnswer = (index)=>{
    if(randomColor[index] === userSelectedColor[index]){
        if(randomColor.length === userSelectedColor.length){
            score++;
            scoreUpdate();
            setTimeout(()=>{
                getRandomColor();
            },1000);
            console.log('checkAnswer');
        }
    }else{
        let noteEl = document.createElement('div');
        noteEl.className = 'note';
        noteEl.setAttribute('id', 'note');
        noteEl.innerHTML = `
                <h3>OOPS!!! You select the wrong Button</h3>
                <p>Total Score: ${score}</p>
                <button onclick= startOver()>Play Again</button>
        `
        layoutEl.appendChild(noteEl);
        layoutEl.classList.add('show');
        soundBtn('wrong');
    }
}

let startOver = ()=>{
    console.log('startOver');
    randomColor = [];
    userSelectedColor = [];
    score = 0;
    level = 0;
    started = false;
    setTimeout(()=>{
        initStart();
    },1200);
    soundBtn('green');
    scoreUpdate();
    layoutEl.classList.remove('show');
}


const getRandomColor = ()=>{
    userSelectedColor = [];
    level++;

    containerEl.textContent = `Level: ${level}`;
    let random = Math.floor(Math.random() * colors.length);
    let color = colors[random];
    randomColor.push(color);
    animateBtn(color);
}
const animateBtn = (currentColor)=>{
    document.querySelector(`.${currentColor}`).classList.add('pressed');
    setTimeout(()=>{
        document.querySelector(`.${currentColor}`).classList.remove('pressed');
    },100);
}

const soundBtn = (btn)=>{
    var audio = new Audio(`sounds/${btn}.mp3`);
    audio.play();
}
