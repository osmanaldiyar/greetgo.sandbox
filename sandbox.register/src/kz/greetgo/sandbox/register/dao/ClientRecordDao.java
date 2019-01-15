package kz.greetgo.sandbox.register.dao;

import kz.greetgo.sandbox.controller.model.ClientPageData;
import kz.greetgo.sandbox.controller.model.ClientRecord;
import kz.greetgo.sandbox.controller.model.ClientTemp;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface ClientRecordDao {

    @Select("select client.id, client.surname||' '||client.name||' '||client.patronymic as FIO, client.gender, client.birth_date as dateOfBirth," +
            " charm.name as character from client inner join charm on client.charm = charm.id")
    List<ClientTemp> selectSomething();

}
