import { LightningElement, wire } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import getCases from "@salesforce/apex/caseController.getCases";
import { refreshApex } from "@salesforce/apex";
import CASE_OBJECT from "@salesforce/schema/Case";
import CASE_NUMBER_FIELD from "@salesforce/schema/Case.CaseNumber";
import SUBJECT_FIELD from "@salesforce/schema/Case.Subject";
import STATUS_FIELD from "@salesforce/schema/Case.Status";
import PRIORITY_FIELD from "@salesforce/schema/Case.Priority";
import updateCases from "@salesforce/apex/caseController.updateCases";
import { updateRecord } from "lightning/uiRecordApi";
import { notifyRecordUpdateAvailable } from "lightning/uiRecordApi";

const COLUMNS = [
  {
    label: "Case Number",
    fieldName: CASE_NUMBER_FIELD.fieldApiName,
    type: "text"
  },
  {
    label: "Subject",
    fieldName: SUBJECT_FIELD.fieldApiName,
    type: "text",
    editable: true
  },
  {
    label: "Status",
    fieldName: STATUS_FIELD.fieldApiName,
    type: "text",
    editable: true
  },
  {
    label: "Priority",
    fieldName: PRIORITY_FIELD.fieldApiName,
    type: "text",
    editable: true
  }
];

export default class ChallengeFebThird extends LightningElement {
  // boolean to refresh create form
  showCreateForm = true;
  draftValues = [];

  objectApiName = CASE_OBJECT;
  columns = COLUMNS;
  fields = [SUBJECT_FIELD, STATUS_FIELD, PRIORITY_FIELD];

  @wire(getCases)
  cases;

  // function for the handle success event handler
  handleSuccess(event) {
    const toastEvent = new ShowToastEvent({
      title: "Case created",
      message: "Case ID: " + event.detail.id,
      variant: "success"
    });
    this.dispatchEvent(toastEvent);

    // refreshes the template directive to refresh the create form
    this.showCreateForm = false;
    setTimeout(() => {
      this.showCreateForm = true;
    }, 0);

    // refreshes wire attribute
    refreshApex(this.cases);
  }

  // use imperative apex to update the cases
  async handleSave(event) {
    const updatedFields = event.detail.draftValues;

    // Prepare the record IDs for notifyRecordUpdateAvailable()
    const notifyChangeIds = updatedFields.map((row) => {
      return { recordId: row.Id };
    });

    try {
      // Pass edited fields to the updateCases Apex controller
      const result = await updateCases({ data: updatedFields });
      console.log(JSON.stringify("Apex update result: " + result));

      // Show a success toast message
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Success",
          message: "Case updated",
          variant: "success"
        })
      );

      // Refresh LDS cache and wires
      notifyRecordUpdateAvailable(notifyChangeIds);

      // Display fresh data in the datatable
      await refreshApex(this.cases);

      // Clear all draft values in the datatable
      this.draftValues = [];
    } catch (error) {
      // Show an error toast message
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Error updating or refreshing records",
          message: error.body.message,
          variant: "error"
        })
      );
    }
  }
}
