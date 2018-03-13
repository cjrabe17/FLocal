$(document).ready(function() {
//--------------  index.handlebars  ----------------------------------
    // Nav Bar drop down
    $(".dropdown-button").dropdown( { hover: false } );    

    // Dropdown selections for Request New Spot
    $('select').material_select();

//--------------  Request New Spot  -----------------------------------
    var destinationName = $("#destination_name");
    var destinationAddress = $("#destination_address");
    var destinationPhoneNumber = $("#destination_phoneNumber");
    var destinationImage = $("#destination_image");
    var destinationDescription = $("#destination_description");
    var destinationWebsite = $("#destination_website");
    var LocationsId;

    $(document).on("click", "#submit", function(event) {
        event.preventDefault();
        // Wont submit the post if we are missing a body, title, or author
        if (!destinationName.val().trim() || !destinationAddress.val().trim()) {
            // Have a model pop up to tell the user to fill out the missing pieces
            return;
        }
        // Constructing a newLocation object to hand to the database
        upsertDestination ({
            destination: destinationName.val().trim(),
            address: destinationAddress.val().trim(),
            description: destinationDescription.val().trim(),
            // website: destinationWebsite.val().trim(),
            image: destinationImage.val().trim(),
            phoneNumber: destinationPhoneNumber.val().trim()
        });

        console.log(newDestination);
        console.log("Listener Works!");
    });

    function upsertDestination(newDestination) {
        $.post("/api/requestnewspot", newDestination)
          .then(getDestinations);
      }
    // Function for creating a new list row for new destinations
    function createDestinationRow(destinationData) {
        var newTr = $("<tr>");
        newTr.data("Destination", destinationData);
        newTr.append("<td>" + destinationData.destination + "</td>");
        newTr.append("<td> " + destinationData.address + "</td>");
        newTr.append("<td> " + destinationData.description + "</td>");
        newTr.append("<td> " + destinationData.image + "</td>");
        newTr.append("<td> " + destinationData.phoneNumber + "</td>");
        return newTr;
    }
    // Function for retrieving destinations and getting them ready to be rendered to the page
    function getDestinations() {
        $.get("/api/requestnewspot", function(data) {
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
            rowsToAdd.push(createDestinationRow(data[i]));
        }
        renderAuthorList(rowsToAdd);
        nameInput.val("");
        });
    }
});

// $(document).on("click", ".resetButton",

