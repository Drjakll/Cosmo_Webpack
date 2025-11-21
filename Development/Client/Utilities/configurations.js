/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

const Months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const Weekdays = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
]

const Verify_Email = function(email){
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return emailRegex.test(email);
};

const Verify_Password = function(password){
    
    return true; ///^(?=(.*\d){3,})(?=.*[A-Z])(?=.*[!@#$%^&*?]).{8,}$/.test(password);
    
};

const UTC_Time_Now = function () {
    let now = new Date();

    let year = parseInt(now.getUTCFullYear());
    let month = parseInt(now.getUTCMonth()) + 1;
    let date = parseInt(now.getUTCDate());
    let hours = parseInt(now.getUTCHours());
    let minutes = parseInt(now.getUTCMinutes());
    let seconds = parseInt(now.getUTCSeconds());

    return { year, month, date, hours, minutes, seconds };
}

const Local_Time_Now = function () {
       let now = new Date();

    let year = parseInt(now.getFullYear());
    let month = parseInt(now.getMonth()) + 1;
    let date = parseInt(now.getDate());
    let hours = parseInt(now.getHours());
    let minutes = parseInt(now.getMinutes());
    let seconds = parseInt(now.getSeconds());

    return { year, month, date, hours, minutes, seconds };
}


export default {
    Cookie_Expire_Days: 1,
    Verify_Email: Verify_Email,
    Verify_Password: Verify_Password,
    Months: Months,
    Weekdays: Weekdays,
    UTC_Time_Now: UTC_Time_Now,
    Local_Time_Now: Local_Time_Now
}