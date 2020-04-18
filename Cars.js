var Cars = null;
//global variable for holding UID.
var editID = null;

//global variable for fetch url
var BASEURL = "https://my-carlot-app.herokuapp.com";

//Add new car div
//var newCarDiv = document.querySelector("#Cars");
//newCarDiv.style.display = "none";

//User Creation form
//--------------------------------------------------------------------------------
//variable for sign up button
var SignUpForm = document.querySelector("#signUpHidden")

//variable for sign in button
var SignInForm = document.querySelector("#signInHidden")

//variable for sign up button submit
var signUpSubmit = document.querySelector("#signup")
    //console.log("This is sign up submit:", signUpSubmit)

//variable for sign in button submit
var signInSubmit = document.querySelector("#signin")
    //console.log("This is sign in submit:", signInSubmit)

//make buttons pop up the hidden menus

//sign in form
//variable for sign up div
var SignUpDiv = document.querySelector("#sign-up")
var firstNameInput = document.querySelector("#first-name")
var lastNameInput = document.querySelector("#last-name")
var emailInput = document.querySelector("#email")
var passwordInput = document.querySelector("#sign-up-pass")
var outputSignUp = document.querySelector("#outputSignUp")

//sign up form
//variable for sign in div
var SignInDiv = document.querySelector("#sign-in")
var usernameInput = document.querySelector("#username")
var userPassInput = document.querySelector("#sign-in-pass")
var outputSignIn = document.querySelector("#outputSignIn")

//Sign up Code
SignUpForm.onclick = function SignUpForm() {

    SignUpDiv.style.display = "grid";

    SignInDiv.style.display = "none";
}

signUpSubmit.onclick = function() {

    var firstNameVal = firstNameInput.value;
    //console.log("You entered:", firstNameVal);

    var lastNameVal = lastNameInput.value;
    //console.log("You entered:", lastNameVal);

    var emailVal = emailInput.value;
    //console.log("You entered:", emailVal);

    var passwordVal = passwordInput.value;

    var data = "firstname=" + encodeURIComponent(firstNameVal);
    data += "&lastname=" + encodeURIComponent(lastNameVal);
    data += "&email=" + encodeURIComponent(emailVal);
    data += "&password=" + encodeURIComponent(passwordVal);

    fetch(BASEURL + "/users", {
        method: "POST",
        credentials: "include",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response) {
        if (response.status == 201){
            SignUpDiv.style.display = "none";
            SignInDiv.style.display = "none";
            SignUpForm.style.display = "grid";
            loadCars();
        } else if (response.status == 422) {
            SignUpDiv.style.display = "grid";
            SignInDiv.style.display = "none";
            outputSignUp.innerHTML = "Email is already registered!";
        }
    });
}

SignInForm.onclick = function SignInForm() {

    SignInDiv.style.display = "grid";

    SignUpDiv.style.display = "none";
}

signInSubmit.onclick = function() {

    var usernameVal = usernameInput.value;
    //console.log("You entered:", usernameVal);

    var userPassVal = userPassInput.value;
    //console.log("You entered:", userPassVal)

    var data = "username=" + encodeURIComponent(usernameVal);
    data += "&password=" + encodeURIComponent(userPassVal);

    fetch(BASEURL + "/sessions", {
        method: "POST",
        credentials: "include",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response) {
        if (response.status == 201) {
            SignUpDiv.style.display = "none";
            SignInDiv.style.display = "none";
            SignInForm.style.display = "grid";
            loadCars();
        }else if (response.status == 401) {
            SignInDiv.style.display = "grid";
            SignUpDiv.style.display = "none";
            outputSignIn.innerHTML = "Username or Password Incorrect";
        }
    });
}

//--------------------------------------------------------------------------------

//variable for new car form
var newCarForm = document.getElementById("Cars");

//creates the edit form behind the adding form.
//--------------------------------------------------------
//variable for update car form
var hiddenForm = document.querySelector("#hidden-form");
//variable for update make
var updateMakeInput = document.querySelector("#update-make");
//variable for update model
var updateModelInput = document.querySelector("#update-model");
//variable for update year
var updateYearInput = document.querySelector("#update-year");
//variable for update mileage
var updateMileageInput = document.querySelector("#update-mileage");
//variable for update price
var updatePriceInput = document.querySelector("#update-price");
//variable for update button
var updateCarButton = document.querySelector("#updateCarInfo");
//--------------------------------------------------------

function deleteCarInfoOnServer(carID) {
    fetch(BASEURL + "/cars/" + carID, {
        method: "DELETE",
        credentials: "include"
    }).then(function(response) {

        loadCars();

    });
}

updateCarButton.onclick = function() {

    //Car make update input
    var carMakeUpdate = updateMakeInput.value;
    //console.log("You Entered:", carMakeUpdate);

    //Car model update input
    var carModelUpdate = updateModelInput.value;
    //console.log("You Entered:", carModelUpdate);

    //car year update input
    var carYearUpdate = updateYearInput.value;
    //console.log("You Entered:", carYearUpdate);

    //car mileage update input
    var carMileageUpdate = updateMileageInput.value;
    //console.log("You Entered:", carMileageUpdate);

    //car price update input
    var carPriceUpdate = updatePriceInput.value;
    //console.log("You Entered:", carPriceUpdate);

    var data = "make=" + encodeURIComponent(carMakeUpdate);
    data += "&model=" + encodeURIComponent(carModelUpdate);
    data += "&year=" + encodeURIComponent(carYearUpdate);
    data += "&mileage=" + encodeURIComponent(carMileageUpdate);
    data += "&price=" + encodeURIComponent(carPriceUpdate);

    updateMakeInput.value = "";
    updateModelInput.value = "";
    updateYearInput.value = "";
    updateMileageInput.value = "";
    updatePriceInput.value = "";

    fetch(BASEURL + "/cars/" + editID, {
        method: "PUT",
        credentials: "include",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response) {

        loadCars();
        newCarForm.style.display = "grid";
        hiddenForm.style.display = "none";
        editID = null;

    });
}

