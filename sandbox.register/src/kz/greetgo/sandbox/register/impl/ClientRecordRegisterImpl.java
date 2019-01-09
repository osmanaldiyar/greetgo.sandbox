package kz.greetgo.sandbox.register.impl;

import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.sandbox.controller.model.ClientPageData;
import kz.greetgo.sandbox.controller.model.ClientRecord;
import kz.greetgo.sandbox.controller.register.ClientRecordRegister;
import kz.greetgo.sandbox.register.dao.ClientRecordDao;

import java.util.*;
import java.util.stream.Collectors;

@Bean
public class ClientRecordRegisterImpl implements ClientRecordRegister {

    public BeanGetter<ClientRecordDao> clientRecordDao;
    ClientPageData clientPageData = new ClientPageData();
    public BeanGetter<StandDb> standDb;

    @Override
    public ClientPageData selectAllClientRecords(int page, String sortAttribute, String orderBy, String searchSurname, String searchName, String searchPatronymic, int rows){
        List<ClientRecord> clients = standDb.get().clients;

        System.out.println("GET------------------------Start");

        System.out.println("page "+page);
        System.out.println("attr: "+sortAttribute + " orderBy: " + orderBy);
        System.out.println("surname " + searchSurname + " name: "+searchName + " patronymic: " + searchPatronymic);

        //list;
        //clientPageData.setClients(clientRecordDao.get().selectAllClientRecords());

        //list
        /*clients = new ArrayList<>();
        clients.add(new ClientRecord("Pushkin","good",110,46,150,16550));
        clients.add(new ClientRecord("Lermontov","nice",111,50,150,16440));
        clients.add(new ClientRecord("Tolstoi","simple",22,47,150,16230));
        clients.add(new ClientRecord("Kamu","angry",143,430,150,16330));


        clients.add(new ClientRecord("Gogol","bad",10,40324,154320,164230));
        clients.add(new ClientRecord("Esenin Alex","unknown",190,3450,423150,1604));
        clients.add(new ClientRecord("Mayakovskii","good",610,123,154230,1640));
        clients.add(new ClientRecord("Dekster","good",210,60040,142350,1630));


        clients.add(new ClientRecord("Max Frai","good",310,434000,123450,123460));
        clients.add(new ClientRecord("Coelio","good",150,4234230,123450,1650));
        clients.add(new ClientRecord("Iung","good",55,23440,123450,16560));
        clients.add(new ClientRecord("Lewis","good",18,423420,123450,1562360));

        clients.add(new ClientRecord("Esenin Aleksandr","bad",310,434000,123450,123460));
        clients.add(new ClientRecord("Esenin Evgenii","evil",150,4234230,123450,1650));
        clients.add(new ClientRecord("Esenin Petr","normal",55,23440,123450,16560));
        clients.add(new ClientRecord("Esenin Maksim","hero",18,423420,123450,1562360));
*/
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

            //clientPageData.setClients(filteredClients.subList(first,last));
            standDb.get().setClientsToDisplay(filteredClients.subList(first,last));

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

        }


        System.out.println("GET------------------------END");

        clientPageData.setTotalPages(totalPages);
        clientPageData.setTotalElements(standDb.get().getClients().size());
        clientPageData.setClients(standDb.get().getClients());
        clientPageData.setClientsToDisplay(standDb.get().getClients().subList(first,last));
        clientPageData.setFirstElement(first);
        clientPageData.setLastElement(last);


        return clientPageData;

    }

    @Override
    public String deleteClientRecord(int id) {
        System.out.println();
        System.out.println("Delete--------------START");
        System.out.println("size "+standDb.get().getClients().size());
        standDb.get().getClients().removeIf(obj -> obj.id == id);

        //totalPages

        int elementsPerPage = 4;
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
    public String addClientRecord(String FIO,int age, String character, int total_cash_rem,int max_cash_rem,int min_cash_rem) {
        System.out.println(FIO);
        System.out.println(age);
        System.out.println(character);
        System.out.println(total_cash_rem);
        System.out.println(max_cash_rem);
        System.out.println(min_cash_rem);

        int id = standDb.get().getClients().size()-1;

        standDb.get().getClients().add(new ClientRecord(id,FIO,character,age,total_cash_rem,max_cash_rem,min_cash_rem));

        return "ok";
    }


    @Override
    public String editClientRecord(int id,String FIO,int age, String character, int total_cash_rem,int max_cash_rem,int min_cash_rem) {
        System.out.println("id ---"+id);
        System.out.println(FIO);
        System.out.println(age);
        System.out.println(character);
        System.out.println(total_cash_rem);
        System.out.println(max_cash_rem);
        System.out.println(min_cash_rem);


        //remove

        //findId

        //add

        standDb.get().getClients().set(id,new ClientRecord(id,FIO,character,age,total_cash_rem,max_cash_rem,min_cash_rem));
/*
        if(FIO != ""){
            standDb.get().getClients().get(id).setFIO(FIO);
        }if(character != "") {
            standDb.get().getClients().get(id).setCharacter(character);
        }if(total_cash_rem != 0){
            standDb.get().getClients().get(id).setTotal_cash_remainings(total_cash_rem);
        }if(max_cash_rem != 0){
            standDb.get().getClients().get(id).setMax_remainings(max_cash_rem);
        }if(min_cash_rem != 0){
            standDb.get().getClients().get(id).setMin_remainings(min_cash_rem);
        }if(age != 0){
            standDb.get().getClients().get(id).setAge(age);
        }*/
        return "ok";
    }
}

