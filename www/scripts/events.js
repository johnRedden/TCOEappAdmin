$(document).ready(function () {

    //real time refresh of page is overkill but cool.
    var locationsRef = firebase.database().ref("events");
    // on -- value ... is real time
    locationsRef.orderByChild("startTime").on("value", function (snapshot) {
        //clear html list and remake it
        $("#eventList").html("");

        //snapshot.forEach is a firebase method
        snapshot.forEach(function (data) {
            //console.log("The " + data.key + " text is " + data.val().text);

            var listHTML = "<li class='list-group-item clearfix'>" +
                "<strong><span>" + data.val().text + "</span></strong>" +
                "<br/><span>" + data.val().description + "</span>" +
                "<br/><span>" + formatAMPM(data.val().startTime) + " to "+ formatAMPM(data.val().endTime) +"</span>" +
                "<span class='pull-right button-group'>" +
                "<button id='edit" + data.key + "' type='button' class='btn btn-success btn-sm'><span class='glyphicon glyphicon-edit'></span></button>" +
                "<button id='" + data.key + "' type='button' class='btn btn-danger btn-sm'><span class='glyphicon glyphicon-remove'></span></button>" +
                "</span>" +
                "</li>"
            $("#eventList").append(listHTML);

            //add event listener to delete button
            $("#" + data.key).click(function () {
                $("#deleteEntity").html(data.val().text);
                $("#deletePath").html("events/" + data.key);
                //delete occurs after modal confirmation
                $("#deleteModal").modal('show');

            });
            //add event listener for edit button
            $("#edit" + data.key).click(function () {
                $("#editUserEvent").val(data.val().text);
                $("#editUserEventDesc").val(data.val().description);
                $("#editUserEventStartTime").val(data.val().startTime);
                $("#editUserEventEndTime").val(data.val().endTime);
                $("#editEventPath").html("events/" + data.key);
                //edit occurs after modal confirmation
                $("#editEventModal").modal('show');
            });
        });
    });

    $("#newEventBtn").click(function () {
        //edit occurs after modal confirmation
        $("#editUserEvent").val("");
        $("#editUserEventDesc").val("");
        $("#editUserEventStartTime").val("");
        $("#editUserEventEndTime").val("");
        $("#editEventPath").html("events/");

        $("#editEventModal").modal('show');

    });

    function formatAMPM(arg) {
        var hours = parseInt(arg.substring(0, 2));
        var minutes = parseInt(arg.substring(3, 5));
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }
  


});