var newCarButton = document.querySelector("#sendCarInfo");
//console.log("The button", newCarButton);

newCarButton.onclick = function() {

    //Car Make Input
    var carMakeInput = document.querySelector("#new-make");
    var carMake = carMakeInput.value;
    //console.log("You Entered:", carMake);

    //Car Model Input
    var carModelInput = document.querySelector("#new-model")
    var carModel = carModelInput.value;
    //console.log("You Entered:", carModel);

    //Car year Input
    var carYearInput = document.querySelector("#new-year")
    var carYear = carYearInput.value;
    //console.log("You Entered:", carYear);

    //Car mileage Input
    var carMileageInput = document.querySelector("#new-mileage")
    var carMileage = carMileageInput.value;
    //console.log("You Entered:", carMileage);

    //Car price Input
    var carPriceInput = document.querySelector("#new-price")
    var carPrice = carPriceInput.value;
    //console.log("You Entered:", carPrice);

    //collects all input data into encoded information
    var data = "make=" + encodeURIComponent(carMake);
    data += "&model=" + encodeURIComponent(carModel);
    data += "&year=" + encodeURIComponent(carYear);
    data += "&mileage=" + encodeURIComponent(carMileage);
    data += "&price=" + encodeURIComponent(carPrice);

    //sets all input fields to nothing
    carMakeInput.value = "";
    carModelInput.value = "";
    carYearInput.value = "";
    carMileageInput.value = "";
    carPriceInput.value = "";

    fetch(BASEURL + "/cars", {
        method: "POST",
        credentials: "include",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response) {

        loadCars();

    });
};

function loadCars() {
    fetch(BASEURL + "/cars", {
        credentials: "include"
    }).then(function(response) {
        if (response.status == 200) {
            response.json().then(function(carsFromServer) {

                //displays the new car form
                newCarForm.style.display = "grid";

                //empties list of car info at each function call.
                var carsList = document.querySelector("#list-Cars");
                carsList.innerHTML = "";
    
                carsFromServer.forEach(function(carInfo) {
    
                    //console.log("Car Info:", carInfo);
    
                    //creates list container for one car
                    var listCar = document.createElement("li");
    
                    //no styling for lists
                    var noStyleCar = document.createAttribute("class");
                    noStyleCar.value = "NoStyleCars";
    
                    //creates make container for one car
                    var makeEl = document.createElement("div");
                    makeEl.innerHTML = carInfo.make;
                    makeEl.classList.add("make");
                    listCar.appendChild(makeEl);
    
                    //creates model container for one car
                    var modelEl = document.createElement("div");
                    modelEl.innerHTML = carInfo.model;
                    modelEl.classList.add("model");
                    listCar.appendChild(modelEl);
    
                    //creates year container for one car
                    var yearEl = document.createElement("div");
                    yearEl.innerHTML = carInfo.year;
                    yearEl.classList.add("year");
                    listCar.appendChild(yearEl);
    
                    //creates mileage container for one car
                    var mileageEl = document.createElement("div");
                    mileageEl.innerHTML = carInfo.mileage;
                    mileageEl.classList.add("mileage");
                    listCar.appendChild(mileageEl);
    
                    //creates price container for one car
                    var priceEl = document.createElement("div");
                    priceEl.innerHTML = carInfo.price;
                    priceEl.classList.add("price");
                    listCar.appendChild(priceEl);
    
                    //creates the edit button
                    var editButton = document.createElement("button");
                    editButton.innerHTML = "Edit";
                    editButton.classList.add("editCar");
                    editButton.onclick = function() {
                        //console.log("You are editing:", carInfo);
                        if (confirm("Are you sure you want to update " + carInfo.make + " " + carInfo.model + "?")) {
                            newCarForm.style.display = "none";
                            hiddenForm.style.display = "grid";
                            updateMakeInput.value = carInfo.make;
                            updateModelInput.value = carInfo.model;
                            updateYearInput.value = carInfo.year;
                            updateMileageInput.value = carInfo.mileage;
                            updatePriceInput.value = carInfo.price;
                            editID = carInfo.id;
                        }
                    };
                    listCar.appendChild(editButton);
    
                    //creates the delete button
                    var deleteButton = document.createElement("button");
                    deleteButton.innerHTML = "Delete";
                    deleteButton.classList.add("deleteCar");
                    deleteButton.onclick = function() {
                        //console.log("you clicked me.", carInfo);
                        if (confirm("Are you sure you want to delete " + carInfo.make + " " + carInfo.model + "?")) {
                            console.log("Going through:", carInfo.id)
                            deleteCarInfoOnServer(carInfo.id);
                        }
                    };
                    listCar.appendChild(deleteButton);
    
                    listCar.classList.add("StyleCars")
                    carsList.appendChild(listCar);
                })
            })
        } else if (response.status == 422){
            newCarForm.style.display = "none";
            SignUpDiv.style.display = "grid";
        } else if (response.status == 401) {
            newCarForm.style.display = "none";
            SignInDiv.style.display = "grid";
            SignUpDiv.style.display = "none";
        }
    })
}

loadCars();