$(document).ready(function() {
//--------------  index.handlebars  ----------------------------------
    // Nav Bar drop down
    $(".dropdown-button").dropdown( { hover: false } );    

    // Dropdown selections for Request New Spot
    $('select').material_select();
    
//----------------  For Edit Modal  -----------------------------`

    $('.modal').modal();

//--------------  Request New Spot  -----------------------------------
    var destinationName = $("#destination_name");
    var destinationAddress = $("#destination_address");
    var destinationPhoneNumber = $("#destination_phoneNumber");
    var destinationImage = $("#destination_image");
    var destinationDescription = $("#destination_description");
    var destinationWebsite = $("#destination_website");
    var LocationsId;
    var modalEdit = $("#modalEdit");

    // Submit Edit Modal
    $(modalEdit).on("click", "#submitModalEdit", function(event) {
        event.preventDefault();

        destinationName = $("#destination_name");
        destinationAddress = $("#destination_address");
        destinationPhoneNumber = $("#destination_phoneNumber");
        destinationImage = $("#destination_image");
        destinationDescription = $("#destination_description");
        destinationWebsite = $("#destination_website");
        

        upDateRequest({

        })
    })

    // Submit Request New Spot
    $(document).on("click", "#submit", function(event) {
        event.preventDefault();
        // Wont submit the post if we are missing a desitnation name or address
        if (!destinationName.val().trim() || !destinationAddress.val().trim()) {
            
            // Change this to a modal
            alert("Please fill out all required areas");
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

        console.log("New Desitination: " + newDestination);
    });

    // Approve Button: Changes approved = true in database
    $(document).on("click", "#approve", function(event) {
        event.preventDefault();
        var id = $(this).data("id");
        // console.log("This is the ID: " + id);

        $.ajax({
            method: "PUT",
            url: "/api/requestnewspot/",
            data: { approved: true, id: id }
        })
        .then(function() {
            window.location.href = "/adminPage";
        });
    });

// +++++++++++ Is the the function that sends the newDestination to the db? +++++++++++
    function upsertDestination(newDestination) {
        $.post("/api/requestnewspot", newDestination)
        .then(getDestinations);
    };

    // Function for creating a new list row for new destinations
    function createDestinationRow(destinationData) {
        var newTr = $("<tr>");
        newTr.data("Destination", destinationData);
        newTr.append("<td>" + destinationData.destination + "</td>");
        newTr.append("<td> " + destinationData.address + "</td>");
        newTr.append("<td> " + destinationData.description + "</td>");
        newTr.append("<td> " + destinationData.image + "</td>");
        newTr.append("<td> " + destinationData.phoneNumber + "</td>");

        console.log("New Table Row: " + newTr);

        return newTr;
    };

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
    };

    function updatePost(location) {
        $.ajax({
            method: "PUT",
            url: "/api/requestnewspot/",
            data: location
        })
        .then(function() {
            window.location.href = "/adminPage?id=" + currentPost.id;
        });
    };
      
});


// $(document).on("click", ".resetButton",

