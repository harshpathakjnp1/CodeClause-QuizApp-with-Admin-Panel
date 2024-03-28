var questions = [
    {
        question: "HTML stands for -:",
        answer: "HyperText Markup Language",
        options: [
            "HighText Machine Language",
            "HyperText and Markup Language",
            "HyperText Markup Language",
            "None of these"
        ]
    },
    {
        question: "The correct sequence of HTML tags for starting a webpage is -",
        answer: "HTML, Head, Title, Body",
        options: [
            "Head, Title, HTML, body",
            "HTML, Body, Title, Head",
            "HTML, Head, Title, Body",
            "HTML, Head, Title, Body",
        ]
    },
    {
        question: "The full form of CSS is:",
        answer: "Cascading Style Sheets",    
        options: [
            "Cascading Style Sheets",
            "Coloured Special Sheets",
            "Color and Style Sheets",
            "None of The Above",
        ]
    },
    {
        question: "What type of CSS is generally recommended for designing large web pages?",
        answer: "External",
        options: [      
            "Inline",
            "Internal",
            "External",
            "None of These",
        ]
    },
    {
        question: "Javascript is an _______ language?",
        answer: "Object-Based",
        options: [        
            "Object-Oriented",
            "Object-Based",
            "Procedural",
            "None of These",
        ]
    }   
]
questions_temp = 
    {
        question: "",
        answer: "",
        options: []
    }
var seconds = 0
var minutes = 0
var answers = []
var qNum = 0;
var quizHeader = document.getElementById("quizHeader")
var quizBody = document.getElementById("quizBody")
var formattedSec = "00"
var formattedMin = "00"

var interval = ''
function activeOpt(e){
    var ul = document.getElementById('option_group')
    for(var i=0; i<questions[qNum].options.length; i++){
        if(ul.childNodes[i].className === 'active')
            ul.childNodes[i].classList.remove('active')
            ul.childNodes[i].className = 'option'
    }
    e.className = 'active'
    if(e.innerHTML === questions[qNum].answer)
        answers[qNum] = true
    else
        answers[qNum] = false
}

function nxtQuestion(){
    if(!(typeof answers[qNum] === 'undefined')){    
        if(qNum < questions.length-1){
            qNum++
            appendQuestion()
        }
        else{
            qNum=0
            appendResult()
        }
    }
    else
        alert("Please select an option")
}

function appendQuestion(){
    quizHeader.innerHTML = "<h3 class='quizHeader'>Q" + (qNum+1) + "/" + questions.length + "</h3><span id='timer'>" + formattedMin + ':' + formattedSec + "</span>"
    var divBody = "<h3 class='quizHeader'>Q: " + questions[qNum].question + "</h3>"
    divBody += "<ul class='option_group' id='option_group'>"
    for(var i=0; i<questions[qNum].options.length; i++){
        divBody += "<li class='option' onclick='activeOpt(this)'>" + questions[qNum].options[i] + "</li>";
    }
    divBody += "</ul>"
    divBody += "<button class='btn btn-primary nxtBtn' onclick='nxtQuestion()'>Next question</button>"
    quizBody.innerHTML = divBody
}

function appendResult(){
    var correctQ = 0;
    document.getElementById("exitBtn").style.display = "none"
    clearInterval(interval)
    quizHeader.innerHTML = "<h3>Result</h3>"
    quizHeader.style.justifyContent = "center"
    var divBody = "<Table class='table table-bordered'><thead class='thead-dark'>"
    for(var i=0; i<questions.length; i++)
        divBody += "<th>Q" + (i+1) + "</th>"
    divBody += "</thead><tbody>"
    for(var i=0; i<questions.length; i++){
        if(answers[i]){
            divBody += "<td><img style='width:20px' src='Images/check.png'></td>"
            correctQ++
        }
        else
            divBody += "<td><img style='width:20px' src='Images/cancel.png'></td>"
    }
    divBody += "</tbody></table>"   
    
    divBody += "<Table class='table table-bordered'><thead class='thead-dark'>"
    divBody += "<th>Points</th>"
    divBody += "<th>Percentage</th>"
    divBody += "<th>Time Taken (mm:ss)</th>"
    divBody += "</thead><tbody>"
    divBody += "<td>" + correctQ + "/" + questions.length + "</td>"
    divBody += "<td>" + (correctQ/questions.length)*100 + "%" + "</td>"
    divBody += "<td>" + formattedMin + ':' + formattedSec + "</td>"
    divBody += "</tbody></table>"   

    divBody += "<button class='btn btn-primary rstBtn' onclick='homePageReattempt()'>Re-attempt Quiz</button>"
    quizBody.innerHTML = divBody
}

