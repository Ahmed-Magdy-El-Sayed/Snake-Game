/* 
    v1 = a+a
    a > 0  -->  a+a = v2
    v2 = a+a+1
    a+a+1 = v1
*/
let move;
let dir;
let offsetBottom;
let offsetRight;
let frist=[];
let second=[];
let speed = 200;
let score = 0;
let topScore = 0;
let newS = false;
let arrow = "ArrowUp";
if(localStorage.getItem("HScore"))
    topScore = parseInt(localStorage.getItem("HScore"));
$("h4")[0].innerHTML = `score : ${score}`;
function snake() {
    for(let q = 0; q < $(".body").length;q++){
        $($(".body")[q]).css("top",$(".snake div")[q].offsetTop + 15);
        $($(".body")[q]).css("left",$(".snake div")[q].offsetLeft);
    }
}
snake();
$(window).resize(snake);

for(let q = 0; q < $(".body").length;q++){
$($(".body")[q]).css("top",$(".snake div")[q].offsetTop + 15);
$($(".body")[q]).css("left",$(".snake div")[q].offsetLeft);
}

function moving(e){
    for(let a = 0; a < Math.ceil($(".snake div").length / 2) ;a++){
        frist[0] = $($(".snake div")[a+a]).css("top");
        frist[1] = $($(".snake div")[a+a]).css("bottom") ;
        frist[2] = $($(".snake div")[a+a]).css("right");
        frist[3] = $($(".snake div")[a+a]).css("left");
        if(e.code == "ArrowUp" && a==0){
            $(".head").css("top",$(".head")[0].offsetTop - 15);
        }
        else if(e.code == "ArrowLeft" && a==0){
            $(".head").css("left",$(".head")[0].offsetLeft - 15);
        }
        else if(e.code == "ArrowRight" && a==0){
            $(".head").css("left","unset")
            $(".head").css("right",offsetRight - 15);
        }
        else if(e.code == "ArrowDown" && a==0){
            $(".head").css("top","unset")
            $(".head").css("bottom",offsetBottom - 15);
        }
        if(a > 0){
            $($(".snake div")[a+a]).css("top",second[0]);
            $($(".snake div")[a+a]).css("bottom",second[1]);
            $($(".snake div")[a+a]).css("left",second[2]);
            $($(".snake div")[a+a]).css("right",second[3]);
        }
        if(!(a == Math.ceil($(".snake div").length / 2)-1 && ($(".snake div").length-1)%2 == 0)){
            second[0] = $($(".snake div")[a+a+1]).css("top");
            second[1] = $($(".snake div")[a+a+1]).css("bottom");
            second[2] = $($(".snake div")[a+a+1]).css("left");
            second[3] = $($(".snake div")[a+a+1]).css("right");
            $($(".snake div")[a+a+1]).css("top",frist[0]);
            $($(".snake div")[a+a+1]).css("bottom",frist[1]);
            $($(".snake div")[a+a+1]).css("right",frist[2]);
            $($(".snake div")[a+a+1]).css("left",frist[3]);
        }
    }
}
window.onkeydown = e =>{
    if(!($(".gameOver")[0])){
        if(e.code == "ArrowUp" && arrow != "ArrowDown"){dir = 0;clearInterval(move);
            setTimeout(()=>{arrow = e.code;},speed <= 80?10:180);
            move = setInterval(() => {
                if(dir < $(".snake div").length-1){
                    $(".snake div")[dir].style.transform = "unset";
                    $(".snake div")[dir+1].style.transform = "unset";++dir;
                }
                moving(e);
            }, speed);
        }
        else if(e.code == "ArrowDown" && arrow != "ArrowUp"){dir = 0;clearInterval(move);
            setTimeout(()=>{arrow = e.code;},speed <= 80?10:180);
            move = setInterval(() => {
                offsetBottom = (window.innerHeight - $(".head")[0].offsetTop - $(".head").height());
                if(dir < $(".snake div").length-1){
                    $(".snake div")[dir].style.transform = "rotate(180deg)";
                    $(".snake div")[dir+1].style.transform = "rotate(180deg)";dir++;
                }
                moving(e);
            }, speed);
        }
        else if(e.code == "ArrowLeft" && arrow != "ArrowRight"){dir = 0;clearInterval(move);
            setTimeout(()=>{arrow = e.code;},speed <= 80?10:180);
            move = setInterval(() => {
                if(dir < $(".snake div").length-1){
                    $(".snake div")[dir].style.transform = "rotate(-90deg)";
                    $(".snake div")[dir+1].style.transform = "rotate(-90deg)";dir++;
                }
                moving(e);
            }, speed);
        }
        else if(e.code == "ArrowRight" && arrow != "ArrowLeft"){dir =0;clearInterval(move);
            setTimeout(()=>{arrow = e.code;},speed <= 80?10:180);
            move = setInterval(() => {
                offsetRight = (window.innerWidth - $(".head")[0].offsetLeft - $(".head").width());
                if(dir < $(".snake div").length-1){
                    $(".snake div")[dir].style.transform = "rotate(90deg)";
                    $(".snake div")[dir+1].style.transform = "rotate(90deg)";dir++;
                }
                moving(e);
            }, speed);
        }
        else if(e.code == "Space"){
            clearInterval(move);
        }
    }
}
let end = ()=>{
    for (let i = 0; i < $(".body").length; i++) {
        if(($(".head")[0].getBoundingClientRect().x 
        - $(".body")[i].getBoundingClientRect().x <= 10
        &&$(".head")[0].getBoundingClientRect().x 
        - $(".body")[i].getBoundingClientRect().x >= -10)
        && ($(".head")[0].getBoundingClientRect().y 
        - $(".body")[i].getBoundingClientRect().y <= 10
        &&$(".head")[0].getBoundingClientRect().y 
        - $(".body")[i].getBoundingClientRect().y >= -10))
            return true;
    }
}
setInterval(() => {
    $("h4").css("right",$("h4")[0].offsetWidth)
    if(($(".food")[0].getBoundingClientRect().x - $(".head")[0].getBoundingClientRect().x < 10
        && $(".food")[0].getBoundingClientRect().x - $(".head")[0].getBoundingClientRect().x > -10)
        && ($(".food")[0].getBoundingClientRect().y - $(".head")[0].getBoundingClientRect().y < 15 
        && $(".food")[0].getBoundingClientRect().y - $(".head")[0].getBoundingClientRect().y > -10)){
        randomPlaces();
        $(".snake div:last-child").after(`<div class = "body"></div>`);
        $(".snake div:last-child").css("top",$(".snake div:nth-last-child(2)").css("top"));
        $(".snake div:last-child").css("left",$(".snake div:nth-last-child(2)").css("left"));
        if(speed > 40)
            speed -= 10;
        score += 10;
        if(topScore < score){
            topScore = score;
            newS = true;
        }
        $("h4")[0].innerHTML = `score : ${score} \\ ${topScore}`;
    }
    $("h3").innerHTML=score;
    if(($(".head")[0].getBoundingClientRect().x+5)
    -($(".ground")[0].getBoundingClientRect().x+$(".ground").width())>=0
    || $(".head")[0].getBoundingClientRect().y<-3 || $(".head")[0].getBoundingClientRect().y>865
    || ($(".head")[0].getBoundingClientRect().x)-($(".ground")[0].getBoundingClientRect().x)<-3
    || end())
    {
        localStorage.setItem("HScore",topScore);
        if(!($(".gameOver")[0])){clearInterval(move);
            document.body.appendChild(document.createElement("div")).className = "gameOver";
            $(".gameOver")[0].appendChild(document.createElement("h1")).innerHTML = "Game Over";
            if(newS)
            $(".gameOver")[0].appendChild(document.createElement("p")).innerHTML = `Congratulation!!!  New Heighest score : ${topScore}`;
            else
            $(".gameOver")[0].appendChild(document.createElement("p")).innerHTML = "score : "+ score + ' \\ ' +topScore;
            $(".gameOver")[0].appendChild(document.createElement("div"));
            $(".gameOver").css({
                'display': 'flex',
                'justify-content': 'center',
                'align-items': 'center',
                'flex-direction': 'column',
                'position': 'absolute',
                'top': '0',
                'z-index': '2',
                'width': '100vw',
                'height': '100vh',
                'background-color': '#0000008c'
            })
            $(".gameOver h1").css({
                'color':'tomato',
                'font-family':'sans-serif',
                'font-size':'80px'
            })
            $(".gameOver p").css({
                'color': 'white',
                'font-family':'sans-serif',
                'font-size':'30px',
                'margin':'0'
            })
            $(".gameOver div").click(function(){
                location.reload();
            })
            }
    }
},);
$("span").css('left','0');
setTimeout(()=>{$("span").css('display','none')},4000);
function randomPlaces() {
    $(".food").css({
        "top": `${Math.floor(Math.random() * 99)}vh` ,
        "left":window.matchMedia("(max-width:768px)").matches? 
        `${Math.floor(Math.random()*100)}vw`:`${Math.floor(Math.random()*49)}vw`
    })
}
randomPlaces();