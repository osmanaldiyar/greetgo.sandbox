package kz.greetgo.sandbox.controller.register;

import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.sandbox.controller.model.ClientPageData;

import java.util.Date;

public interface ClientRecordRegister {

    ClientPageData selectAllClientRecords(int page, String sortAttribute, String orderBy, String searchSurname, String searchName, String searchPatronymic, int rows);
    //void deleteClientRecord(ClientRecord clientRecord);

    String deleteClientRecord(int id);

    String addClientRecord(String FIO, int age, String character, int total_cash_rem, int max_cash_rem, int min_cash_rem,
                           String gender, Date dateOfBirth, String street, String house, String flatNumber, String registeredStreet,
                           String registeredHouse, String registeredFlatNumber, String phoneNumber1, String phoneNumber2,
                           String phoneNumber3, String phoneNumber4, String phoneNumber5);

    String editClientRecord(int id,String FIO, int age, String character, int total_cash_rem, int max_cash_rem, int min_cash_rem,
                            String gender, Date dateOfBirth, String street, String house, String flatNumber, String registeredStreet,
                            String registeredHouse, String registeredFlatNumber, String phoneNumber1, String phoneNumber2,
                            String phoneNumber3, String phoneNumber4, String phoneNumber5);
}
