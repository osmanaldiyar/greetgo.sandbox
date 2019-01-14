package kz.greetgo.sandbox.controller.model;

public class ClientRegisteredAddress {

    private String registeredStreet;
    private String registeredHouse;
    private String registeredFlatNumber;

    public ClientRegisteredAddress() {
    }

    public ClientRegisteredAddress(String registeredStreet, String registeredHouse, String registeredFlatNumber) {
        this.registeredStreet = registeredStreet;
        this.registeredHouse = registeredHouse;
        this.registeredFlatNumber = registeredFlatNumber;
    }


    public String getRegisteredStreet() {
        return registeredStreet;
    }

    public void setRegisteredStreet(String registeredStreet) {
        this.registeredStreet = registeredStreet;
    }

    public String getRegisteredHouse() {
        return registeredHouse;
    }

    public void setRegisteredHouse(String registeredHouse) {
        this.registeredHouse = registeredHouse;
    }

    public String getRegisteredFlatNumber() {
        return registeredFlatNumber;
    }

    public void setRegisteredFlatNumber(String registeredFlatNumber) {
        this.registeredFlatNumber = registeredFlatNumber;
    }

    @Override
    public String toString() {
        return "ClientRegisteredAddress{" +
                "registeredStreet='" + registeredStreet + '\'' +
                ", registeredHouse='" + registeredHouse + '\'' +
                ", registeredFlatNumber='" + registeredFlatNumber + '\'' +
                '}';
    }
}
