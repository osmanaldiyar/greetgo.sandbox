package kz.greetgo.sandbox.controller.register;

import kz.greetgo.sandbox.controller.model.ClientPageData;
import kz.greetgo.sandbox.controller.model.ClientRecord;

import java.util.List;

public interface ClientRecordRegister {

    ClientPageData selectAllClientRecords(int page,String sortAttribute, String orderBy,String searchSurname,String searchName,String searchPatronymic);
    //void deleteClientRecord(ClientRecord clientRecord);

}
