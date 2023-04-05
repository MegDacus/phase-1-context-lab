function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords (arrayOfArrays) {
    return arrayOfArrays.map((record) => {
        return createEmployeeRecord(record)
    })
}

function createTimeInEvent (dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    })
    
    return this;
}

function createTimeOutEvent (dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    this.timeOutEvents.push({
        type:"TimeOut",
        hour: parseInt(hour),
        date: date
    })

    return this;
}

function hoursWorkedOnDate(dateStamp) {
    let timeIn
    let timeOut

    this.timeInEvents.forEach((time) => {
        if (time.date === dateStamp) {
            timeIn = time.hour/ 100;
        }
    })
  
    this.timeOutEvents.forEach((time) => {
        if (time.date === dateStamp) {
            timeOut = time.hour/ 100;
        }
    })

    return timeOut - timeIn;
} 

function wagesEarnedOnDate (dateStamp) {
    let payRate = this.payPerHour
    let hours = hoursWorkedOnDate.call(this, dateStamp)

    return payRate * hours;
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find((array)=>array.firstName === firstName);
}


function calculatePayroll(employeeArray) {
    return employeeArray.reduce((total, employee) => total + allWagesFor.call(employee), 0)
}