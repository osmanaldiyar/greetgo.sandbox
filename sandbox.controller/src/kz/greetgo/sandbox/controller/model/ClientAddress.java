package kz.greetgo.sandbox.controller.model;

public class ClientAddress {
    private String street;
    private String house;
    private String flatNumber;

    public ClientAddress() {
    }

    public ClientAddress(String street, String house, String flatNumber) {
        this.street = street;
        this.house = house;
        this.flatNumber = flatNumber;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getHouse() {
        return house;
    }

    public void setHouse(String house) {
        this.house = house;
    }

    public String getFlatNumber() {
        return flatNumber;
    }

    public void setFlatNumber(String flatNumber) {
        this.flatNumber = flatNumber;
    }

    @Override
    public String toString() {
        return "ClientAddress{" +
                "street='" + street + '\'' +
                ", house='" + house + '\'' +
                ", flatNumber='" + flatNumber + '\'' +
                '}';
    }
}
