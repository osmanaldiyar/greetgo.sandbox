package kz.greetgo.sandbox.controller.controller;

import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.mvc.annotations.Par;
import kz.greetgo.mvc.annotations.ToJson;
import kz.greetgo.mvc.annotations.on_methods.ControllerPrefix;
import kz.greetgo.mvc.annotations.on_methods.OnPost;
import kz.greetgo.sandbox.controller.model.ClientRecord;
import kz.greetgo.sandbox.controller.register.ClientRecordRegister;
import kz.greetgo.sandbox.controller.security.PublicAccess;
import kz.greetgo.sandbox.controller.util.Controller;

import java.util.List;

@Bean
@ControllerPrefix("/task")
public class ClientRecordController implements Controller {

    public BeanGetter<ClientRecordRegister> clientRecordRegister;

    @PublicAccess
    @ToJson
    @OnPost("/clients-list")
    public List<ClientRecord> clientsList() {
        return clientRecordRegister.get().selectAllClientRecords();
    }

}