function startQuiz(){
    document.getElementById("mainBody").style.display = "flex"
    document.getElementById("startBtn").style.display = "none"
    document.getElementById("adminBtn").style.display = "none"
    
    appendQuestion()
    
    document.getElementById("timer").innerHTML = "00:00"
    
    interval = setInterval(function(){
        if(seconds<59){
            seconds++
        }
        else{
            seconds = 0
            if(minutes<59) 
                minutes++
            else{
                minutes = 0
                clearInterval(interval)
                appendResult()
            }
        }
        formattedSec = seconds<10 ? '0' + seconds : seconds
        formattedMin = minutes<10 ? '0' + minutes : minutes
        document.getElementById("timer").innerHTML = (formattedMin + ':' + formattedSec)
    }, 1000)
       
}

/*===============================Panel Add Remove Edit================================*/
var addingRec = false;
var rVal = ''
var editingRec = false;
var colors = ["#7acbbd", "#ffb72b", "#855fc1", "#ea4986", "#ff8737"]
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thirsday", "Friday", "Saturday"]
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var colInd = 0;
var questionsUl = document.getElementById("questionsUl")

function appendAllQuestions(){
    for(var j=0; j<questions.length; j++){

        var numOfOptns = questions[j].options.length
        var optionVals = []
        var questionVal = questions[j].question
        for(var i=0; i<numOfOptns; i++)
            optionVals[i] = questions[j].options[i]
        var answerVal = questions[j].answer

        var divBody = "<li style='background-color: grey; border-radius: 30px; padding: 10px 30px !important; margin-bottom: 10px;'><input hidden value=\
        " + (j+1) + "><h3 class='quizHeader'>Q" + (j+1) + ":&nbsp" + questionVal + "</h3>"
        divBody += "<ul class='option_group' id='option_group'>"
        for (var i = 0; i < numOfOptns; i++) {
            if (optionVals[i] === answerVal)
                divBody += "<li class='optionPanel active' onclick=''>" + optionVals[i] + "</li>";
            else
                divBody += "<li class='optionPanel' onclick=''>" + optionVals[i] + "</li>";
            }
        divBody += "<li style='display: flex; justify-content: center;'>"
        divBody += "<button class='btn btn-success fa fa-pencil liBtn' onclick='EditRec(this)'></button>";
        divBody += "<button class='btn btn-danger fa fa-trash liBtn' onclick='deleteRec(this)'></button></li>";
        divBody += "</ul></li>"
        questionsUl.innerHTML += divBody
    }

}

function homePage(){
    document.getElementById("mainBody").style.display = "none"
    document.getElementById("startBtn").style.display = "block"
    document.getElementById("adminBtn").style.display = "block"  
    document.getElementById("mainPanel").style.display = "none"
    
    var questionsUl = document.getElementById("questionsUl")
    var first = questionsUl.firstElementChild;
    while (first) { 
        first.remove(); 
        first = questionsUl.firstElementChild;
    }
}

function homePageReattempt() {
    var first = quizHeader.firstChild
    first.remove();
    first = quizBody.firstChild;
    while (first) {
        first.remove();
        first = quizBody.firstChild;
    }
    clearInterval(interval)
    document.getElementById("mainBody").style.display = "none"
    document.getElementById("startBtn").style.display = "block"
    document.getElementById("adminBtn").style.display = "block"
    document.getElementById("exitBtn").style.display = "block"

    document.getElementById("quizHeader").style.justifyContent = "space-between"
    answers = []
    qNum = 0
    seconds = 0
    minutes = 0
}

function adminPanel(){
    document.getElementById("mainBody").style.display = "none"
    document.getElementById("startBtn").style.display = "none"
    document.getElementById("adminBtn").style.display = "none"  
    document.getElementById("mainPanel").style.display = "flex"
    appendAllQuestions()
}

