package kz.greetgo.sandbox.controller.model;

public class ClientRecordsAndDetails {

    private ClientRecord clientRecord;
    private ClientDetails clientDetails;

    public ClientRecordsAndDetails() {
    }

    public ClientRecord getClientRecord() {
        return clientRecord;
    }

    public void setClientRecord(ClientRecord clientRecord) {
        this.clientRecord = clientRecord;
    }

    public ClientDetails getClientDetails() {
        return clientDetails;
    }

    public void setClientDetails(ClientDetails clientDetails) {
        this.clientDetails = clientDetails;
    }
}
