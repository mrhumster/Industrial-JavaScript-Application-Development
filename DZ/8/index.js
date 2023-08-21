function convertTemperature(value, unit) {
    const outputUnit = document.getElementById("output-unit-select").value
    if (unit === outputUnit) {
        return value
    }
    if (unit === "0") {
        return value * 9 / 5 + 32;
    }
    else if (unit === "1") {
        return (value - 32) * 5 / 9;
    }}

function onKeyupHandler() {
    const value = document.getElementById("temperature-input").value;
    const temperature = parseFloat(value)
    if (!isNaN(temperature )) {
        document.getElementById('temperature-input').classList.remove('is-invalid')
        document.getElementById('temperature-input').classList.add('is-valid')
        const unit = document.getElementById("unit-select").value;
        const convertedTemperature = convertTemperature(temperature, unit);
        document.getElementById("temperature-output").value = convertedTemperature.toFixed(5)
    } else {
        document.getElementById('temperature-input').classList.remove('is-valid')
        document.getElementById('temperature-input').classList.add('is-invalid')
        document.getElementById("temperature-output").value = '';
    }
}

function turnOver() {
    document.getElementById("temperature-input").value = document.getElementById("temperature-output").value;
    const inputUnit = document.getElementById("unit-select")
    const outputUnit = document.getElementById("output-unit-select")
    const _iv = String(inputUnit.value)
    const _ov = String(outputUnit.value)
    outputUnit.value = _iv
    inputUnit.value = _ov
    setInputAddon(inputUnit)
    setInputAddon(outputUnit)
    onKeyupHandler()
}

function setInputAddon(select) {
    let addon = document.getElementById("input-addon")
    switch (select.id){
        case "unit-select":
            addon = document.getElementById("input-addon")
            break
        case "output-unit-select":
            addon = document.getElementById("output-input-addon")
            break
    }

    switch (select.value) {
        case "0" :
            addon.innerText = '°C';
            break
        case "1":
            addon.innerText = '°F';
    }
}