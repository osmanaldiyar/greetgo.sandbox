package kz.greetgo.sandbox.controller.model;

public class ClientPhoneNumber {
    public int id;
    private String phoneNumber;
    private String phoneType;

    public ClientPhoneNumber() {
    }

    public ClientPhoneNumber(int id, String phoneNumber, String phoneType) {
        this.id = id;
        this.phoneNumber = phoneNumber;
        this.phoneType = phoneType;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPhoneType() {
        return phoneType;
    }

    public void setPhoneType(String phoneType) {
        this.phoneType = phoneType;
    }

    @Override
    public String toString() {
        return "ClientPhoneNumber{" +
                "id=" + id +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", phoneType='" + phoneType + '\'' +
                '}';
    }
}
