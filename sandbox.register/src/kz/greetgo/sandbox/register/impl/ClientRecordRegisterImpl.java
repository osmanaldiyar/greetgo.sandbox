package kz.greetgo.sandbox.register.impl;

import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.sandbox.controller.model.*;
import kz.greetgo.sandbox.controller.register.ClientRecordRegister;
import kz.greetgo.sandbox.register.dao.ClientRecordDao;

import java.util.*;
import java.util.stream.Collectors;

@Bean
public class ClientRecordRegisterImpl implements ClientRecordRegister {

//  public BeanGetter<ClientRecordDao> clientRecordDao;
    ClientPageData clientPageData = new ClientPageData();
    ClientRecordsAndDetails clientRecordsAndDetails = new ClientRecordsAndDetails();
    public BeanGetter<StandDb> standDb;

    @Override
    public ClientPageData selectAllClientRecords(int page, String sortAttribute, String orderBy, String searchSurname, String searchName, String searchPatronymic, int rows){
        List<ClientRecord> clients = standDb.get().clients;

        System.out.println("GET------------------------Start");

        System.out.println("page "+page);
        System.out.println("attr: "+sortAttribute + " orderBy: " + orderBy);
        System.out.println("surname " + searchSurname + " name: "+searchName + " patronymic: " + searchPatronymic);

        //totalPages

        int elementsPerPage = rows;
        int listSize = standDb.get().getClients().size();
        System.out.println("listsize"+listSize);

        //5000/30=100
        //rem 2000/30 = 60
        //rem 200/30 = 6
        //rem 20 < 30 167p
        int totalPages;
        int totalPagesRemainder;
        if(listSize<elementsPerPage){
            totalPages = 1;
        }else{
            totalPages = listSize/elementsPerPage;
            totalPagesRemainder = listSize%elementsPerPage;
            while(totalPagesRemainder > elementsPerPage) {
                if (totalPagesRemainder > elementsPerPage) {
                    totalPages = totalPages + totalPagesRemainder / elementsPerPage;
                    totalPagesRemainder = totalPagesRemainder%elementsPerPage;
                }
            }
            if (totalPagesRemainder != 0 & totalPagesRemainder < elementsPerPage) {
                totalPages++;
            }

        }

        System.out.println("totalPages"+totalPages);



        //totalPages end


        int last;
        int first;

        page++;


        last = page * elementsPerPage;
        first = last - elementsPerPage;


        System.out.println("first "+first+" last "+last);


        while(listSize<last){
            last--;
        }

        System.out.println("while(...)last-- "+last);

        //sort algorithm asc
        class FullnameCompare implements Comparator<ClientRecord> {
            @Override
            public int compare(ClientRecord o1, ClientRecord o2) {
                return o1.getFIO().compareTo(o2.getFIO());
            }
        }
        class AgeCompare implements Comparator<ClientRecord> {
            @Override
            public int compare(ClientRecord o1, ClientRecord o2) {
                return o1.getAge() - o2.getAge();
            }
        }
        class TotalCompare implements Comparator<ClientRecord> {
            @Override
            public int compare(ClientRecord o1, ClientRecord o2) {
                return o1.getTotal_cash_remainings() - o2.getTotal_cash_remainings();
            }
        }
        class MaxCompare implements Comparator<ClientRecord> {
            @Override
            public int compare(ClientRecord o1, ClientRecord o2) {
                return o1.getMax_remainings() - o2.getMax_remainings();
            }
        }
        class MinCompare implements Comparator<ClientRecord> {
            @Override
            public int compare(ClientRecord o1, ClientRecord o2) {
                return o1.getMin_remainings() - o2.getMin_remainings();
            }
        }

        //sort algorithm desc
        class FullnameDescCompare implements Comparator<ClientRecord> {
            @Override
            public int compare(ClientRecord o1, ClientRecord o2) {
                return o2.getFIO().compareTo(o1.getFIO());
            }
        }
        class AgeDescCompare implements Comparator<ClientRecord> {
            @Override
            public int compare(ClientRecord o1, ClientRecord o2) {
                return o2.getAge() - o1.getAge();
            }
        }
        class TotalDescCompare implements Comparator<ClientRecord> {
            @Override
            public int compare(ClientRecord o1, ClientRecord o2) {
                return o2.getTotal_cash_remainings() - o1.getTotal_cash_remainings();
            }
        }
        class MaxDescCompare implements Comparator<ClientRecord> {
            @Override
            public int compare(ClientRecord o1, ClientRecord o2) {
                return o2.getMax_remainings() - o1.getMax_remainings();
            }
        }
        class MinDescCompare implements Comparator<ClientRecord> {
            @Override
            public int compare(ClientRecord o1, ClientRecord o2) {
                return o2.getMin_remainings() - o1.getMin_remainings();
            }
        }




        List<ClientRecord> filteredClients = new ArrayList<>();

        if(!searchSurname.isEmpty() || !searchName.isEmpty() || !searchPatronymic.isEmpty()){
            //filtered

            //filter
            for(int i = 0; i < standDb.get().getClients().size();i++){
                if(!(standDb.get().getClients().get(i).getFIO().split(" ")[0].isEmpty()) && !searchSurname.equals("")) {
                    if (standDb.get().getClients().get(i).getFIO().split(" ")[0].contains(searchSurname)) {
                        if(!filteredClients.contains(standDb.get().getClients().get(i))){
                            filteredClients.add(standDb.get().getClients().get(i));
                        }

                        System.out.println(i+"is match to the filter ");
                    }
                }
                if(!(standDb.get().getClients().get(i).getFIO().split(" ").length < 2) && !searchName.equals("")) {
                    if (standDb.get().getClients().get(i).getFIO().split(" ")[1].contains(searchName)) {
                        if(!filteredClients.contains(standDb.get().getClients().get(i))){
                            System.out.println(standDb.get().getClients().get(i).getFIO());
                            filteredClients.add(standDb.get().getClients().get(i));
                        }
                    }
                }
                if(!(standDb.get().getClients().get(i).getFIO().split(" ").length<3) && !searchPatronymic.equals("")) {
                    if (standDb.get().getClients().get(i).getFIO().split(" ")[2].contains(searchPatronymic)) {
                        if(!filteredClients.contains(standDb.get().getClients().get(i))){
                            filteredClients.add(standDb.get().getClients().get(i));
                        }
                    }
                }
            }
            //filter end

            //sort by
            if(orderBy.equals("asc")) {
                if (sortAttribute.equals("fullname")) {
                    FullnameCompare fullnameCompare = new FullnameCompare();
                    Collections.sort(filteredClients, fullnameCompare);
                } else if (sortAttribute.equals("age")) {
                    AgeCompare fullnameCompare = new AgeCompare();
                    Collections.sort(filteredClients, fullnameCompare);
                } else if (sortAttribute.equals("total_cash_remainings")) {
                    TotalCompare fullnameCompare = new TotalCompare();
                    Collections.sort(filteredClients, fullnameCompare);
                } else if (sortAttribute.equals("max_cash_remainings")) {
                    MaxCompare fullnameCompare = new MaxCompare();
                    Collections.sort(filteredClients, fullnameCompare);
                } else if (sortAttribute.equals("min_cash_remainings")) {
                    MinCompare fullnameCompare = new MinCompare();
                    Collections.sort(filteredClients, fullnameCompare);
                }
            }else if(orderBy.equals("desc")){
                if (sortAttribute.equals("fullname")) {
                    FullnameDescCompare fullnameDescCompare = new FullnameDescCompare();
                    Collections.sort(filteredClients, fullnameDescCompare);
                } else if (sortAttribute.equals("age")) {
                    AgeDescCompare ageDescCompare = new AgeDescCompare();
                    Collections.sort(filteredClients, ageDescCompare);
                } else if (sortAttribute.equals("total_cash_remainings")) {
                    TotalDescCompare totalDescCompare = new TotalDescCompare();
                    Collections.sort(filteredClients, totalDescCompare);
                } else if (sortAttribute.equals("max_cash_remainings")) {
                    MaxDescCompare maxDescCompare = new MaxDescCompare();
                    Collections.sort(filteredClients, maxDescCompare);
                } else if (sortAttribute.equals("min_cash_remainings")) {
                    MinDescCompare minDescCompare = new MinDescCompare();
                    Collections.sort(filteredClients, minDescCompare);
                }
            }//sort by end

            System.out.println("size filt "+ filteredClients.size());
            System.out.println("first: "+ first + " last: " + last);



            System.out.println("listsize "+listSize);

            //5000/30=100
            //rem 2000/30 = 60
            //rem 200/30 = 6
            //rem 20 < 30 167p
            if(filteredClients.size()<elementsPerPage){
                totalPages = 1;
            }else{
                totalPages = filteredClients.size()/elementsPerPage;
                totalPagesRemainder = filteredClients.size()%elementsPerPage;
                while(totalPagesRemainder > elementsPerPage) {
                    if (totalPagesRemainder > elementsPerPage) {
                        totalPages = totalPages + totalPagesRemainder / elementsPerPage;
                        totalPagesRemainder = totalPagesRemainder%elementsPerPage;
                    }
                }
                if (totalPagesRemainder != 0 & totalPagesRemainder < elementsPerPage) {
                    totalPages++;
                }

            }

            System.out.println("totalPages"+totalPages);



            //totalPages end
            if(page > totalPages){
                page = 1;
            }
            last = page * elementsPerPage;
            first = last - elementsPerPage;



            while(filteredClients.size()<last){
                last--;
            }

            //pageData
            standDb.get().setClientsToDisplay(filteredClients.subList(first,last));
            clientPageData.setClientsToDisplay(filteredClients.subList(first,last));
            //clientPageData.setFirstElement(first);
            //clientPageData.setLastElement(last);

            totalPages = filteredClients.size()/elementsPerPage;
            totalPagesRemainder = filteredClients.size()%elementsPerPage;
            while(totalPagesRemainder > elementsPerPage) {
                if (totalPagesRemainder > elementsPerPage) {
                    totalPages = totalPages + totalPagesRemainder / elementsPerPage;
                    totalPagesRemainder = totalPagesRemainder%elementsPerPage;
                }
            }
            if (totalPagesRemainder != 0 & totalPagesRemainder < elementsPerPage) {
                totalPages++;
            }

            System.out.println("total pages: "+totalPages);
            standDb.get().setTotalPages(totalPages);
            standDb.get().setTotalElements(filteredClients.size());
            System.out.println("size filt "+filteredClients.size());

            //pageData
            clientPageData.setTotalPages(totalPages);
            clientPageData.setTotalElements(filteredClients.size());


        }//filtered end
        else {
            //unfiltered
            if (orderBy.equals("asc")) {
                if (sortAttribute.equals("fullname")) {
                    FullnameCompare fullnameCompare = new FullnameCompare();
                    Collections.sort(standDb.get().getClients(), fullnameCompare);
                } else if (sortAttribute.equals("age")) {
                    AgeCompare fullnameCompare = new AgeCompare();
                    Collections.sort(standDb.get().getClients(), fullnameCompare);
                } else if (sortAttribute.equals("total_cash_remainings")) {
                    TotalCompare fullnameCompare = new TotalCompare();
                    Collections.sort(standDb.get().getClients(), fullnameCompare);
                } else if (sortAttribute.equals("max_cash_remainings")) {
                    MaxCompare fullnameCompare = new MaxCompare();
                    Collections.sort(standDb.get().getClients(), fullnameCompare);
                } else if (sortAttribute.equals("min_cash_remainings")) {
                    MinCompare fullnameCompare = new MinCompare();
                    Collections.sort(standDb.get().getClients(), fullnameCompare);
                }
            } else if (orderBy.equals("desc")) {
                if (sortAttribute.equals("fullname")) {
                    FullnameDescCompare fullnameDescCompare = new FullnameDescCompare();
                    Collections.sort(standDb.get().getClients(), fullnameDescCompare);
                } else if (sortAttribute.equals("age")) {
                    AgeDescCompare ageDescCompare = new AgeDescCompare();
                    Collections.sort(standDb.get().getClients(), ageDescCompare);
                } else if (sortAttribute.equals("total_cash_remainings")) {
                    TotalDescCompare totalDescCompare = new TotalDescCompare();
                    Collections.sort(standDb.get().getClients(), totalDescCompare);
                } else if (sortAttribute.equals("max_cash_remainings")) {
                    MaxDescCompare maxDescCompare = new MaxDescCompare();
                    Collections.sort(standDb.get().getClients(), maxDescCompare);
                } else if (sortAttribute.equals("min_cash_remainings")) {
                    MinDescCompare minDescCompare = new MinDescCompare();
                    Collections.sort(standDb.get().getClients(), minDescCompare);
                }
            }

            System.out.println("first: " + first + " last: " + last);
            if(first <= listSize){
                standDb.get().setClientsToDisplay(standDb.get().getClients().subList(first,last));
            }

            standDb.get().setClients(standDb.get().getClients());
            standDb.get().setFirstElement(first);
            standDb.get().setLastElement(last);
            standDb.get().setTotalPages(totalPages);
            standDb.get().setTotalElements(standDb.get().getClients().size());
            System.out.println("sizee"+standDb.get().getClients().size());

            //pageData
            clientPageData.setTotalPages(totalPages);
            clientPageData.setTotalElements(standDb.get().getClients().size());
            clientPageData.setClients(standDb.get().getClients());
            if(first <= listSize){
                clientPageData.setClientsToDisplay(standDb.get().getClients().subList(first,last));
            }
            clientPageData.setFirstElement(first);
            clientPageData.setLastElement(last);

        }


        System.out.println("GET------------------------END");




        return clientPageData;

    }

