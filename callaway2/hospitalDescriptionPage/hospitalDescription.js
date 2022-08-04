import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import HospitalDetails from '@salesforce/apex/CallAwayEmergencyController.HospitalDetails';
import getpatients from '@salesforce/apex/CallAwayEmergencyController.getpatients';
import AddPatientToUser from '@salesforce/apex/CallAwayEmergencyController.AddPatientToUser';
import confirmAmenitiesBooking from '@salesforce/apex/CallAwayEmergencyController.confirmAmenitiesBooking';
import confirmAmbulanceBooking from '@salesforce/apex/CallAwayEmergencyController.confirmAmbulanceBooking';
import confirmAppoinmentBooking from '@salesforce/apex/CallAwayEmergencyController.confirmAppoinmentBooking';
import DoctorDetails from '@salesforce/apex/CallAwayEmergencyController.DoctorDetails';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import uId from '@salesforce/user/Id';

const patientcolumns = [
   { label: 'patient Name', fieldName: 'Name' }

];

export default class HospitalDescription extends NavigationMixin(LightningElement) {

   currentPageReference = null;
   urlStateParameters = null;
   uId = uId;
   patientsList;
   patientmodal = false
   Ambulancemodal = false
   aminities = false
   appointment = false
   /* Params from Url */
   urlId = null;
   HospitalName;
   isConfirmed = true;
   patientName;
   patientGender;
   patientDisease
   patientage;
   selectedPatient;
   selectedAmenitiesdate
   selectedambulancedate;
   selectedVan
   selectamenities
   doctors
   selectedappointmentdate
   selectedDoctor
   SuccessMsg;
   showMassage = false

   get vanoptions() {
      return [
         { label: 'Mini', value: 'Mini' },
         { label: 'Large', value: 'Large' }
      ];
   }
   get amenitiesoptions() {
      return [
         { label: 'Ac Room', value: 'Ac Room' },
         { label: 'Non-Ac Room', value: 'Non-Ac Room' },
         { label: 'General Bed', value: 'General Bed' },
         { label: 'Wheel Chair', value: 'Wheel Chair' },
         { label: 'Nurse', value: 'Nurse' },
         { label: 'WardBoy', value: 'WardBoy' }
      ];
   }
   @wire(CurrentPageReference)
   getStateParameters(currentPageReference) {
      if (currentPageReference) {
         this.urlStateParameters = currentPageReference.state;
         this.setParametersBasedOnUrl();
      }
   }
   setParametersBasedOnUrl() {
      this.urlId = this.urlStateParameters.HospitalId || null;

   }
   connectedCallback() {

      this.getHospitalDetails()
      this.getDoctorDetails()
      this.getpatientDetails()

   }
   getHospitalDetails() {
      HospitalDetails({ HId: this.urlId })
         .then((result) => {
            this.HospitalName = result

         }).catch((err) => {

         });
   }
   getDoctorDetails() {
      DoctorDetails({ HId: this.urlId })
         .then((result) => {
            this.doctors = result

         }).catch((err) => {

         });
   }
   getpatientDetails() {
      getpatients({ uId: this.uId })
         .then((result) => {
            this.patientsList = result

         }).catch((err) => {

         });
   }

   handleChangevan(event) {
      this.selectedVan = event.target.value


   }
   handleChangeamenities(event) {
      this.selectamenities = event.target.value
   }
   handleAmbulance() {
      debugger
      this.Ambulancemodal = true
   }
   handleEnimites() {
      debugger

      this.aminities = true



   }
   handleAppointment() {
      debugger
      this.appointment = true

   }

   selectDateandTime() {

      this.template.querySelector(".confirm-alert").style.display = 'block';




   }
   selectDateandTime1() {

      this.template.querySelector(".confirm-alert1").style.display = 'block';




   }
   selectDateandTime2() {

      this.template.querySelector(".confirm-alert2").style.display = 'block';




   }


   closeAmbulancePicker() {
      
      this.Ambulancemodal = false;
      this.isConfirmed = true


   }

   closeEnimitesPicker() {
      
      this.aminities = false
      this.isConfirmed = true


   }

   closeAppointmentPicker() {
    
      this.appointment = false
      this.isConfirmed = true

   }

