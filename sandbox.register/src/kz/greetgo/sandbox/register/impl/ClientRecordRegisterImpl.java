package kz.greetgo.sandbox.register.impl;

import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.sandbox.controller.model.ClientPageData;
import kz.greetgo.sandbox.controller.model.ClientRecord;
import kz.greetgo.sandbox.controller.register.ClientRecordRegister;
import kz.greetgo.sandbox.register.dao.ClientRecordDao;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Bean
public class ClientRecordRegisterImpl implements ClientRecordRegister {

    public BeanGetter<ClientRecordDao> clientRecordDao;

    @Override
    public ClientPageData selectAllClientRecords(int page) {



        ClientPageData clientPageData = new ClientPageData();

        //list;
        //clientPageData.setClients(clientRecordDao.get().selectAllClientRecords());

        List<ClientRecord> clients = new ArrayList<>();

        clients.add(new ClientRecord("Pushkin","good",110,46,150,16550));
        clients.add(new ClientRecord("Lermontov","nice",111,50,150,16440));
        clients.add(new ClientRecord("Tolstoi","simple",22,47,150,16230));
        clients.add(new ClientRecord("Kamu","angry",143,430,150,16330));


        clients.add(new ClientRecord("Gogol","bad",10,40324,154320,164230));
        clients.add(new ClientRecord("Esenin","unknown",190,3450,423150,1604));
        clients.add(new ClientRecord("Mayakovskii","good",610,123,154230,1640));
        clients.add(new ClientRecord("Dekster","good",210,60040,142350,1630));


        clients.add(new ClientRecord("Max Frai","good",310,434000,123450,123460));
        clients.add(new ClientRecord("Coelio","good",150,4234230,123450,1650));
        clients.add(new ClientRecord("Iung","good",55,23440,123450,16560));
        clients.add(new ClientRecord("Lewis","good",18,423420,123450,1562360));



        System.out.println("pageeeeee " + page);

        clientPageData.setClients(clients);

        //list.totalElements;
        //clientPageData.setTotalElements(clientRecordDao.get().selectAllClientRecords().size());
        clientPageData.setTotalElements(clients.size());

        //pageSize;
        int pageSize = 4;

        //totalPages = totalElements/pageSize;
        //clientPageData.setTotalPages(clientRecordDao.get().selectAllClientRecords().size()/pageSize);
        clientPageData.setTotalPages(clients.size()/pageSize);

        return clientPageData;
    }
}
