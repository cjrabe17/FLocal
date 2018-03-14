$(document).ready(function() {

//--------------  Request New Spot  -----------------------------------
    var destinationName = $("#destination_name");
    var destinationAddress = $("#destination_address");
    var destinationPhoneNumber = $("#destination_phoneNumber");
    var destinationImage = $("#destination_image");
    var destinationDescription = $("#destination_description");
    var destinationWebsite = $("#destination_website");
    var LocationsId;
    $(document).on("click", "#delete", handleLocationDelete);
    $(document).on("click", "#approve", handleLocationUpdate);
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
            website: destinationWebsite.val().trim(),
            image: destinationImage.val().trim(),
            phoneNumber: destinationPhoneNumber.val().trim(),
            category: $("#destination_category option:checked").val()
        });
        location.reload();
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
        newTr.append("<td> " + destinationData.website + "</td>");
        newTr.append("<td> " + destinationData.category + "</td>");
        return newTr;
    }
    // Function for retrieving destinations and getting them ready to be rendered to the page
    function getDestinations() {
        $.get("/api/requestnewspot", function(data) {
        var rowsToAdd = [];
            for (var i = 0; i < data.length; i++) {
                rowsToAdd.push(createDestinationRow(data[i]));
            }
        });
    }
    function handleLocationDelete(event) {
        event.preventDefault();
        var id = $(this).data("id");
        console.log("test");
        $.ajax({
          method: "DELETE",
          url: "/api/requestnewspot/" + id
        })
          .then(function() {
            window.location.href = "/adminPage";
          });
      }
      function handleLocationUpdate() {
        event.preventDefault();
        var id = $(this).data("id");
        console.log("This is the ID: " + id);
        $.ajax({
            method: "PUT",
            url: "/api/requestnewspot/",
            data: { approved: true, id: id }
          })
            .then(function() {
              window.location.href = "/adminPage";
            });
    };
});


