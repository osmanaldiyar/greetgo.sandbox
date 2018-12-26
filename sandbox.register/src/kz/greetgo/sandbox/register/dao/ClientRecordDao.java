package kz.greetgo.sandbox.register.dao;

import kz.greetgo.sandbox.controller.model.ClientRecord;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface ClientRecordDao {

    @Select("SELECT * FROM sampletable WHERE condition1>1 AND condition2>2 LIMIT 0,20")
    List<ClientRecord> selectAllClientRecords();
}