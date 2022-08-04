import { LightningElement } from 'lwc';
import My_Resource from '@salesforce/resourceUrl/homeimage';
import My_Resource1 from '@salesforce/resourceUrl/dappointment';
import My_Resource2 from '@salesforce/resourceUrl/enemities';
import docwithoutface from '@salesforce/resourceUrl/docwithoutface';
import { NavigationMixin } from 'lightning/navigation';
// Example :- import TRAILHEAD_LOGO from '@salesforce/resourceUrl/trailhead_logo';


export default class homePage extends NavigationMixin(LightningElement) {
homeimage = My_Resource ;
appoint = My_Resource1 ;
enemities = My_Resource2 ;
docimage = docwithoutface;
isLoaded = false;




myQuestions=[
    {
    id:"question1",
    questions : "what is Salesforce?",
    options:{
        a:"Editor",
        b:"subjective",
        c:"Cloud Service"
    },
    Correctanswer:"c"
},
{
    id:"question2",
    questions : "what is Triggers?",
    options : {
        a:"a code",
        b:"a service",
        c:"automation Process"
    },
    Correctanswer:"c"
},
{
    id:"question3",
    questions : "what is apex?",
    options : {
        a:"editor",
        b:"code",
        c:"Programming language"
    },
    Correctanswer:"c"
},
]
ambulanceRedirect(event) {
this.isLoaded = true
//let encode = btoa(JSON.stringify(componentDef));
this[NavigationMixin.Navigate]({
    type: 'standard__webPage',
    attributes: {
        
       url: '/informationsearchpage'
    }
});
this.isLoaded = false
}
}