package kz.greetgo.sandbox.controller.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ClientDetails {

    public int id;

    private String gender;
    private Date dateOfBirth;

    private ClientAddress clientAddress;

    private ClientRegisteredAddress registeredAddress;

    private List<ClientPhoneNumber> phoneNumbers = new ArrayList<>();

    public ClientDetails() {
    }

    public ClientDetails(int id, String gender, Date dateOfBirth, ClientAddress clientAddress, ClientRegisteredAddress registeredAddress, List<ClientPhoneNumber> phoneNumbers) {
        this.id = id;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.clientAddress = clientAddress;
        this.registeredAddress = registeredAddress;
        this.phoneNumbers = phoneNumbers;
    }

    public ClientDetails(String gender, Date dateOfBirth, ClientAddress clientAddress, ClientRegisteredAddress registeredAddress, List<ClientPhoneNumber> phoneNumbers) {
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.clientAddress = clientAddress;
        this.registeredAddress = registeredAddress;
        this.phoneNumbers = phoneNumbers;
    }

    public List<ClientPhoneNumber> getPhoneNumbers() {
        return phoneNumbers;
    }

    public void setPhoneNumbers(List<ClientPhoneNumber> phoneNumbers) {
        this.phoneNumbers = phoneNumbers;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public ClientAddress getClientAddress() {
        return clientAddress;
    }

    public void setClientAddress(ClientAddress clientAddress) {
        this.clientAddress = clientAddress;
    }

    public ClientRegisteredAddress getRegisteredAddress() {
        return registeredAddress;
    }

    public void setRegisteredAddress(ClientRegisteredAddress registeredAddress) {
        this.registeredAddress = registeredAddress;
    }

    @Override
    public String toString() {
        return "ClientDetails{" +
                "id=" + id +
                ", gender='" + gender + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", clientAddress=" + clientAddress +
                ", registeredAddress=" + registeredAddress +
                ", phoneNumbers=" + phoneNumbers +
                '}';
    }
}
