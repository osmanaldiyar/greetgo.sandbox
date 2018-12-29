package kz.greetgo.sandbox.controller.model;

public class ClientRecord {

    public String FIO;
    public String character;
    public int age;
    public int total_cash_remainings;
    public int max_remainings;
    public int min_remainings;


    public ClientRecord(String FIO, String character, int age, int total_cash_remainings, int max_remainings, int min_remainings) {
        this.FIO = FIO;
        this.character = character;
        this.age = age;
        this.total_cash_remainings = total_cash_remainings;
        this.max_remainings = max_remainings;
        this.min_remainings = min_remainings;
    }
}
