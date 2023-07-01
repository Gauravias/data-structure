function onChange() {
    var select = document.getElementById("algorithm");
    var selected = select.options[select.selectedIndex].value;

    if (selected != "fcfs") {
        document.getElementById("priority").style.display = "block";
    }
    else {
        document.getElementById("priority").style.display = "none";
    }
}


function onClick() {

    var select = document.getElementById("algorithm");
    var selected = select.options[select.selectedIndex].value;

    if (selected === "fcfs") {
        console.log("fcfs");
        FCFS();
    }
    else if (selected === "priorityNonPreemptive") {
        console.log("priorityNonPreemptive");
        priority();
    }
    else if (selected === "priorityPreemptive") {
        console.log("preemptivePriority");
        preemptivePriority();
    }

}

function findWaitingTime(priority, n, bt, wt, at) {

    if (priority == "") {

        var service_time = Array.from({ length: n }, (_, i) => 0);
        service_time[0] = at[0];
        wt[0] = 0;

        for (let i = 1; i < n; i++) {
            var wasted = 0;
            service_time[i] = service_time[i - 1] + bt[i - 1];
            wt[i] = service_time[i] - at[i];

            if (wt[i] < 0) {
                wasted = wt[i];
                wt[i] = 0;
            }
            service_time[i] = service_time[i] - wasted;
        }

    }
    else {
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n - 1; j++) {
                if (priority[j] > priority[j + 1]) {
                    var temp = priority[j];
                    priority[j] = priority[j + 1];
                    priority[j + 1] = temp;
                    temp = bt[j];
                    bt[j] = bt[j + 1];
                    bt[j + 1] = temp;
                    temp = at[j];
                    at[j] = at[j + 1];
                    at[j + 1] = temp;
                }
            }
        }
        var service_time = Array.from({ length: n }, (_, i) => 0);
        service_time[0] = at[0];
        wt[0] = 0;

        for (let i = 1; i < n; i++) {
            var wasted = 0;
            service_time[i] = service_time[i - 1] + bt[i - 1];
            wt[i] = service_time[i] - at[i];

            if (wt[i] < 0) {
                wasted = wt[i];
                wt[i] = 0;
            }
            service_time[i] = service_time[i] - wasted;
        }
    }

}

function findTurnAroundTime(priority, n, bt, wt, tat) {


    if (priority == "") {

        for (var i = 0; i < n; i++) {
            tat[i] = bt[i] + wt[i];
        }
    }
    else {
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n - 1; j++) {
                if (priority[j] > priority[j + 1]) {
                    var temp = priority[j];
                    priority[j] = priority[j + 1];
                    priority[j + 1] = temp;
                    temp = bt[j];
                    bt[j] = bt[j + 1];
                    bt[j + 1] = temp;
                    temp = at[j];
                    at[j] = at[j + 1];
                    at[j + 1] = temp;
                }
            }
        }

        for (var i = 0; i < n; i++) {
            tat[i] = bt[i] + wt[i];
        }
    }
}

function displayTable(processes, n, at, bt, priority) {


    var wt = Array.from({ length: n }, (_, i) => 0.0);
    var tat = Array.from({ length: n }, (_, i) => 0.0);

    findWaitingTime(priority, n, bt, wt, at);
    findTurnAroundTime(priority, n, bt, wt, tat);

    var total_wt = 0, total_tat = 0;
    var ft = [];

    for (var i = 0; i < n; i++) {
        total_wt = total_wt + wt[i];
        total_tat = total_tat + tat[i];
        ft[i] = tat[i] + wt[i];
    }


    document.getElementById("result").innerHTML = ` <div class="container mb-5">
      <div class="row">
        <div class="flex flex-col">
          <table class="table-auto text-white">
            <thead>
              <tr>
                <th>Processes</th>
                <th>Arrival Time</th>
                <th>Burst time</th>
                <th >Finish time</th>
                <th>Waiting time</th>
                <th>Turn around time</th>
              </tr>
            </thead>
            <tbody>
              ${processes.map((process, index) => {
        return `<tr>
                  <td>P${process}</td>
                  <td>${at[index]}</td>
                  <td>${bt[index]}</td>
                  <td>${ft[index]}</td>
                  <td>${wt[index]}</td>
                  <td>${tat[index]}</td>
                </tr>`;
    })}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;

    document.getElementById("avg_waiting_time").innerHTML = `Average waiting time = ${(
        total_wt / n
    ).toFixed(2)}`;

    document.getElementById("avg_turn_around_time").innerHTML = `Average turn around time = ${(
        total_tat / n
    ).toFixed(2)}`;

    displayGanttChart(processes, n, ft);

    console.log("Saurav Hathi, testing message");
}

function getVlaues() {
    var arrival = document.getElementById("arrival_time").value;
    var arrival_tim = arrival.split(" ");
    var burst = document.getElementById("burst_time").value;
    var burst_tim = burst.split(" ");
    var g_priority = document.getElementById("priorityn").value;


    if (arrival.length == 0 || burst.length == 0) {
        alert("Enter the arrival and burst time");
    }
    else {

        var arrival_time = [];
        var burst_time = [];
        var priority = [];

        var no_of_processes = arrival_tim.length;

        var processes = [];
        for (let i = 0; i < no_of_processes; i++) {
            processes[i] = i + 1;
        }

        for (let i = 0; i < no_of_processes; i++) {
            arrival_time[i] = parseInt(arrival_tim[i]);
        }

        for (let i = 0; i < no_of_processes; i++) {
            burst_time[i] = parseInt(burst_tim[i]);
        }


        if (g_priority == "") {
            priority[0] = parseInt(g_priority);
        }
        else {

            var priority = g_priority.split(" ");
            for (let i = 0; i < no_of_processes; i++) {
                priority[i] = parseInt(priority[i]);
            }
        }

        return [processes, no_of_processes, arrival_time, burst_time, priority];
    }
}

function displayGanttChart(processes, n, ft) {

    var gantttile = document.getElementById("gantttile");
    gantttile.innerHTML = `Gantt Chart`;
    var ganttchart = document.getElementById("gantt_chart");

    ft.unshift(0);

    var ul = document.createElement("ul");
    ul.setAttribute("class", "contents");
    var div = document.createElement("div");
    div.setAttribute("class", "flex flex-row");

    for (let i = 0; i < n; i++) {
        var li = document.createElement("li");
        li.setAttribute("class", "w-8 border-gantt");
        li.innerHTML = `P${processes[i]}`;
        ul.appendChild(li);
    }

    ganttchart.appendChild(div);

    div.appendChild(ul);

    var ul = document.createElement("ul");
    ul.setAttribute("class", "contents");
    var div = document.createElement("div");
    div.setAttribute("class", "flex flex-row");

    for (let i = 0; i <= n; i++) {
        var li = document.createElement("li");
        li.setAttribute("class", "w-8");
        li.innerHTML = `${ft[i]}`;
        ul.appendChild(li);
    }

    ganttchart.appendChild(div);
    div.appendChild(ul);
}


function FCFS() {

    var [processes, no_of_processes, arrival_time, burst_time, priority] = getVlaues();

    displayTable(processes, no_of_processes, arrival_time, burst_time, priority);
}


function priority() {
    var [processes, no_of_processes, arrival_time, burst_time, priority] = getVlaues();

    displayTable(processes, no_of_processes, arrival_time, burst_time, priority);

}

function preemptivePriority() {
    var [processes, no_of_processes, arrival_time, burst_time, priority] = getVlaues();

    displayTable(processes, no_of_processes, arrival_time, burst_time, priority);
}

