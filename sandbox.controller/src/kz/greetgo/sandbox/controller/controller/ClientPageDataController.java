package kz.greetgo.sandbox.controller.controller;

import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.mvc.annotations.Par;
import kz.greetgo.mvc.annotations.ToJson;
import kz.greetgo.mvc.annotations.on_methods.OnDelete;
import kz.greetgo.mvc.annotations.on_methods.OnGet;
import kz.greetgo.mvc.annotations.on_methods.OnPost;
import kz.greetgo.sandbox.controller.model.ClientPageData;
import kz.greetgo.sandbox.controller.register.ClientRecordRegister;
import kz.greetgo.sandbox.controller.security.PublicAccess;
import kz.greetgo.sandbox.controller.util.Controller;

import java.util.Date;

@Bean
public class ClientPageDataController implements Controller {

    public BeanGetter<ClientRecordRegister> clientRecordRegister;

    @PublicAccess
    @ToJson
    @OnGet("/list")
    public ClientPageData clientPageData(@Par("page") int page, @Par("sortAttribute") String sortAttribute, @Par("orderBy") String orderBy,
                                         @Par("searchSurname") String searchSurname, @Par("searchName") String searchName,
                                         @Par("searchPatronymic") String searchPatronymic,@Par("rows") int rows) {
        return clientRecordRegister.get().selectAllClientRecords(page, sortAttribute, orderBy,searchSurname,searchName,searchPatronymic,rows);
    }

    @PublicAccess
    @ToJson
    @OnDelete("/list")
    public String deleteClientRecord(@Par("id") int id,@Par("rows") int rows) {
        return clientRecordRegister.get().deleteClientRecord(id,rows);
    }

    @PublicAccess
    @ToJson
    @OnPost("/list/add")
    public String addClientRecord(@Par("FIO") String FIO, @Par("age") int age, @Par("character") String character,
                                  @Par("total_cash_rem") int total_cash_rem,@Par("max_cash_rem") int max_cash_rem,
                                  @Par("min_cash_rem") int min_cash_rem, @Par("gender") String gender, @Par("dateOfBirth") Date dateOfBirth,
                                  @Par("street") String street, @Par("house") String house, @Par("flatNumber") String flatNumber,
                                  @Par("registeredStreet") String registeredStreet, @Par("registeredHouse") String registeredHouse,
                                  @Par("registeredFlatNumber") String registeredFlatNumber, @Par("phoneNumber1") String phoneNumber1,
                                  @Par("phoneNumber2") String phoneNumber2, @Par("phoneNumber3")  String phoneNumber3,
                                  @Par("phoneNumber4")  String phoneNumber4,
                                  @Par("phoneNumber5") String phoneNumber5,
                                  @Par("phoneType2") String phoneType2, @Par("phoneType3")  String phoneType3,
                                  @Par("phoneType4")  String phoneType4,
                                  @Par("phoneType5") String phoneType5) {
        return clientRecordRegister.get().addClientRecord(FIO,age,character,total_cash_rem, max_cash_rem, min_cash_rem,
                gender, dateOfBirth, street, house, flatNumber, registeredStreet, registeredHouse, registeredFlatNumber,
                phoneNumber1, phoneNumber2, phoneNumber3, phoneNumber4, phoneNumber5, phoneType2, phoneType3,
                phoneType4, phoneType5);
    }

    @PublicAccess
    @ToJson
    @OnPost("/list/edit")
    public String editClientRecord(@Par("id") int id,@Par("FIO") String FIO, @Par("age") int age, @Par("character") String character,
                                   @Par("total_cash_rem") int total_cash_rem,@Par("max_cash_rem") int max_cash_rem,@Par("min_cash_rem") int min_cash_rem,
                                   @Par("gender") String gender, @Par("dateOfBirth") Date dateOfBirth,
                                   @Par("street") String street, @Par("house") String house, @Par("flatNumber") String flatNumber,
                                   @Par("registeredStreet") String registeredStreet, @Par("registeredHouse") String registeredHouse,
                                   @Par("registeredFlatNumber") String registeredFlatNumber, @Par("phoneNumber1") String phoneNumber1,
                                   @Par("phoneNumber2") String phoneNumber2, @Par("phoneNumber3")  String phoneNumber3,
                                   @Par("phoneNumber4")  String phoneNumber4,
                                   @Par("phoneNumber5") String phoneNumber5, @Par("phoneType2") String phoneType2,
                                   @Par("phoneType3")  String phoneType3, @Par("phoneType4")  String phoneType4, @Par("phoneType5") String phoneType5) {
        return clientRecordRegister.get().editClientRecord(id,FIO,age,character,total_cash_rem, max_cash_rem, min_cash_rem,gender, dateOfBirth, street, house, flatNumber, registeredStreet, registeredHouse, registeredFlatNumber,
                phoneNumber1, phoneNumber2, phoneNumber3, phoneNumber4, phoneNumber5, phoneType2, phoneType3, phoneType4, phoneType5);
    }

}
