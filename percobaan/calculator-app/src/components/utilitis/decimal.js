
const decimal = value => {
    if(value === '0') {
        return value
    }
    let output =  ''
    let numDecimal =  ''
    let neg = false

    if(value.includes('.')) {
        output = value.substring(0, value.indexOf('.'))
        numDecimal = value.substring(value.indexOf('.'))
    } else {
        output = value
    }

    if(parseFloat(value) < 0) {
        neg = true
        output = output.substring(1)
    }


    return neg ? '-' + parseFloat(output).toLocaleString() + numDecimal : parseFloat(output).toLocaleString() + numDecimal
}

export default decimal