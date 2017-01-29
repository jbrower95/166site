function evaluate(cmd) {

    var hardCode = {
        help: "commands: \n\
                hours - View TA hours.\n\
                homeworks - View homeworks.\n\
                projects - View projects\n\
                staff - Meet the staff\n\
                news - Stuff that's going on\n",
        
        projects: "projects: \n\
                (162 only) warmup\t\t\t1/13 - 2/9\n\
                crypto           \t\t\t2/2 - 2/16\n\
                flag             \t\t\t2/16 - 3/9\n\
                handin           \t\t\t3/9 - 4/6\n\
                dropbox          \t\t\t4/6 - 4/20, 5/4, 5/11\n", 

        staff: "projects: \n\
                (162 only) warmup\t\t\t1/13 - 2/9\n\
                crypto           \t\t\t2/2 - 2/16\n\
                flag             \t\t\t2/16 - 3/9\n\
                handin           \t\t\t3/9 - 4/6\n\
                dropbox          \t\t\t4/6 - 4/20, 5/4, 5/11\n", 

        homeworks: "homeworks: \n\
                hw01      \t\t\t1/30 - 2/6\n\
                hw02      \t\t\t2/6 - 2/13\n\
                hw03      \t\t\t2/13 - 2/20\n\
                hw04      \t\t\t2/20 - 2/27\n\
                hw05      \t\t\t3/6 - 3/13\n\
                hw06      \t\t\t3/13 - 3/20\n\
                hw07      \t\t\t3/20 - 4/10\n\
                hw05      \t\t\t4/10 - 4/17\n", 
    };

    // install shortcuts.
    hardCode["p"] = hardCode["projects"];
    hardCode["h"] = hardCode["homeworks"];
    hardCode["s"] = hardCode["staff"];

    return hardCode[cmd];
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