function addQuestion(){
    if(!addingRec){
        addingRec = true;
        var optionsUl = document.createElement('ul')
        var li = document.createElement('li')
        var h3 = document.createElement('h3')
        var input = document.createElement('input')
        input.className = 'form-control w-75'
        input.required = 1;
        li.className = 'panelLi'
        li.style.listStyleType = "none"
        li.style.backgroundColor = "grey"
        li.style.borderRadius = "30px"
        li.style.setProperty("padding", "10px 30px", "important");
        optionsUl.style.width = "1000px"
        h3.innerHTML = "Q:&nbsp"
        li.appendChild(h3)
        li.appendChild(input)
        for(var i=0; i<4; i++){
            var optionsBody = "<li class='panelLi'><h3>Option " + (i+1) + ":&nbsp</h3><input class='form-control w-50'></li>"
            optionsUl.innerHTML += optionsBody
        }
        var ansLiHtml = "<li class='panelLi'><h3>Answer :&nbsp</h3><input class='form-control w-50'></li>"
        optionsUl.innerHTML += ansLiHtml
        var btnLiHtml = "<li style='display: flex; justify-content: center;'>"
        btnLiHtml += "<button class='btn btn-success liBtnTAdd fa fa-check' onclick='AddRec(this)'></button>"
        btnLiHtml += "<button class='btn btn-danger liBtnAdd fa fa-times' onclick='discardRec(this)'></button>"
        btnLiHtml += "</li>"
        optionsUl.innerHTML += btnLiHtml
        li.appendChild(optionsUl)
        questionsUl.appendChild(li)
    }
    else
        alert("You have a record adding in progress")
} 
function deleteRec(id){
    var discardQNum = id.parentNode.parentNode.parentNode.firstChild.value
    questions.splice(discardQNum-1, 1)
    var first = questionsUl.firstElementChild;
    while (first) { 
        first.remove(); 
        first = questionsUl.firstElementChild;
    }
    appendAllQuestions()
}

