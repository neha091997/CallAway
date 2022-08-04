import { LightningElement } from 'lwc';
import userDetail from '@salesforce/apex/CallAwayEmergencyController.userDetail';
import getBookingDetails from '@salesforce/apex/CallAwayEmergencyController.getBookingDetails';
import uId from '@salesforce/user/Id';
const Bookingcolumns = [
    { label: 'Booking Id', fieldName: 'Name' },
    { label: 'Patient Name', fieldName: 'PatientName__c' },
    { label: 'Hospital', fieldName: 'HospitalName__c' },
    { label: 'Date and Time', fieldName: 'Date_and_Time__c',type:'date' ,
     typeAttributes: {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  },
  sortable: false},
    { label: 'Amenity Type ', fieldName: 'Amenity_Type__c' },
    { label: 'Nurse', fieldName: 'NurseName__c' },
    { label: 'Wardboy', fieldName: 'WardBoyName__c' }
];
export default class CallawayBookingDashboard extends LightningElement {
    uId = uId;
    welcomeUser;
    Bookingcolumns = Bookingcolumns
    BookingDetails;
    connectedCallback() {
        this.getUserDetail()
        this.getBooking()
    }
    getUserDetail() {
        userDetail({ Uid: this.uId })
            .then((result) => {
                //this.welcomeUser = 'Hello ' + result
                const arr = result.split(" ");

//loop through each element of the array and capitalize the first letter.


for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

}

//Join all the elements of the array back into a string 
//using a blankspace as a separator 
const str2 = arr.join(" ");
this.welcomeUser = 'Hello ' + str2
            }).catch((err) => {

            });
    }
    getBooking() {
        
        getBookingDetails({ Uid: this.uId })
            .then((result) => {
                this.BookingDetails = result;
                
            }).catch((err) => {

            });
    }

}