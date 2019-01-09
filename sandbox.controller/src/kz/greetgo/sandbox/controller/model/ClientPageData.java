package kz.greetgo.sandbox.controller.model;

import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.HasAfterInject;
import kz.greetgo.util.RND;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;


public class ClientPageData {

    private int totalPages;
    private int totalElements;
    private int firstElement;
    private int lastElement;
    private List<ClientRecord> clientsToDisplay;
    private List<ClientRecord> clients;


    public ClientPageData() {

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
