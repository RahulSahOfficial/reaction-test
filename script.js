var gameOn=false,greenOn=false
var before_time,after_time,delay_time
var update_arr=[]

function giveTime(){
    return Date.now();
}

// Setup game 
function game(){
    gameOn=true
    turn=1
    update_arr=[]
    $("#game-start").prop('disabled', true);
    $("#game-start").text("Started..")
    start_test()
}

// To start test 
function start_test(){
    $(".light").addClass("red")
    delay_time=Math.floor((Math.random() * 7) + 2);
    setTimeout(function(){
        before_time=giveTime()
        greenOn=true
        $(".light").addClass("green").removeClass("red")
        $(".time").css("visibility","visible")
        updating_time_str=setInterval(function(){
            $("#time-value").text(giveTime()-before_time+" ms")
        },10)
    },delay_time*1000)
}

// To show result 
function show_result()
{
    score_sum=0
    result_html=''
    result_html+='<ul>'
    update_arr.forEach(each => {
        result_html+='<li><i class="far fa-clock"></i> '+each+'ms </li>'
        score_sum+=each
    });
    result_html+='</ul>'
    result_html+=' <p class="final-score"><i class="far fa-clock"></i> '+Math.round(score_sum/5)+'ms</p>'
    $(".result-content").html(result_html)
    $(".result-div").slideDown("slow")
    $("#game-start").prop('disabled', false);
    $("#game-start").text("Start Test")
}


// To close the result Box
$("#close-results").click(function(){
    $(".result-div").slideUp("slow")
})

// To start the game 
$("#game-start").click(game)

// when user click green 
$(".light").click(function(){
    if(gameOn&&greenOn){
        greenOn=false
        clearInterval(updating_time_str);
        turn+=1;
        $(".light").removeClass("green")
        after_time=giveTime()
        reaction_time=after_time-before_time
        setTimeout(function(){
            $(".time").css("visibility","hidden")
        },2000)
        update_arr.push(reaction_time)
        if(turn!=6)
            start_test()
        else
        {
            gameOn=false
            show_result()
        }
    }
})