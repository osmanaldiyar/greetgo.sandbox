package kz.greetgo.sandbox.controller.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ClientPageData {

    private int totalPages;
    private int totalElements;
    private int firstElement;
    private int lastElement;
    private List<ClientRecord> clientsToDisplay;
    private List<ClientRecord> clients;

    public ClientPageData() {
        clients = new ArrayList<>(
                Arrays.asList(
                        new ClientRecord("Pushkin","good",110,46,150,16550),
                        new ClientRecord("Lermontov","nice",111,50,150,16440),
                        new ClientRecord("Tolstoi","simple",22,47,150,16230),
                        new ClientRecord("Kamu","angry",143,430,150,16330),


                        new ClientRecord("Gogol","bad",10,40324,154320,164230),
                        new ClientRecord("Esenin Alex","unknown",190,3450,423150,1604),
                        new ClientRecord("Mayakovskii","good",610,123,154230,1640),
                        new ClientRecord("Dekster","good",210,60040,142350,1630),


                        new ClientRecord("Max Frai","good",310,434000,123450,123460),
                        new ClientRecord("Coelio","good",150,4234230,123450,1650),
                        new ClientRecord("Iung","good",55,23440,123450,16560),
                        new ClientRecord("Lewis","good",18,423420,123450,1562360),

                        new ClientRecord("Esenin Aleksandr","bad",310,434000,123450,123460),
                        new ClientRecord("Esenin Evgenii","evil",150,4234230,123450,1650),
                        new ClientRecord("Esenin Petr","normal",55,23440,123450,16560),
                        new ClientRecord("Esenin Maksim","hero",18,423420,123450,1562360),

                        new ClientRecord("Esenin Dmitrii","bad",310,434000,123450,123460),
                        new ClientRecord("Esenin Snow","evil",150,4234230,123450,1650),
                        new ClientRecord("Esenin John","normal",55,23440,123450,16560),
                        new ClientRecord("Esenin Aleksei","hero",18,423420,123450,1562360)
                )
        );
        clientsToDisplay = new ArrayList<>(
                Arrays.asList(
                        new ClientRecord("Pushkin","good",110,46,150,16550),
                        new ClientRecord("Lermontov","nice",111,50,150,16440),
                        new ClientRecord("Tolstoi","simple",22,47,150,16230),
                        new ClientRecord("Kamu","angry",143,430,150,16330),


                        new ClientRecord("Gogol","bad",10,40324,154320,164230),
                        new ClientRecord("Esenin Alex","unknown",190,3450,423150,1604),
                        new ClientRecord("Mayakovskii","good",610,123,154230,1640),
                        new ClientRecord("Dekster","good",210,60040,142350,1630),


                        new ClientRecord("Max Frai","good",310,434000,123450,123460),
                        new ClientRecord("Coelio","good",150,4234230,123450,1650),
                        new ClientRecord("Iung","good",55,23440,123450,16560),
                        new ClientRecord("Lewis","good",18,423420,123450,1562360),

                        new ClientRecord("Esenin Aleksandr","bad",310,434000,123450,123460),
                        new ClientRecord("Esenin Evgenii","evil",150,4234230,123450,1650),
                        new ClientRecord("Esenin Petr","normal",55,23440,123450,16560),
                        new ClientRecord("Esenin Maksim","hero",18,423420,123450,1562360),

                        new ClientRecord("Esenin Dmitrii","bad",310,434000,123450,123460),
                        new ClientRecord("Esenin Snow","evil",150,4234230,123450,1650),
                        new ClientRecord("Esenin John","normal",55,23440,123450,16560),
                        new ClientRecord("Esenin Aleksei","hero",18,423420,123450,1562360)
                )
        );
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
