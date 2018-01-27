$(document).ready(function () {
    var locationsRef = firebase.database().ref("participants");
    var schoolList = []; 
    var schoolCheckList = [];
    var ctx = document.getElementById("chart-area").getContext("2d");
    //"#1CBB9C", "#2DCC70", "#3598DB", "#9B58B5", "#F2C311", "#E77E25", "#E74D3D", "#F39C11", "#96A4A5", "#354A5F",
    var myGraph = new Chart(ctx, {
        type: 'pie',
        data: {
            datasets: [{
                data: [],
                backgroundColor: []
            }],
            labels: [""]
        },
        options: {
            responsive: true
        }
    });
    locationsRef.orderByChild("lastName").on("value", function (snapshot) {
        //clear dataset and remake it
        var counts = {};
        myGraph.data.datasets[0].data.length = 0;
        schoolCheckList.length = 0;
        schoolList.length = 0;

        //snapshot.forEach is a firebase method
        snapshot.forEach(function (data) {
            schoolList.push(data.val().school)
            if (schoolCheckList.includes(data.val().school)) {
            }
            else {
                schoolCheckList.push(data.val().school)
            }
        });
        
        myGraph.data.datasets[0].data.length = 0;
        for (var i = 0; i < schoolList.length; i++) {
            counts[schoolList[i]] = 1 + (counts[schoolList[i]] || 0);
        }

        for (var i = 0; i < schoolCheckList.length; i++){
            myGraph.data.datasets[0].data[i] = counts[schoolCheckList[i]];
            myGraph.data.labels[i] = schoolCheckList[i];
            
        }
        myGraph.update();
    });

    
    
});