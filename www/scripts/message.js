$(document).ready(function () {

    var messageRef = null;
    var surveyValue;

    messageRef = firebase.database().ref("mainMessage");

    messageRef.on("value", function (snapshot) {
        //console.log(snapshot.val());
        $("#curMessage").html(snapshot.val().message);
        $("#curSurveyURL").html(snapshot.val().surveyURL);

        if (snapshot.val().surveyView == "on") {
            surveyValue = "on";
            $('#myonoffswitch').prop('checked', true);
        } else if (snapshot.val().surveyView == "off") {
            surveyValue = "off";
            $('#myonoffswitch').prop('checked', false);
        }

        $("#surveyLoading").hide();

    });

    $('#myonoffswitch').change(function () {
        if ($(this).is("#myonoffswitch")) {
            var returnVal = confirm("Are you sure?");
            if (returnVal == true) {
                if ($(this).is(':checked')) {
                    messageRef.update({ "surveyView": "on" });
                } else {
                    messageRef.update({ "surveyView": "off" });
                }

            } else {
                if (surveyValue == "on") {
                    $('#myonoffswitch').prop('checked', true);
                } else if (surveyValue == "off") {
                    $('#myonoffswitch').prop('checked', false);
                }
            }

        }
    });

    $("#newMessageBtn").click(function () {
        console.log("click")
        var newMessage = $("#userMessage").val();
        messageRef.update({ "message": newMessage });
        $("#userMessage").val("");
    });

    $("#newSurveyURLBtn").click(function () {
        var newURL = $("#userSurveyURL").val();
        messageRef.update({ "surveyURL": newURL });
        $("#userSurveyURL").val("");
    });











});