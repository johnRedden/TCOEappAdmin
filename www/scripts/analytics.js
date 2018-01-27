$(document).ready(function () {
    var locationsRef = firebase.database().ref("participants");
    var schoolList = []; 
    var schoolCheckList = [];
    var ctx = document.getElementById("chart-area").getContext("2d");
    var DColorBank = {
        C1: ["#5EBCD2"],
        C2: ["#85CBCF", "#3984B6"],
        C3: ["#85CBCF", "#3984B6", "#1D2E81"],
        C4: ["#9ED5CD", "#44A7CB", "#2E62A1", "#192574"],
        C5: ["#B7DFCB", "#5ABAD1", "#3984B6", "#264992", "#161F63",],
        C6: ["#BEE0CC", "#70C3D0", "#419DC5", "#316BA7", "#223B89", "#151E2E",],
        C7: ["#C6E3CB", "#83CACF", "#47AED0", "#3984B6", "#2C5A9C", "#1E3082", "#141C59",],
    }
    var CKey = "";
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
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: "Schools Percentages"
            }
        }
    });
    function setKey() {
        CKey = "C" + myGraph.data.datasets[0].data.length;
        setColor();
    }
    function setColor() {
        myGraph.data.datasets[0].backgroundColor = DColorBank[CKey]
    }
    
    
    locationsRef.orderByChild("lastName").on("value", function (snapshot) {
        //clear dataset and remake it
        var counts = {};
        myGraph.data.datasets[0].data.length = 0;
        myGraph.data.labels.length = 0;
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
        setKey();
        myGraph.update();
        console.log(CKey)
    });

});