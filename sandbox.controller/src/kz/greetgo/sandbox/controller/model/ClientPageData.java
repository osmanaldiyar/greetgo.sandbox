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
                        new ClientRecord(0,"Pushkin","good",110,46,150,16550),
                        new ClientRecord(1,"Lermontov","nice",111,50,150,16440),
                        new ClientRecord(2,"Tolstoi","simple",22,47,150,16230),
                        new ClientRecord(3,"Kamu","angry",143,430,150,16330),


                        new ClientRecord(4,"Gogol","bad",10,40324,154320,164230),
                        new ClientRecord(5,"Esenin Alex","unknown",190,3450,423150,1604),
                        new ClientRecord(6,"Mayakovskii","good",610,123,154230,1640),
                        new ClientRecord(7,"Dekster","good",210,60040,142350,1630),


                        new ClientRecord(8,"Max Frai","good",310,434000,123450,123460),
                        new ClientRecord(9,"Coelio","good",150,4234230,123450,1650),
                        new ClientRecord(10,"Iung","good",55,23440,123450,16560),
                        new ClientRecord(11,"Lewis","good",18,423420,123450,1562360),

                        new ClientRecord(12,"Esenin Aleksandr","bad",310,434000,123450,123460),
                        new ClientRecord(13,"Esenin Evgenii","evil",150,4234230,123450,1650),
                        new ClientRecord(14,"Esenin Petr","normal",55,23440,123450,16560),
                        new ClientRecord(15,"Esenin Maksim","hero",18,423420,123450,1562360),

                        new ClientRecord(16,"Esenin Dmitrii","bad",310,434000,123450,123460),
                        new ClientRecord(17,"Esenin Snow","evil",150,4234230,123450,1650),
                        new ClientRecord(18,"Esenin John","normal",55,23440,123450,16560),
                        new ClientRecord(19,"Esenin Aleksei","hero",18,423420,123450,1562360)
                )
        );
        clientsToDisplay = new ArrayList<>(
                Arrays.asList(
                        new ClientRecord(0,"Pushkin","good",110,46,150,16550),
                        new ClientRecord(1,"Lermontov","nice",111,50,150,16440),
                        new ClientRecord(2,"Tolstoi","simple",22,47,150,16230),
                        new ClientRecord(3,"Kamu","angry",143,430,150,16330),


                        new ClientRecord(4,"Gogol","bad",10,40324,154320,164230),
                        new ClientRecord(5,"Esenin Alex","unknown",190,3450,423150,1604),
                        new ClientRecord(6,"Mayakovskii","good",610,123,154230,1640),
                        new ClientRecord(7,"Dekster","good",210,60040,142350,1630),


                        new ClientRecord(8,"Max Frai","good",310,434000,123450,123460),
                        new ClientRecord(9,"Coelio","good",150,4234230,123450,1650),
                        new ClientRecord(10,"Iung","good",55,23440,123450,16560),
                        new ClientRecord(11,"Lewis","good",18,423420,123450,1562360),

                        new ClientRecord(12,"Esenin Aleksandr","bad",310,434000,123450,123460),
                        new ClientRecord(13,"Esenin Evgenii","evil",150,4234230,123450,1650),
                        new ClientRecord(14,"Esenin Petr","normal",55,23440,123450,16560),
                        new ClientRecord(15,"Esenin Maksim","hero",18,423420,123450,1562360),

                        new ClientRecord(16,"Esenin Dmitrii","bad",310,434000,123450,123460),
                        new ClientRecord(17,"Esenin Snow","evil",150,4234230,123450,1650),
                        new ClientRecord(18,"Esenin John","normal",55,23440,123450,16560),
                        new ClientRecord(19,"Esenin Aleksei","hero",18,423420,123450,1562360)
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
