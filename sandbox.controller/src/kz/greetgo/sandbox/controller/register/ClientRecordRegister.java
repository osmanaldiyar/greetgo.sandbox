package kz.greetgo.sandbox.controller.register;

import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.sandbox.controller.model.*;

import java.util.Date;
import java.util.List;

public interface ClientRecordRegister {

    ClientPageData selectAllClientRecords(int page, String sortAttribute, String orderBy, String searchSurname, String searchName, String searchPatronymic, int rows);
    //void deleteClientRecord(ClientRecord clientRecord);

    String deleteClientRecord(int id,int rows);


    String addClientRecord(ClientRecord clientRecord, ClientDetails clientDetails);


    String editClientRecord(ClientRecord clientRecord, ClientDetails clientDetails);

    List<ClientTemp> selectSomething();


}
