//Globals here

// Initialize Firebase  TODO: hide this somehow?
var config = {
    apiKey: "AIzaSyBu0_y7pEs9dAC-1j1CB7Lq_I7HlHjfvnM",
    authDomain: "tcoeapp.firebaseapp.com",
    databaseURL: "https://tcoeapp.firebaseio.com",
    projectId: "tcoeapp",
    storageBucket: "",
    messagingSenderId: "405307790686"
};
firebase.initializeApp(config);
//sign-in functionality
var provider = new firebase.auth.GoogleAuthProvider();
var curUser; 

// log out when window is closed
$(window).on("beforeunload", function () {
    firebase.auth().signOut();
})


$(document).ready(function () {

    // auth listener  (note: fires once document ready)
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            console.log(user.email)
            $("#sign-in").html("Sign-Out");
            curUser = user;
            $("#appLoggedIn").show();
            $("#appLoggedOut").hide();
        } else {
            // User is signed out.
            $("#sign-in").html("Sign-In");
            curUser = null;
            $("#appLoggedIn").hide();
            $("#appLoggedOut").show();
        }
    });

    //sign-in and out work *******************************************
    $("#sign-in").click(function () {
        if (curUser) {
            // User wants to sign out
            firebase.auth().signOut();

        } else {
            // No user is signed in.
            $("#signInModal").modal('show');
            $('#signInModal').on('shown.bs.modal', function () {
                $("#signInEmail").focus();
            })
            
        }
        
    });

    $("#signInBtn").click(function () {
        var email = $("#signInEmail").val();
        var password = $("#signInPassword").val();
        var spinnerHtml = "<i class='fa fa-spinner fa-spin'></i>";
        $("#sign-in").html(spinnerHtml +" Loading");
        firebase.auth().signInWithEmailAndPassword(email, password).then(function (result) {

            //console.log(result)

        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
            // ...
        });
    });

    //sign-in and out work *******************************************

    //Toggle functionality
    $("#mainMessageShowHideBtn").click(function () {
        $("#mainMessagePanel").toggle();
        $("#userMessage").focus();
    })
    $("#locationsShowHideBtn").click(function () {
        $("#locationPanel").toggle();
        $("#userLocation").focus();
    })
    $("#eventsShowHideBtn").click(function () {
        $("#eventsPanel").toggle();
        $("#userEvent").focus();
    })
    $("#participantsShowHideBtn").click(function () {
        $("#participantsPanel").toggle();
        $("#userPartFirstName").focus();
    })

    //delete modal
    $("#deleteBtnYes").click(function () {
        var path = $("#deletePath").html();
        deleteLocation(path);
        $("#deleteModal").modal('hide');
        
    });
    function deleteLocation(databasePath) {

        // get reference to the entity based on it's key which was saved in the button id
        var ref = firebase.database().ref(databasePath);
        ref.remove()
            .then(function () {
                console.log("Remove succeeded.")
            })
            .catch(function (error) {
                console.log("Remove failed: " + error.message)
            });

    };
    //edit functionality separated
    $("#editLocationBtnYes").click(function () {

        var obj = {
            text: $("#editUserLocation").val(),
            hint: $("#editUserLocationHint").val(),
            points: $("#editUserLocationPoints").val()
        }
        var path = $("#editPath").html();
        //editLocation(obj, path);
        // get reference to the entity based on it's key which was saved in the button id
        var ref = firebase.database().ref(path);
        if (path === "locations/")
            ref.push(obj);
        else
            ref.set(obj);

        $("#editUserLocation").val("");
        $("#editUserLocationHint").val("");
        $("#editUserLocationPoints").val("");
        $("#editPath").html("");
        $("#editLocationModal").modal('hide');
    });

    $("#editEventBtnYes").click(function () {

        var obj = {
            text: $("#editUserEvent").val(),
            description: $("#editUserEventDesc").val(),
            startTime: $("#editUserEventStartTime").val(),
            endTime: $("#editUserEventEndTime").val()
        }
        var path = $("#editEventPath").html();
        // get reference to the entity based on it's key which was saved in the button id
        var ref = firebase.database().ref(path);
        if (path === "events/")
            ref.push(obj);
        else
            ref.set(obj);

        $("#editUserEvent").val("");
        $("#editUserEventDesc").val("");
        $("#editUserEventStartTime").val("");
        $("#editUserEventEndTime").val("");
        $("#editEventPath").html("");
        $("#editEventModal").modal('hide');
    });

    $("#editParticipantBtnYes").click(function () {
        //console.log("p yes")
        var obj = {
            firstName: $("#editUserParticipantFirstName").val(),
            lastName: $("#editUserParticipantLastName").val(),
            registrationNumber: Number($("#editUserParticipantRegistrationNumber").val()),
            school: $("#editUserParticipantSchool").val(),
            score: $("#editUserParticipantScore").val()
        }
        var path = $("#editParticipantPath").html();
        // get reference to the entity based on it's key which was saved in the button id
        var ref = firebase.database().ref(path);
        if (path === "participants/") {
            //add a new participant
            ref.push(obj);
        } else {
            //edit participant information
            ref.update(obj);
        }
            

        $("#editUserParticipantFirstName").val("");
        $("#editUserParticipantLastName").val("");
        $("#editUserParticipantRegistrationNumber").val("");
        $("#editUserParticipantSchool").val("");
        $("#editUserParticipantScore").val("");
        $("#editParticipantPath").html("");
        $("#editParticipantModal").modal('hide');




    });

 


});