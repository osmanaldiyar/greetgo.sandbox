package kz.greetgo.sandbox.controller.register;

import kz.greetgo.sandbox.controller.model.ClientDetails;
import kz.greetgo.sandbox.controller.model.ClientPageData;
import kz.greetgo.sandbox.controller.model.ClientRecord;

import java.util.List;

public interface ClientRecordRegister {

    ClientPageData selectAllClientRecords(int page,String sortAttribute, String orderBy,String searchSurname,String searchName,String searchPatronymic);
    //void deleteClientRecord(ClientRecord clientRecord);

    String deleteClientRecord(int id);

    String addClientRecord(String FIO, int age, String character, int total_cash_rem, int max_cash_rem, int min_cash_rem);

}
