public without sharing class CallAwayEmergencyController {
    
    
    @AuraEnabled(cacheable=true)
    public static List<Hospital__c> getHospitals(string state,String city){
        List<Hospital__c> HospitalList = [SELECT Id,Email_Address__c,Cities__c,State__c,Wheelchair__c,Ac_Room__c,General_Bed__c,Name,Hospital_Type__c,Non_Ac_Room__c,Oxygen_Cylinder__c from Hospital__c where Cities__c=:city AND state__c=:state];
        
        return HospitalList;
        
    }
    
    @AuraEnabled(cacheable=true)
    public static String HospitalDetails(string HId){
        Hospital__c HospitalList = [SELECT Id,Email_Address__c,Cities__c,State__c,General_Bed__c,Name,Hospital_Type__c,Non_Ac_Room__c,Oxygen_Cylinder__c from Hospital__c where id=:HId];
        
        return HospitalList.Name;
        
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Patient__c> getpatients(string uId){
        List<Patient__c> PList = [SELECT Id,Name from Patient__c where User__c=:uId];
        //List<Patient__c> PList = [SELECT Id,Name from Patient__c where User__c= '0052w000002M5HZAA0'];
        
        return PList;
        
    }
    @AuraEnabled
    public static String AddPatientToUser(string Pname,string Pgender,string Pdisease,integer page,string userId ){
        if(Pname != null && userId != null){
            Patient__c P = new Patient__c();
            p.name = Pname;
            p.gender__c = pgender;
            p.age__c = page;
            p.Disease__c = pdisease;
            p.User__c  = userId;
            insert p;
            return 'Patient Inserted Successfuly';
        }else{
            return 'Patient Name OR User Should not be Blank';
        }
    }
    @AuraEnabled
    public static string confirmAmbulanceBooking(string selectedPatient,datetime bookingdate, string Hospital,string vantype,string uId){
        if(vantype != null && bookingdate != null){
            List<Ambulance__c> AmbList = [Select id,Status__c,Name,Ambulance_Type__c,Ambulance_No__c from Ambulance__c where Related_to_Hospital__c =:Hospital AND Status__c= 'vacant' AND Ambulance_Type__c =:vantype];
            if(AmbList.size() > 0){
                Booking__c book = new Booking__c();
                book.Hospital__c = Hospital;
                book.Patient__c = selectedPatient;
                book.Date_and_Time__c = bookingdate;
                book.Ambulance__c = AmbList[0].Id;
                book.User__c= uId;
                insert book;
                return 'Ambulance Booked Successfully';
            }else{
                return 'Choosen Category Ambulance Is not Available';
            }
            
        }
        else{
            return 'Kindly Choose Van Type Or Booking Date';
        }
    }
    @AuraEnabled
    public static string confirmAmenitiesBooking(string selectedPatient,Datetime bookingdate,string Hospital,string amenitiestype,string uId){
        string status;
        if(selectedPatient != null && bookingdate != null && amenitiestype != null){
            if(amenitiestype == 'Nurse'){
                List<Nurse__c> girl = [Select id,name,Contact_Number__c,Works_In__c,Age__c from Nurse__c where Works_In__c =:Hospital AND Reserve__c = false];
                if(girl.size() > 0){
                    Booking__c book = new Booking__c();
                    book.Hospital__c = Hospital;
                    book.Patient__c = selectedPatient;
                    book.Date_and_Time__c = bookingdate;
                    book.Amenity_Type__c = amenitiestype;
                    book.nurse__c  = girl[0].Id;
                    book.User__c= uId;
                    insert book;
                    status = 'Nurse Booked Successully';
                }
            }else if(amenitiestype == 'WardBoy'){
                List<Wardboy__c> boy = [Select id,name,Work_In__c,Age__c from Wardboy__c where Work_In__c =:Hospital AND Reserve__c = false];
                if(boy.size() > 0){
                    Booking__c book = new Booking__c();
                    book.Hospital__c = Hospital;
                    book.Patient__c = selectedPatient;
                    book.Date_and_Time__c = bookingdate;
                    book.Amenity_Type__c = amenitiestype;
                    book.wardboy__c  = boy[0].Id;
                    book.User__c= uId;
                    insert book;
                    status =  'WardBoy Booked Successully';
                }
            }else{
                Booking__c book = new Booking__c();
                book.Hospital__c = Hospital;
                book.Patient__c = selectedPatient;
                book.Date_and_Time__c = bookingdate;
                book.Amenity_Type__c = amenitiestype;
                book.User__c= uId;
                insert book;
                status = 'Amenities Booked Successully';
            }
            
        }
        return status;
    }
    
    
    @AuraEnabled
    public static List<doctorAppointment__c> DoctorDetails(string HId){
        List<doctorAppointment__c> doc = [SELECT id,name,Contact_Number__c,Email_Address__c,Experience__c,Specilization__c from doctorAppointment__c where Hospital_Related__c=:HId];
        return doc;
    }
    
    @AuraEnabled
    public static string confirmAppoinmentBooking(string selectedPatient,Datetime bookingdate,string Hospital,string doctor,string uId){
        if(doctor != null && bookingdate != null){
            Booking__c book = new Booking__c();
            book.Hospital__c = Hospital;
            book.Patient__c = selectedPatient;
            book.Date_and_Time__c = bookingdate;
            book.doctorAppointment__c = doctor;
            book.User__c= uId;
            insert book;
            return 'Appointment Booked';
        }else{
            return 'Booking date not Selected';
        }
        
        
    }
    
    @AuraEnabled
    public static String userDetail(string Uid){
        user u = [select id,name,username from user where id=:uid];
        return u.name;
    }
    
    @AuraEnabled
    public static List<Booking__c> getBookingDetails(string Uid){
        List<Booking__c> Booking = [SELECT id,name,PatientName__c,HospitalName__c,Date_and_Time__c,Amenity_Type__c,WardBoyName__c,NurseName__c 
                                    from Booking__c where User__c =: Uid];
        return Booking;
    }
    
    
}