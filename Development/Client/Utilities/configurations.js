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
    
    return /^(?=(.*\d){3,})(?=.*[A-Z])(?=.*[!@#$%^&*?]).{8,}$/.test(password);
    
};

export default {
        Cookie_Expire_Days: 1,
        Verify_Email: Verify_Email,
        Verify_Password: Verify_Password,
        Months: Months,
        Weekdays: Weekdays
}