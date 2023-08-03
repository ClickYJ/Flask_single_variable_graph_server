let data;
let CO2_OFFICE = [];
let CO2_AGORA = [];
let CO2_FABLAB = [];
let id = [];

document.addEventListener("DOMContentLoaded", function() {

    refreshData();
    setInterval(refreshData, 5000);


    function refreshData() {
        let xhr = new XMLHttpRequest();
        xhr.responseType="json";

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                CO2_OFFICE = [];
                id = [];
                data = xhr.response;
                for (let pm = 0; pm <= 19; pm++){
                    CO2_OFFICE.push(data[pm]);
                    id.push(20-pm);
                }
            }

            var ctx = document.getElementById("myChart").getContext("2d");
        var myChart = new Chart(ctx, {

          type: 'line',

                // Données du graphique
                data: {
                  labels: id,
                  datasets: [
                    {
                      label: "Carbon monoxyde concentration [ppm]",
                      backgroundColor: 'rgb(255, 99, 132)',
                      borderColor: 'rgb(255, 99, 132)',
                      data: CO2_OFFICE,
                      fill: false
                    }
                  ],
                },

        // Options du graphique
        options: {
          animation: {
            duration: 0
          }
        },

            });

            
        };
        xhr.open("GET", "http://127.0.0.1:5000/Data", true);
        xhr.send();
    }
});


// run command : flask --app main.py run