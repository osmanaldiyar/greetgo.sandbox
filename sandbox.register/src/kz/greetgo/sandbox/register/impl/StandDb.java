package kz.greetgo.sandbox.register.impl;

import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.HasAfterInject;
import kz.greetgo.sandbox.controller.model.*;
import kz.greetgo.util.RND;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Bean
public class StandDb implements HasAfterInject {

    public List<ClientRecord> clients = new ArrayList<ClientRecord>();
    public List<ClientRecord> clientsToDisplay = new ArrayList<ClientRecord>();
    public List<ClientDetails> clientDetails = new ArrayList<ClientDetails>();

    private int totalPages;
    private int totalElements;
    private int firstElement;
    private int lastElement;

    @Override
    public void afterInject() throws Exception {
        fillClientRecords();
    }

    private void fillClientRecords() {
        clients.add(new ClientRecord(0,"Pushkin","good",110,46,150,16550));
        clients.add(new ClientRecord(1,"Lermontov","nice",111,50,150,16440));
        clients.add(new ClientRecord(2,"Tolstoi","simple",22,47,150,16230));
        clients.add(new ClientRecord(3,"Kamu","angry",143,430,150,16330));
        clients.add(new ClientRecord(4,"Gogol","bad",10,40324,154320,164230));

        clients.add(new ClientRecord(5,"Esenin Alex","unknown",190,3450,423150,1604));
        clients.add(new ClientRecord(6,"Mayakovskii","good",610,123,154230,1640));
        clients.add(new ClientRecord(7,"Dekster","good",210,60040,142350,1630));
        clients.add(new ClientRecord(8,"Max Frai","good",310,434000,123450,123460));
        clients.add(new ClientRecord(9,"Coelio","good",150,4234230,123450,1650));

        clients.add(new ClientRecord(10,"Iung","good",55,23440,123450,16560));
        clients.add(new ClientRecord(11,"Lewis","good",18,423420,123450,1562360));
        clients.add(new ClientRecord(12,"Esenin Aleksandr","bad",310,434000,123450,123460));
        clients.add(new ClientRecord(13,"Esenin Evgenii","evil",150,4234230,123450,1650));
        clients.add(new ClientRecord(14,"Esenin Petr","normal",55,23440,123450,16560));

        clients.add(new ClientRecord(15,"Esenin Maksim","hero",18,423420,123450,1562360));
        clients.add(new ClientRecord(16,"Esenin Dmitrii","bad",310,434000,123450,123460));
        clients.add(new ClientRecord(17,"Esenin Snow","evil",150,4234230,123450,1650));
        clients.add(new ClientRecord(18,"Esenin John","normal",55,23440,123450,16560));
        clients.add(new ClientRecord(19,"Esenin Aleksei","hero",18,423420,123450,1562360));

        List<ClientPhoneNumber> phones = new ArrayList<>();
        phones.add(new ClientPhoneNumber(0,"87059513095","Mobile"));
        phones.add(new ClientPhoneNumber(1,"","Mobile"));
        phones.add(new ClientPhoneNumber(2,"87057777777","Mobile"));
        phones.add(new ClientPhoneNumber(3,"","Mobile"));
        phones.add(new ClientPhoneNumber(4,"","Mobile"));

        clientDetails.add(new ClientDetails(0, "Male", new Date(), new ClientAddress(), new ClientRegisteredAddress(), phones));
        clientDetails.add(new ClientDetails(1, "Male", new Date(), new ClientAddress(), new ClientRegisteredAddress(), phones));
        clientDetails.add(new ClientDetails(2, "Male", new Date(), new ClientAddress(), new ClientRegisteredAddress(), phones));
        clientDetails.add(new ClientDetails(3, "Male", new Date(), new ClientAddress(), new ClientRegisteredAddress(), phones));
        clientDetails.add(new ClientDetails(4, "Male", new Date(), new ClientAddress(), new ClientRegisteredAddress(), phones));
        clientDetails.add(new ClientDetails(5, "Male", new Date(), new ClientAddress(), new ClientRegisteredAddress(), phones));
        clientDetails.add(new ClientDetails(6, "Male", new Date(), new ClientAddress(), new ClientRegisteredAddress(), phones));
        clientDetails.add(new ClientDetails(7, "Male", new Date(), new ClientAddress(), new ClientRegisteredAddress(), phones));
        clientDetails.add(new ClientDetails(8, "Male", new Date(), new ClientAddress(), new ClientRegisteredAddress(), phones));
        clientDetails.add(new ClientDetails(9, "Male", new Date(), new ClientAddress(), new ClientRegisteredAddress(), phones));
        clientDetails.add(new ClientDetails(10, "Male", new Date(), new ClientAddress(), new ClientRegisteredAddress(), phones));
        clientDetails.add(new ClientDetails(11, "Male", new Date(), new ClientAddress(), new ClientRegisteredAddress(), phones));
        clientDetails.add(new ClientDetails(12, "Male", new Date(), new ClientAddress(), new ClientRegisteredAddress(), phones));
        clientDetails.add(new ClientDetails(13, "Male", new Date(), new ClientAddress(), new ClientRegisteredAddress(), phones));
        clientDetails.add(new ClientDetails(14, "Male", new Date(), new ClientAddress(), new ClientRegisteredAddress(), phones));
        clientDetails.add(new ClientDetails(15, "Male", new Date(), new ClientAddress(), new ClientRegisteredAddress(), phones));
        clientDetails.add(new ClientDetails(16, "Male", new Date(), new ClientAddress(), new ClientRegisteredAddress(), phones));
        clientDetails.add(new ClientDetails(17, "Male", new Date(), new ClientAddress(), new ClientRegisteredAddress(), phones));
        clientDetails.add(new ClientDetails(18, "Male", new Date(), new ClientAddress(), new ClientRegisteredAddress(), phones));
        clientDetails.add(new ClientDetails(19, "Male", new Date(), new ClientAddress(), new ClientRegisteredAddress(), phones));


    }


    public List<ClientRecord> getClientsToDisplay() {
        return clientsToDisplay;
    }

    public void setClientsToDisplay(List<ClientRecord> clientsToDisplay) {
        this.clientsToDisplay = clientsToDisplay;
    }

    public int getFirstElement() {
        return firstElement;
    }

    public void setFirstElement(int firstElement) {
        this.firstElement = firstElement;
    }

    public int getLastElement() {
        return lastElement;
    }

    public void setLastElement(int lastElement) {
        this.lastElement = lastElement;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public int getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(int totalElements) {
        this.totalElements = totalElements;
    }

    public List<ClientRecord> getClients() {
        return clients;
    }

    public void setClients(List<ClientRecord> clients) {
        this.clients = clients;
    }



}