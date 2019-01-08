package kz.greetgo.sandbox.controller.register;

import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.sandbox.controller.model.ClientPageData;

public interface ClientRecordRegister {

    ClientPageData selectAllClientRecords(int page, String sortAttribute, String orderBy, String searchSurname, String searchName, String searchPatronymic, int rows);
    //void deleteClientRecord(ClientRecord clientRecord);

    String deleteClientRecord(int id);

    String addClientRecord(String FIO, int age, String character, int total_cash_rem, int max_cash_rem, int min_cash_rem);

    String editClientRecord(int id,String FIO, int age, String character, int total_cash_rem, int max_cash_rem, int min_cash_rem);
}
