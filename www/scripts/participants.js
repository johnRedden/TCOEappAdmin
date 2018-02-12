$(document).ready(function () {

    //real time refresh of page is overkill but cool.
    var locationsRef = firebase.database().ref("participants");
    // on -- value ... is real time
    locationsRef.orderByChild("lastName").on("value", function (snapshot) {
        //clear html list and remake it
        $("#participantList").html("");

        //snapshot.forEach is a firebase method
        snapshot.forEach(function (data) {

            var listHTML = "<li class='list-group-item clearfix'>" +
                "<img src='https://chart.googleapis.com/chart?cht=qr&chl=" + data.key + "&chs=180x180&choe=UTF-8&chld=L|2' class='img-thumbnail'>" +
                "<br/><br/><strong><span>" + data.val().lastName + "</span>" +
                "<span>, " + data.val().firstName + "</span></strong>" +
                "<br/><span>RegNum: " + data.val().registrationNumber + "</span>" +
                "<span> -- score: " + data.val().score + "</span>" +
                "<br/><span>School: " + data.val().school + "</span>" +
                "<span class='pull-right button-group'>" +
                "<button id='edit" + data.key + "' type='button' class='btn btn-success btn-sm'><span class='glyphicon glyphicon-edit'></span></button>" +
                "<button id='" + data.key + "' type='button' class='btn btn-danger btn-sm'><span class='glyphicon glyphicon-remove'></span></button>" +
                "</span>" +
                "</li>"
            $("#participantList").append(listHTML);

            //add event listener to delete button
            $("#" + data.key).click(function () {
                $("#deleteEntity").html(data.val().lastName+", "+data.val().firstName);
                $("#deletePath").html("participants/" + data.key);
                //delete occurs after modal confirmation
                $("#deleteModal").modal('show');
            });
            // edit event listener
            $("#edit" + data.key).click(function () {
                $("#editUserParticipantFirstName").val(data.val().firstName);
                $("#editUserParticipantLastName").val(data.val().lastName);
                $("#editUserParticipantRegistrationNumber").val(data.val().registrationNumber);
                $("#editUserParticipantSchool").val(data.val().school);
                $("#editUserParticipantScore").val(data.val().score);
                $("#editParticipantPath").html("participants/" + data.key);
                //edit occurs after modal confirmation
                $("#editParticipantModal").modal('show');
            });
        });
    });

    $("#newParticipantBtn").click(function () {
        // TODO: generate a unique reg. number
        var rndNum = Math.floor((Math.random() * 10000) + 10000);
        //edit occurs after modal confirmation
        $("#editUserParticipantFirstName").val("");
        $("#editUserParticipantLastName").val("");
        $("#editUserParticipantRegistrationNumber").val(rndNum);
        $("#editUserParticipantSchool").val("");
        $("#editUserParticipantScore").val("");
        $("#editParticipantPath").html("participants/");

        $("#editParticipantModal").modal('show');

    });



});