$(document).ready(function () {

    //real time refresh of page is overkill but cool.
    var locationsRef = firebase.database().ref("locations");

    // on -- value ... is real time
    locationsRef.orderByChild("text").on("value", function (snapshot) {
        //clear html list and remake it
        $("#locationList").html("");

        //snapshot.forEach is a firebase method
        snapshot.forEach(function (data) {
            console.log("The CHA " + data.key + " text is " + data.val().text);

            // Hold the entity key in the button id
            var listHTML = "<li class='list-group-item clearfix'>" +
                "<img src='https://chart.googleapis.com/chart?cht=qr&chl=" + data.key +"&chs=180x180&choe=UTF-8&chld=L|2' class='img-thumbnail'>" +
                "<br/><br/><span>Text: <strong>" + data.val().text + "</strong></span>" +
                "<br/><span>Hint: " + data.val().hint + "</span>" +
                "<br/><span>Points: " + data.val().points + "</span>" +
                "<span class='pull-right button-group'>" +
                "<button id='edit"+data.key+"' type='button' class='btn btn-success btn-sm'><span class='glyphicon glyphicon-edit'></span></button>" +
                "<button id='"+data.key+"' type='button' class='btn btn-danger btn-sm'><span class='glyphicon glyphicon-remove'></span></button>"+
                " </span>" +
                "</li>"
            $("#locationList").append(listHTML);

            //add event listener to delete button
            $("#" + data.key).click(function () {
                $("#deleteEntity").html(data.val().text);
                $("#deletePath").html("locations/" + data.key);
                //delete occurs after modal confirmation
                $("#deleteModal").modal('show');
            });
            $("#edit" + data.key).click(function () {
                $("#editUserLocation").val(data.val().text);
                $("#editUserLocationHint").val(data.val().hint);
                $("#editUserLocationPoints").val(data.val().points);
                $("#editPath").html("locations/" + data.key);
                //edit occurs after modal confirmation
                $("#editLocationModal").modal('show');
            });
        });
    });

    $("#newLocationBtn").click(function () {
        //edit occurs after modal confirmation
        $("#editUserLocation").val("");
        $("#editUserLocationHint").val("");
        $("#editUserLocationPoints").val("");
        $("#editPath").html("locations/");

        $("#editLocationModal").modal('show');

    });

 

});