function discardRec(id){
    addingRec = false;
    id.parentNode.parentNode.parentNode.remove() 
}
function AddRec(id){
    var numOfOptns = id.parentNode.parentNode.childNodes.length - 2
    var optionVals = []
    var questionVal = id.parentNode.parentNode.parentNode.childNodes[1].value
    for(var i=0; i<numOfOptns; i++)
        optionVals[i] = id.parentNode.parentNode.childNodes[i].childNodes[1].value
    var answerVal = id.parentNode.previousSibling.childNodes[1].value

    //check if any required field is empty
    if(!(questionVal === '') && !(answerVal === '')){
        var enteredOpt = 0;
        //check if atleast two options are entered
        for(var i=0; i<optionVals.length; i++){
            if(!(optionVals[i] === ''))
               enteredOpt++
            if(enteredOpt==2)
                break
        }
        if(enteredOpt != 2)
            alert("Please enter atleast two options")
        else{
            //check if the answer matches any of the options
            enteredOpt = 0
            for(var i=0; i<optionVals.length; i++){
                if(optionVals[i] === answerVal){
                    enteredOpt = 1
                    break
                }
            }
            if(!enteredOpt)
                alert("Please enter one of the options in Answer filed")
            else{
                addingRec = false
                if(editingRec){
                    editingRec = false
                    var qNumEditHtml = id.parentNode.parentNode.parentNode.firstChild.innerHTML
                    var qNumEdit = qNumEditHtml.substring(1, qNumEditHtml.indexOf(':'))
                    
                    questions[qNumEdit-1].question = questionVal 
                    questions[qNumEdit-1].answer = answerVal
                    for(var i=0; i<numOfOptns; i++) 
                        questions[qNumEdit-1].options[i] = optionVals[i] 
                    
                    var divBody = "<li style='background-color: grey; border-radius: 30px; padding: 10px 30px !important; margin-bottom: 10px;'><input hidden value=\
                    " + qNumEdit + "><h3 class='quizHeader'>Q" + qNumEdit + ":&nbsp" + questions[qNumEdit-1].question + "</h3>"
                    divBody += "<ul class='option_group' id='option_group'>"
                    for (var i = 0; i < questions[qNumEdit-1].options.length; i++) {
                        if (questions[qNumEdit-1].options[i] === questions[qNumEdit-1].answer)
                            divBody += "<li class='optionPanel active' onclick=''>" + questions[qNumEdit-1].options[i] + "</li>";
                        else
                            divBody += "<li class='optionPanel' onclick=''>" + questions[qNumEdit-1].options[i] + "</li>";
                    }
                }
                else{
                    questions[questions.length] = questions_temp
                    questions[questions.length-1].question = questionVal 
                    questions[questions.length-1].answer = answerVal
                    for(var i=0; i<numOfOptns; i++) 
                        questions[questions.length-1].options[i] = optionVals[i] 
                    
                    var divBody = "<li style='background-color: grey; border-radius: 30px; padding: 10px 30px !important; margin-bottom: 10px;'><input hidden value=\
                    " + questions.length + "><h3 class='quizHeader'>Q" + questions.length + ":&nbsp" + questions[questions.length-1].question + "</h3>"
                    divBody += "<ul class='option_group' id='option_group'>"
                    for (var i = 0; i < questions[questions.length-1].options.length; i++) {
                        if (questions[questions.length - 1].options[i] === questions[questions.length - 1].answer)
                            divBody += "<li class='optionPanel active' onclick=''>" + questions[questions.length - 1].options[i] + "</li>";
                        else
                            divBody += "<li class='optionPanel' onclick=''>" + questions[questions.length - 1].options[i] + "</li>";
                    }
                }
                divBody += "<li style='display: flex; justify-content: center;'>"
                divBody += "<button class='btn btn-success fa fa-pencil liBtn' onclick='EditRec(this)'></button>";
                divBody += "<button class='btn btn-danger fa fa-trash liBtn' onclick='deleteRec(this)'></button></li>";
                divBody += "</ul></li>"
                var p = document.createElement('p')
                p.innerHTML += divBody
                questionsUl.insertBefore(p.firstChild, id.parentNode.parentNode.parentNode.nextSibling)
                id.parentNode.parentNode.parentNode.remove()
            }
        }
    }
    else
        alert("Please fill the required fields")
}
function EditRec(id){
    if(!addingRec){
        addingRec = true;
        editingRec = true;
        var numOfOptns = id.parentNode.parentNode.childNodes.length - 1
        var optionVals = []
        var answerVal = ''
        var questionValHtml = id.parentNode.parentNode.parentNode.childNodes[1].innerHTML
        var questionVal = questionValHtml.substring(questionValHtml.indexOf(';') + 1, questionValHtml.length)
        for (var i = 0; i < numOfOptns; i++) {
            optionVals[i] = "'" + id.parentNode.parentNode.childNodes[i].innerHTML + "'"
            if (id.parentNode.parentNode.childNodes[i].className.indexOf('active') != -1)
                answerVal = optionVals[i]
        } 
        var editQNum = id.parentNode.parentNode.parentNode.firstChild.value
        rVal = id.parentNode.parentNode.parentNode.parentNode.childNodes[editQNum]

        var optionsUl = document.createElement('ul')
        var li = document.createElement('li')
        var h3 = document.createElement('h3')
        var input = document.createElement('input')
        input.className = 'form-control w-75'
        input.required = 1;
        input.value = questionVal
        li.className = 'panelLi'
        li.style.listStyleType = "none"
        li.style.backgroundColor = "grey"
        li.style.borderRadius = "30px"
        li.style.setProperty("padding", "10px 30px", "important");
        optionsUl.style.width = "1000px"
        h3.innerHTML = 'Q' + editQNum + ':&nbsp'
        li.appendChild(h3)
        li.appendChild(input)
        for (var i = 0; i < 4; i++) {
            var optionsBody = "<li class='panelLi'><h3>Option " + (i + 1) + ":&nbsp</h3><input class='form-control w-50' value=" + optionVals[i] + "></li>"
            optionsUl.innerHTML += optionsBody
        }
        var ansLiHtml = "<li class='panelLi'><h3>Answer :&nbsp</h3><input class='form-control w-50' value=" + answerVal + "></li>"
        optionsUl.innerHTML += ansLiHtml
        var btnLiHtml = "<li style='display: flex; justify-content: center;'>"
        btnLiHtml += "<button class='btn btn-success liBtnTAdd fa fa-check' onclick='AddRec(this)'></button>"
        btnLiHtml += "<button class='btn btn-danger liBtnAdd fa fa-times' onclick='cancelUpdateRec(this)'></button>"
        btnLiHtml += "</li>"
        optionsUl.innerHTML += btnLiHtml
        li.appendChild(optionsUl)

        questionsUl.insertBefore(li, id.parentNode.parentNode.parentNode.nextSibling)

        id.parentNode.parentNode.parentNode.remove() 
    }
    else
        alert("You have a record adding in progress")
}
function cancelUpdateRec(id){
    addingRec = false;
    editingRec = false;
    questionsUl.insertBefore(rVal, id.parentNode.parentNode.parentNode.nextSibling)
    id.parentNode.parentNode.parentNode.remove()
}
function DelAll(){
    addingRec = false;
    var questionsUl = document.getElementById("questionsUl")
    var first = questionsUl.firstElementChild;
    while (first) { 
        first.remove(); 
        first = questionsUl.firstElementChild;
    }
    questions.splice(0, questions.length)
}
function showBtn(id){
    var btnE = id.getElementsByClassName('liBtn')[0]
    var btnD = id.getElementsByClassName('liBtn')[1]
    btnE.style.display = "inline"
    btnD.style.display = "inline"
}
function hideBtn(id){
    var btnE = id.getElementsByClassName('liBtn')[0]
    var btnD = id.getElementsByClassName('liBtn')[1]
    btnE.style.display = "none"
    btnD.style.display = "none"
}
