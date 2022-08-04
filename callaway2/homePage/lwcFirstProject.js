import { LightningElement } from 'lwc';
import My_Resource from '@salesforce/resourceUrl/homeimage';
import My_Resource1 from '@salesforce/resourceUrl/dappointment';
import My_Resource2 from '@salesforce/resourceUrl/enemities';
import docwithoutface from '@salesforce/resourceUrl/docwithoutface';
import { NavigationMixin } from 'lightning/navigation';



export default class LwcFirstProject extends NavigationMixin(LightningElement) {
homeimage = My_Resource ;
appoint = My_Resource1 ;
enemities = My_Resource2 ;
docimage = docwithoutface;
isLoaded = false;


ambulanceRedirect(event) {
this.isLoaded = true
this[NavigationMixin.Navigate]({
    type: 'standard__webPage',
    attributes: {
        
       url: '/informationsearchpage'
    }
});
this.isLoaded = false
}
}