    @Override
    public String deleteClientRecord(int id,int rows) {
        System.out.println();
        System.out.println("Delete--------------START");
        System.out.println("size "+standDb.get().getClients().size());
        standDb.get().getClients().removeIf(obj -> obj.id == id);
        standDb.get().clientDetails.removeIf(obj -> obj.id == id);

        //totalPages

        int elementsPerPage = rows;
        int listSize = standDb.get().getClients().size();
        System.out.println("listsize "+listSize);

        //5000/30=100
        //rem 2000/30 = 60
        //rem 200/30 = 6
        //rem 20 < 30 167p
        int totalPages;
        int totalPagesRemainder;
        if(listSize<elementsPerPage){
            totalPages = 1;
        }else{
            totalPages = listSize/elementsPerPage;
            totalPagesRemainder = listSize%elementsPerPage;
            while(totalPagesRemainder > elementsPerPage) {
                if (totalPagesRemainder > elementsPerPage) {
                    totalPages = totalPages + totalPagesRemainder / elementsPerPage;
                    totalPagesRemainder = totalPagesRemainder%elementsPerPage;
                }
            }
            if (totalPagesRemainder != 0 & totalPagesRemainder < elementsPerPage) {
                totalPages++;
            }

        }

        System.out.println("totalPages"+totalPages);



        //totalPages end

        standDb.get().setTotalPages(totalPages);
        standDb.get().setTotalElements(listSize);
        System.out.println("Delete--------------END");
        System.out.println();
        return "Ok";
    }

