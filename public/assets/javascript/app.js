$( document ).ready(function() {
    var destinationName = $("#destination_name");
    var destinationAddress = $("#destination_address");
    var destinationPhoneNumber = $("#destination_phoneNumber");
    var destinationImage = $("#destination_image");
    var destinationDescription = $("destination_description");
    var destinationWebsite = $("destination_website")
    var LocationsId;
    // Nav Bar drop down
    $(".dropdown-button").dropdown( { hover: false } );

    function handleFormSubmit(event) {
        event.preventDefault();
        // Wont submit the post if we are missing a body, title, or author
        if (!destinationName.val().trim() || !destinationAddress.val().trim()) {
        return;
        }
        // Constructing a newLocation object to hand to the database
        var newDestination = {
        destination: destinationName.val().trim(),
        address: destinationAddress.val().trim(),
        description: destinationDescription.val().trim(),
        website: destinationWebsite.val().trim(),
        image: destinationImage.val().trim(),
        phoneNumber: destinationPhoneNumber.val().trim()
        };
    }
})

