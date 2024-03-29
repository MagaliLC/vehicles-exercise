"use strict";
var car;
function createCar() {
    var plate = document.getElementById("plate").value;
    var brand = document.getElementById("brand").value;
    var color = document.getElementById("color").value;
    var counter = 0;
    event.preventDefault();
    if (!plateCheck(plate)) {
        counter++;
    }
    if (!checkEmpty(brand, "brand", "brandCheck")) {
        counter++;
    }
    if (!checkEmpty(color, "color", "colorCheck")) {
        counter++;
    }
    if (counter == 0) {
        car = new Car(plate, color, brand);
        showWheelForm();
        return true;
    }
    else {
        return false;
    }
}
function plateCheck(plate) {
    var plateRegex = /^\s*(?:\d{4}[A-Za-z]{3})s*$/;
    if (plateRegex.test(plate)) {
        document.getElementById("plate").className = "form-control is-valid";
        return true;
    }
    else {
        document.getElementById("plate").className = "form-control is-invalid";
        document.getElementById("checkPlate").className = "invalid-feedback";
        document.getElementById("checkPlate").innerHTML = "Plate must be 4 numbers and 3 letters";
        return false;
    }
}
function checkEmpty(value, field, div) {
    if (value != "") {
        document.getElementById(field).className = "form-control is-valid";
        return true;
    }
    else {
        document.getElementById(field).className = "form-control is-invalid";
        document.getElementById(div).className = "invalid-feedback";
        document.getElementById(div).innerHTML = "This field can't be empty";
        return false;
    }
}
function showWheelForm() {
    document.getElementById("wheelForm").classList.remove("d-none");
}
function addWheels() {
    event.preventDefault();
    var counter = 0;
    for (var i = 0; i < 4; i++) {
        var diameter = document.getElementById("wheelDiameter" + i).value;
        var brand = document.getElementById("wheelBrand" + i).value;
        var input = document.getElementById("wheelDiameter" + i).value;
        if (checkDiameter(input, "wheelDiameter" + i, "checkDiameter" + i)) {
            car.addWheel(new Wheel(Number(diameter), brand));
            counter = 0;
        }
        else {
            counter++;
        }
    }
    if (counter == 0) {
        showCarInfo();
        showWheelInfo();
    }
}
function checkDiameter(input, field, checkField) {
    if (Number(input) >= 0.4 && Number(input) <= 2) {
        document.getElementById(field).className = "form-control is-valid";
        return true;
    }
    else {
        document.getElementById(field).className = "form-control is-invalid";
        document.getElementById(checkField).className = "invalid-feedback";
        document.getElementById(checkField).innerHTML = "Diameter must be between 0.4 and 2";
        return false;
    }
}
function showWheelInfo() {
    for (var i = 0; i < 4; i++) {
        document.getElementById("wheelDiameterInfo" + i).innerHTML = car.wheels[i].diameter.toString();
        document.getElementById("wheelBrandInfo" + i).innerHTML = car.wheels[i].brand;
    }
}
function showCarInfo() {
    document.getElementById("carInfo").classList.remove("d-none");
    document.getElementById("plateInfo").innerHTML = "Plate: " + car.plate;
    document.getElementById("brandInfo").innerHTML = "Brand: " + car.brand;
    document.getElementById("colorInfo").innerHTML = "Color: " + car.color;
}
function wheelInfo(i, diameter, brand) {
    document.getElementById("wheelDiameterInfo" + i).innerHTML = diameter;
    document.getElementById("wheelBrandInfo" + i).innerHTML = brand;
}
