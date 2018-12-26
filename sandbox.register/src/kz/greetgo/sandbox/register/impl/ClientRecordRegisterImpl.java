package kz.greetgo.sandbox.register.impl;

import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.sandbox.controller.model.ClientRecord;
import kz.greetgo.sandbox.controller.register.ClientRecordRegister;
import kz.greetgo.sandbox.register.dao.ClientRecordDao;

import java.util.List;

@Bean
public class ClientRecordRegisterImpl implements ClientRecordRegister {

    public BeanGetter<ClientRecordDao> clientRecordDao;

    @Override
    public List<ClientRecord> selectAllClientRecords() {
        return clientRecordDao.get().selectAllClientRecords();
    }
}
