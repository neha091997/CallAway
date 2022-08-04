import { LightningElement } from 'lwc';
import uId from '@salesforce/user/Id';
import 	CallAwayLogo from '@salesforce/resourceUrl/CallAwayLogo';
import { NavigationMixin } from 'lightning/navigation';
import userDetail from '@salesforce/apex/CallAwayEmergencyController.userDetail';

export default class CallAwayHeader extends NavigationMixin(LightningElement) {

    isLoggedIn = false
    uId = uId;
    uName;
    CallAwayLogo = CallAwayLogo
    connectedCallback() {
        if (this.uId != null) {
            this.getUserDetail()
            this.isLoggedIn = true
        } else {
            this.isLoggedIn = false
        }
    }
    getUserDetail() {
        userDetail({ Uid: this.uId })
            .then((result) => {

                this.uName = result
                
                
            }).catch((err) => {

            });
    }
    getLogin() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/login'
            }
        });
    }
    getLogout() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: 'https://enphasecom-developer-edition.ap16.force.com/secur/logout.jsp?retUrl=/CallAwayEmergencies/s'
            }
        });
        //  window.location.replace("https://enphasecom-developer-edition.ap16.force.com/CallAwayEmergencies/s/secur/logout.jsp");
    }
}