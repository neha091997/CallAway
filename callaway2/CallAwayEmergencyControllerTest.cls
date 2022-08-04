@isTest
public class CallAwayEmergencyControllerTest {
    @isTest
    public static void Test(){
        string city = 'test';
        string state = 'testing';
        string userID = UserInfo.getUserId();
        datetime d = system.now();
        datetime d1 = d.addDays(2);
        hospital__c h = new Hospital__c();
        h.name = 'test';
        insert h;
        patient__c p = new patient__C();
        p.Name = 'test';
        p.User__c = userID;
        insert p;
        Ambulance__c a = new Ambulance__c();
        a.Ambulance_No__c = 'mpjin';
        a.Ambulance_Type__c = 'mini';
        a.Related_to_Hospital__c = h.Id;
        a.Status__c = 'vacant';
        insert a;
        nurse__c n = new nurse__c();
        n.name = 'test';
        n.Reserve__c = false;
        n.Works_In__c = h.id;
        insert n;
        WardBoy__c w = new WardBoy__c();
        w.name = 'test';
        w.Reserve__c = false;
        w.Work_In__c = h.id;
        insert w;
        doctorAppointment__c doc = new doctorAppointment__c();
        doc.Name = 'test';
        doc.Hospital_Related__c = h.id;
        doc.Cities__c = 'Indore';
        doc.State__c = 'Madhya Pradesh';
        doc.Email_Address__c = 'dnsi@gmail.com';
        insert doc;
        test.startTest();
        CallAwayEmergencyController.getHospitals(city,state);
        CallAwayEmergencyController.HospitalDetails(h.Id);
        CallAwayEmergencyController.getpatients(userID);
        CallAwayEmergencyController.AddPatientToUser(city,city,city,1,userID);
        CallAwayEmergencyController.confirmAmbulanceBooking(p.Id,d1,h.Id,'mini',userID);
        CallAwayEmergencyController.confirmAmenitiesBooking(p.Id,d1,h.Id,'Ac Room',userID);
        CallAwayEmergencyController.confirmAmenitiesBooking(p.Id,d1,h.Id,'Nurse',userID);
        CallAwayEmergencyController.confirmAmenitiesBooking(p.Id,d1,h.Id,'WardBoy',userID);
        CallAwayEmergencyController.confirmAppoinmentBooking(p.Id, d1, h.Id, doc.id, userID);
        CallAwayEmergencyController.userDetail(userID);
        CallAwayEmergencyController.getBookingDetails(userID);
        CallAwayEmergencyController.DoctorDetails(h.id);
        test.stopTest();
    }
    
    
    
}