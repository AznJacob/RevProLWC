public with sharing class caseController {
    public caseController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Case> getCases(){
        return [SELECT CaseNumber, Subject, Status, Priority FROM Case];
    }

    @AuraEnabled
    public static string updateCases(Object data){
        List<Case> casesForUpdate = (List<Case>) JSON.deserialize(
         JSON.serialize(data),
         List<Case>.class
    );
    try {
        update casesForUpdate;
        return 'Success: cases updated successfully';
    }
    catch (Exception e) {
        return 'The following exception has occurred: ' + e.getMessage();
    }
    }
}