    @Override
    public String addClientRecord(ClientRecord clientRecord, ClientDetails clientDetails) {
        System.out.println("Adding client-----------------------------");

        //get id of last
        int id = standDb.get().getClients().get(standDb.get().getClients().size()-1).id + 1;

        standDb.get().getClients().add(new ClientRecord(id,clientRecord.FIO,clientRecord.character,clientRecord.age,
                clientRecord.total_cash_remainings,clientRecord.max_remainings,clientRecord.min_remainings));

        //Fill ClientDetails
            standDb.get().clientDetails.add(new ClientDetails());
            standDb.get().clientDetails.get(standDb.get().clientDetails.size()-1).id = id;
            standDb.get().clientDetails.get(standDb.get().clientDetails.size()-1).setGender(clientDetails.getGender());
            standDb.get().clientDetails.get(standDb.get().clientDetails.size()-1).setDateOfBirth(clientDetails.getDateOfBirth());
            standDb.get().clientDetails.get(standDb.get().clientDetails.size()-1).setClientAddress(clientDetails.getClientAddress());

            //check optional fields
            if(clientDetails.getRegisteredAddress().getRegisteredStreet() == "") {

                clientDetails.getRegisteredAddress().setRegisteredStreet("");

            }if(clientDetails.getRegisteredAddress().getRegisteredHouse() == "") {

                clientDetails.getRegisteredAddress().setRegisteredHouse("");

            }if(clientDetails.getRegisteredAddress().getRegisteredFlatNumber() == "") {

                clientDetails.getRegisteredAddress().setRegisteredFlatNumber("");

            }

            standDb.get().clientDetails.get(standDb.get().clientDetails.size()-1).setRegisteredAddress(clientDetails.getRegisteredAddress());

            System.out.println(clientDetails.getPhoneNumbers().size());

            //check list which has optional fields
            for(int i = 0; i < clientDetails.getPhoneNumbers().size(); i++) {

                if (clientDetails.getPhoneNumbers().get(i).getPhoneNumber() != "") {

                    standDb.get().clientDetails.get(standDb.get().clientDetails.size() - 1).getPhoneNumbers().add(
                            new ClientPhoneNumber(i, clientDetails.getPhoneNumbers().get(i).getPhoneNumber(), clientDetails.getPhoneNumbers().get(i).getPhoneType()));

                }

            }


        System.out.println(standDb.get().clientDetails.get(standDb.get().clientDetails.size()-1));
        //end of fill ClientDetails

        System.out.println("-------------------------------------------");

        return "Ok";
    }


