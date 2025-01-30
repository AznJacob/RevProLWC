import { LightningElement, wire, api } from 'lwc';
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';

export default class ChallengeEight extends LightningElement {
    @api recordId;
    

    @wire(getRecord, {recordId: "$recordId", fields: [NAME_FIELD, EMAIL_FIELD, PHONE_FIELD]})
        contact;
    
    get conName(){
        return getFieldValue(this.contact.data, NAME_FIELD);
    }
    get conEmail(){
        return getFieldValue(this.contact.data, EMAIL_FIELD);
    }
    get conPhone(){
        return getFieldValue(this.contact.data, PHONE_FIELD);
    }

}