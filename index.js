function redirectTo(link) {   
        //open download link in new page
        window.open(link);
        window.focus();
}

function sendEmail(to) {

    var email;

    // assume 'to' is a login.
    if (to == "tas") {
        email = "cs1660tas@lists.brown.edu"
    } else if (to == "htas") {
        email = "cs1660htas@lists.brown.edu"
    } else if (to == "roberto") {
        email = "roberto_tamassia@brown.edu";
    } else {
        email = to + "@cs.brown.edu";
    } 

    var subject = "CS166 - Question";
    var message = "?";

   var str = 'http://mail.google.com/mail/?view=cm&fs=1'+
  '&to=' + email +
  '&su=' + subject +
  '&body=' + message +
  '&ui=1';
    window.open(str);
}

function linkForAssignmentOrProject(what) {
    var assgn = what + ".pdf";
    
    var isHomework = (what.lastIndexOf("hw", 0) === 0)
    var type = isHomework ? "homeworks" : "projects";

    var baseURL = "http://cs.brown.edu/courses/cs166/content/" + type + "/";
    var URL = baseURL + assgn;
    return URL;
}

function evaluate(cmd) {

    var hardCode = {
        help: "commands: \n\
    hours - View TA hours.\n\
    [h]omeworks - View homeworks.\n\
    [p]rojects - View projects\n\
    [s]taff - Meet the staff\n\
    leave - Go to a more normal website\n\
    news - Stuff that's going on\n\
    show <assignment> - Show the pdf of an assignment\n\r\
    email <login | tas | htas> - Send an email to one of the instructors.",
        
        projects: "projects: \n\
    *(162 only) warmup \t\t\t1/13 - 2/9\n\
    crypto             \t\t\t2/2 - 2/16\n\
    flag               \t\t\t2/16 - 3/9\n\
    handin             \t\t\t3/9 - 4/6\n\
    dropbox            \t\t\t4/6 - 4/20, 5/4, 5/11\n\
    \n\
    * indicates that a project has been released.", 

        news: "\nNone yet. Check back soon.\n",

        hours: "\nThese will be up soon.\n",

        staff: "\n\
    roberto: Roberto Tamassia (Prof)\n\
    zstoll: Zoe Stoll (HTA)\n\
    agokasla: Aaron Gokaslan (HTA)\n\
    jbrower: Justin Brower\n\
    arothen: Anne Rothen\n\
    zdixon: Zachary Dixon\n\
    arothen: Anne Rothen\n\
    gbeltran: Memo Beltran\n", 

        homeworks: "homeworks: \n\
    *hw01     \t\t\t1/30 - 2/6\n\
    hw02      \t\t\t2/6 - 2/13\n\
    hw03      \t\t\t2/13 - 2/20\n\
    hw04      \t\t\t2/20 - 2/27\n\
    hw05      \t\t\t3/6 - 3/13\n\
    hw06      \t\t\t3/13 - 3/20\n\
    hw07      \t\t\t3/20 - 4/10\n\
    hw05      \t\t\t4/10 - 4/17\n\
    \n\
    * indicates that a homework has been released.\n", 
    };

    // install shortcuts.
    hardCode["p"] = hardCode["projects"];
    hardCode["h"] = hardCode["homeworks"];
    hardCode["s"] = hardCode["staff"];

    // See if the command is a hardcoded function.
    if (cmd in hardCode) {
        return hardCode[cmd];
    } else {

        // try to split it up.
        var parts = $.terminal.parse_arguments(cmd);
        if (parts.length > 0) {
            var cmd = parts[0];
            if (cmd === "show") {
                var what = parts[1];
                if (what) {
                    redirectTo(linkForAssignmentOrProject(what));
                }
                return "";
            } else if (cmd === "email") {
                var who = parts[1];
                if (who) {
                    sendEmail(who);
                }
            } else if (cmd == "leave") {
                location.href = "https://cs.brown.edu/courses/cs166/old"
            }
        }

        // could be a complex command, or garbage.
        return cmd + ": command not found.";
    } 
}

jQuery(function($, undefined) {
    $('#terminal').terminal(function(command, term) {
        if (command !== '') {
            try {
                var result = evaluate(command);
                if (result !== undefined) {
                    term.echo(new String(result));
                }
            } catch(e) {
                term.error(new String(e));
            }
        } else {
           term.echo('');
        }
    }, {
        greetings: 'Class website.',
        name: 'Welcome to CS166',
        height: 1000,
        prompt: 'fsociety> '
    });
});

$( document ).ready(function() {
  // Handler for .ready() called.
  jQuery.terminal.active().echo(evaluate("help"));
  $("textarea").trigger("focus");
});