    @Override
    public String editClientRecord(ClientRecord clientRecord, ClientDetails clientDetails) {

        System.out.println("EDITING CLIENT-------------------------");


        List<ClientRecord> beerDrinkers = standDb.get().getClients().stream()
                .filter(c -> c.id == clientRecord.id).collect(Collectors.toList());
        int listIndex = standDb.get().getClients().indexOf(beerDrinkers.get(0));


        //Update Clients
        standDb.get().getClients().set(listIndex,clientRecord);

        //check list which has optional fields
        for(int i = 0; i < clientDetails.getPhoneNumbers().size(); i++) {

            if (clientDetails.getPhoneNumbers().get(i).getPhoneNumber() != "") {

                standDb.get().clientDetails.get(listIndex).getPhoneNumbers().set(
                        i, new ClientPhoneNumber(i, clientDetails.getPhoneNumbers().get(i).getPhoneNumber(), clientDetails.getPhoneNumbers().get(i).getPhoneType()));

            }

        }

        //check optional fields
        if(clientDetails.getRegisteredAddress().getRegisteredStreet() == "") {

            clientDetails.getRegisteredAddress().setRegisteredStreet("");

        }if(clientDetails.getRegisteredAddress().getRegisteredHouse() == "") {

            clientDetails.getRegisteredAddress().setRegisteredHouse("");

        }if(clientDetails.getRegisteredAddress().getRegisteredFlatNumber() == "") {

            clientDetails.getRegisteredAddress().setRegisteredFlatNumber("");

        }




        System.out.println("beerDrinkers size--" + beerDrinkers.size());
        System.out.println("beerDrinkers[0]: " + beerDrinkers.get(0).getFIO());

        //Update ClientDetails
        standDb.get().clientDetails.set(listIndex,clientDetails);

        System.out.println("After editing "+standDb.get().clientDetails.get(listIndex));
        System.out.println("--------------------------------------------");

        return "ok";
    }


}

