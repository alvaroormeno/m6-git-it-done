var issueContainerEl = document.querySelector("#issues-container");

var displayIssues = function(issues) {

    if (issues.length === 0) {
        issueContainerEl.textContent = "this repo has no open issues!";
        return;
    }

    //loop over response data from getrep Issues and create <a> element for each issue
    for (var i = 0; i < issues.length; i++) {
        //create link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute = ("href", issues[i].html_url);
        issueEl.setAttribute = ("target", "_blank");

        // create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        //append to containe
        issueEl.appendChild(titleEl);

        //create a type of element
        var typeEl = document.createElement("span");

        // check if usse is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)"
        }

        //append to containe
        issueEl.appendChild(typeEl);

        issueContainerEl.appendChild(issueEl);


    }

};


// function that will take in a repo name as a parameter
var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response) {
        //if request was successful
        if(response.ok) {
            response.json().then(function(data) {
                // pass response data to dom function
                displayIssues(data);
            });
        } else {
            alert("There was a problem with your request!")
        }
    });
};
  
getRepoIssues("alvaroormeno/run-buddy");