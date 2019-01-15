package kz.greetgo.sandbox.controller.controller;

import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.mvc.annotations.Json;
import kz.greetgo.mvc.annotations.Par;
import kz.greetgo.mvc.annotations.ToJson;
import kz.greetgo.mvc.annotations.on_methods.OnDelete;
import kz.greetgo.mvc.annotations.on_methods.OnGet;
import kz.greetgo.mvc.annotations.on_methods.OnPost;
import kz.greetgo.sandbox.controller.model.*;
import kz.greetgo.sandbox.controller.register.ClientRecordRegister;
import kz.greetgo.sandbox.controller.security.PublicAccess;
import kz.greetgo.sandbox.controller.util.Controller;

import java.util.Date;
import java.util.List;

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
    public String addClientRecord(@Par("clientRecord") @Json ClientRecord clientRecord, @Par("clientDetails") @Json ClientDetails clientDetails) {
        return clientRecordRegister.get().addClientRecord(clientRecord, clientDetails);
    }

    @PublicAccess
    @ToJson
    @OnPost("/list/edit")
    public String editClientRecord(@Par("clientRecord") @Json ClientRecord clientRecord, @Par("clientDetails") @Json ClientDetails clientDetails) {
        return clientRecordRegister.get().editClientRecord(clientRecord, clientDetails);
    }

    @PublicAccess
    @ToJson
    @OnGet("/list/smth")
    public List<ClientTemp> selectSomething() {
        return clientRecordRegister.get().selectSomething();
    }



}
