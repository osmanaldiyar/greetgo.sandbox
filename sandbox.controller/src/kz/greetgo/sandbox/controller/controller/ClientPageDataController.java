package kz.greetgo.sandbox.controller.controller;

import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.mvc.annotations.Par;
import kz.greetgo.mvc.annotations.ToJson;
import kz.greetgo.mvc.annotations.on_methods.OnDelete;
import kz.greetgo.mvc.annotations.on_methods.OnGet;
import kz.greetgo.mvc.annotations.on_methods.OnPost;
import kz.greetgo.sandbox.controller.model.ClientDetails;
import kz.greetgo.sandbox.controller.model.ClientPageData;
import kz.greetgo.sandbox.controller.model.ClientRecord;
import kz.greetgo.sandbox.controller.register.ClientRecordRegister;
import kz.greetgo.sandbox.controller.security.PublicAccess;
import kz.greetgo.sandbox.controller.util.Controller;

import java.util.List;

@Bean
public class ClientPageDataController implements Controller {

    public BeanGetter<ClientRecordRegister> clientRecordRegister;

    @PublicAccess
    @ToJson
    @OnGet("/list")
    public ClientPageData clientPageData(@Par("page") int page, @Par("sortAttribute") String sortAttribute, @Par("orderBy") String orderBy,
                                         @Par("searchSurname") String searchSurname,@Par("searchName") String searchName,@Par("searchPatronymic") String searchPatronymic) {
        return clientRecordRegister.get().selectAllClientRecords(page, sortAttribute, orderBy,searchSurname,searchName,searchPatronymic);
    }

    @PublicAccess
    @ToJson
    @OnDelete("/list")
    public String deleteClientRecord(@Par("id") int id) {
        return clientRecordRegister.get().deleteClientRecord(id);
    }

    @PublicAccess
    @ToJson
    @OnPost("/list/add")
    public String addClientRecord(@Par("FIO") String FIO, @Par("age") int age, @Par("character") String character,
                                  @Par("total_cash_rem") int total_cash_rem,@Par("max_cash_rem") int max_cash_rem,@Par("min_cash_rem") int min_cash_rem) {
        return clientRecordRegister.get().addClientRecord(FIO,age,character,total_cash_rem, max_cash_rem, min_cash_rem);
    }

}
