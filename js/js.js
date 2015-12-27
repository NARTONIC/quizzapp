$(document).ready(function () {
    $(".reset").click(function() {
    location.reload(true);
});
    $(".start").click(trivia);

    function trivia() {
        var scoreAry = [];
        var questions = [{
            q: "¿Cual fue la primera consola en salir al mercado?",
            s: ["MSX", "Atari", "Sega MegaDrive", "Nintendo 64"],
            a: "Atari",
            correct: 0
        }, {
            q: "¿Cual fue la ultima consola de SEGA?",
            s: ["Dreamcast", "Sega MegaDrive", "Sega Saturn", "Playstation"],
            a: "Dreamcast",
            correct: 0
        }, {
            q: "¿Cual es la saga estrella de Nintendo?",
            s: ["Mario", "Zelda", "Pokemon", "Halo"],
            a: "Mario",
            correct: 0
        }, {
            q: "¿Por cual saga es conocida Rockstar?",
            s: ["Halo", "Call Of Duty", "Need For Speed", "Grand Theft Auto"],
            a: "Grand Theft Auto",
            correct: 0
        }, {
            q: "¿Cual es la consola de Microsoft?",
            s: ["Playstation", "WII", "XBOX", "No tiene"],
            a: "XBOX",
            correct: 0
        }, {
            q: "¿En que año salio Playstation en Europa?",
            s: ["2001", "2000", "1989", "1998"],
            a: "1998",
            correct: 0
        }];

        var counter = questions.length;

        //This grabs the question and answer data from the questions array and appends it to the #questions div:
        function createQuestion(questions) {
            for (var i = 0; i < questions.length; i++) {
                $(".start").hide();
                $("#questions").append('<form id="' + i + '" class="center-text"><p>Question ' + (i + 1) + ' of ' + questions.length + '</p><h3 class="question">' + questions[i].q + '</h3>' + radioButtons(questions[i].s, i) + '<button type="submit" class="next">NEXT</button></p></form>');
            }
            //This hides all except the first question:
            for (var k = questions.length - 1; k > 0; k--) {
                $('#' + k).hide();
            }
        }
        //This grabs the answer choices from the questions array and returns them to createQuestion():
        function radioButtons(ary, qNum) {
            var answers = [];
            for (i = 0; i < ary.length; i++) {
                answers.push('<label><input type="radio" name="' + qNum + '" value="' + ary[i] + '">' + ary[i] + '</label>');
            }
            return answers.join(" ");
        }
        
        //This sums the correct values in the questions array:
        function sumScore(questions) {
            return scoreAry.reduce(function (previousValue, currentValue, index, array) {
                return previousValue + currentValue;
            });
        }
        
        //This checks the user's answer and updates the score:
        function checkAnswer(answer, qNum, questions) {
            if (answer == questions[qNum].a) {
                questions[qNum].correct = 1;
                scoreAry.push(questions[qNum].correct);
            } else {
                scoreAry.push(questions[qNum].correct);
            }
        }
        
        createQuestion(questions);
        
        $(".next").click(function (event) {
            event.preventDefault(); //This stops the form from submitting
            var qNum = $(this).closest("form").attr("id"); //This gives us the question number
            var userInput = $('input[name=' + qNum + ']:radio:checked').val(); //This grabs the user's selected answer
            if (counter > 1) {
                checkAnswer(userInput, qNum, questions);
                $("#" + qNum).hide();
                $("#" + qNum).next().show();
                counter--;
            } else if (counter == 1) {
                checkAnswer(userInput, qNum, questions);
                $("#questions").find("form").remove();
                $("#questions").append('<h3 class="result"></h3>');
                $(".result").text('You answered ' + sumScore(questions) + ' questions correctly out of 6.');
                   for (j = 0; j < scoreAry.length; j++) {
                        if (scoreAry[j] === 0) {
                            console.log(questions[j].q, questions[j].a);
                            $("#questions").append('<p class="missed-' + j + '">You missed: ' + questions[j].q + ' ' + questions[j].a + '</p>');      
                        }
                    }
            } else {
                return false;
            }
        });
    }
});