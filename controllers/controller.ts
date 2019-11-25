var car: Car;

function createCar() {
    var plate: string = (<HTMLInputElement>document.getElementById("plate")).value;
    var brand: string = (<HTMLInputElement>document.getElementById("brand")).value;
    var color: string = (<HTMLInputElement>document.getElementById("color")).value;
    let counter: number = 0;

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
    } else {
        return false;
    }
}

function plateCheck(plate: string) {
    let plateRegex = /^\s*(?:\d{4}[A-Za-z]{3})s*$/;
    if (plateRegex.test(plate)) {
        (<HTMLInputElement>document.getElementById("plate")).className = "form-control is-valid";
        return true;
    } else {
        (<HTMLInputElement>document.getElementById("plate")).className = "form-control is-invalid";
        (<HTMLInputElement>document.getElementById("checkPlate")).className = "invalid-feedback";
        (<HTMLInputElement>document.getElementById("checkPlate")).innerHTML = "Plate must be 4 numbers and 3 letters";
        return false;
    }
}
function checkEmpty(value: string, field: string, div: string) {
    if (value != "") {
        (<HTMLInputElement>document.getElementById(field)).className = "form-control is-valid";
        return true;
    } else {
        (<HTMLInputElement>document.getElementById(field)).className = "form-control is-invalid";
        (<HTMLInputElement>document.getElementById(div)).className = "invalid-feedback";
        (<HTMLInputElement>document.getElementById(div)).innerHTML = "This field can't be empty";
        return false;
    }
}


function showWheelForm() {
    (<HTMLInputElement>document.getElementById("wheelForm")).classList.remove("d-none");
}

function addWheels() {
    event.preventDefault();
    for (let i = 1; i <= 4; i++) {
        let diameter = (<HTMLInputElement>document.getElementById("wheelDiameter" + i)).value;
        let brand = (<HTMLInputElement>document.getElementById("wheelBrand" + i)).value;
        if (Number(diameter) > 0.4 && Number(diameter) < 2) {
            car.addWheel(new Wheel(Number(diameter), brand));
            (<HTMLInputElement>document.getElementById("wheelDiameterInfo" + i)).innerHTML = diameter;
            (<HTMLInputElement>document.getElementById("wheelDiameter" + i)).className = "form-control is-valid";
            (<HTMLInputElement>document.getElementById("wheelBrandInfo" + i)).innerHTML = brand;
        } else {
            (<HTMLInputElement>document.getElementById("wheelDiameter" + i)).className = "form-control is-invalid";
            (<HTMLInputElement>document.getElementById("checkDiameter" + i)).className = "invalid-feedback";
            (<HTMLInputElement>document.getElementById("checkDiameter" + i)).innerHTML = "Diameter must be between 0.4 and 2";
        }
    }
    showCarInfo();
}

function showCarInfo() {
    (<HTMLInputElement>document.getElementById("carInfo")).classList.remove("d-none");
    (<HTMLInputElement>document.getElementById("plateInfo")).innerHTML = `Plate: ${car.plate}`;
    (<HTMLInputElement>document.getElementById("brandInfo")).innerHTML = `Brand: ${car.brand}`;
    (<HTMLInputElement>document.getElementById("colorInfo")).innerHTML = `Color: ${car.color}`;
}
