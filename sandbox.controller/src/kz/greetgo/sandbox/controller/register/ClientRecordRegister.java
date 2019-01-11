package kz.greetgo.sandbox.controller.register;

import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.sandbox.controller.model.ClientDetails;
import kz.greetgo.sandbox.controller.model.ClientPageData;
import kz.greetgo.sandbox.controller.model.ClientRecord;
import kz.greetgo.sandbox.controller.model.ClientRecordsAndDetails;

import java.util.Date;

public interface ClientRecordRegister {

    ClientPageData selectAllClientRecords(int page, String sortAttribute, String orderBy, String searchSurname, String searchName, String searchPatronymic, int rows);
    //void deleteClientRecord(ClientRecord clientRecord);

    String deleteClientRecord(int id,int rows);


    String addClientRecord(ClientRecord clientRecord, ClientDetails clientDetails);


    String editClientRecord(ClientRecord clientRecord, ClientDetails clientDetails);

    //for editing
    ClientRecordsAndDetails selectClientRecordsAndDetails(int id);

}