   AddPatientpopup(event) {
      this.patientmodal = true;
      this.template.querySelector(".patient-modal").style.display = 'block';

   }
   closepatientPicker() {
      this.patientmodal = false;
      this.isConfirmed = true
      this.template.querySelector(".patient-modal").style.display = 'none';
   }

   Addpatient() {
      var inp = this.template.querySelectorAll("lightning-input");
      inp.forEach(function (element) {
         if (element.name == "NewPatientName")
            this.patientName = element.value;

         else if (element.name == "NewPatientGender")
            this.patientGender = element.value;
         else if (element.name == "NewPatientDisease")
            this.patientDisease = element.value;
         else if (element.name == "NewPatientAge")
            this.patientage = element.value;
      }, this);
      AddPatientToUser({
         Pname: this.patientName,
         Pgender: this.patientGender,
         Pdisease: this.patientDisease,
         page: this.patientage,
         userId: this.uId
      })
         .then((result) => {
            window.alert(result)

            this.connectedCallback()

            this.patientmodal = false

         }).catch((err) => {
            window.alert(err)
         });

   }
   selectPatient(event) {
      this.selectedPatient = event.target.value
      this.isConfirmed = false

   }

   bookAmbulance(event) {
      var inp = this.template.querySelectorAll("lightning-input");
      inp.forEach(function (element) {
         if (element.name == "ambulancedate")
            this.selectedambulancedate = element.value;
      }, this);
      confirmAmbulanceBooking({
         selectedPatient: this.selectedPatient,
         bookingdate: this.selectedambulancedate,
         Hospital: this.urlId,
         vantype: this.selectedVan,
         uId: this.uId

      })
         .then((result) => {
            window.alert(result)
            this.connectedCallback()
            this.closeAmbulancePicker()
         }).catch((err) => {
            window.alert(err)
         });
   }
   bookamenities(event) {
      debugger
      var inp = this.template.querySelectorAll("lightning-input");
      inp.forEach(function (element) {
         if (element.name == "amenitiesdate")
            this.selectedAmenitiesdate = element.value;
      }, this);
      confirmAmenitiesBooking({
         selectedPatient: this.selectedPatient,
         bookingdate: this.selectedAmenitiesdate,
         Hospital: this.urlId,
         amenitiestype: this.selectamenities,
         uId: this.uId

      })
         .then((result) => {
            window.alert(result)
            //this.showToastSuccess()
            // this.SuccessMsg = 'Amenities Booked Succesfully'
            // this.showMassage = true
            this.connectedCallback()
            this.closeEnimitesPicker()
         }).catch((err) => {
            //this.showToastError()
            window.alert(err)
         });

   }
   selectdoctor(event) {
      this.selectedDoctor = event.target.value

   }

   bookAppointment(event) {
      debugger
      var inp = this.template.querySelectorAll("lightning-input");
      inp.forEach(function (element) {
         if (element.name == "appoinmentdate")
            this.selectedappointmentdate = element.value;
      }, this);
      confirmAppoinmentBooking({
         selectedPatient: this.selectedPatient,
         bookingdate: this.selectedappointmentdate,
         Hospital: this.urlId,
         doctor: this.selectedDoctor,
         uId: this.uId

      })
         .then((result) => {
            window.alert(result)
            //  this.showToastSuccess()
            // this.SuccessMsg = 'Appointment Booked Succesfully'
            // this.showMassage = true
            this.connectedCallback()
            this.closeAppointmentPicker()
         }).catch((err) => {
            window.alert(err)
            // this.showToastError()
         });
   }


   showToastSuccess() {

      const event = new ShowToastEvent({
         title: 'Get Help',
         message:
            'Salesforce documentation is available in the app. Click ? in the upper-right corner.',
      });
      this.dispatchEvent(event);

   }

   showToastError() {
      const event = new ShowToastEvent({
         title: 'Toast Error',
         message: 'Some unexpected error',
         variant: 'error',
         mode: 'dismissable'
      });
      this.dispatchEvent(event);
   }
   returnBack() {

      this[NavigationMixin.Navigate]({
         type: 'standard__webPage',
         attributes: {
            url: '/informationsearchpage'
         }
      });
   }

}