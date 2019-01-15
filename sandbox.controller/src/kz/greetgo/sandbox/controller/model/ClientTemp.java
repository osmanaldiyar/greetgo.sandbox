package kz.greetgo.sandbox.controller.model;


import java.sql.Date;

public class ClientTemp {

    public int id;
    public String FIO;
    public String character;
    public Date dateOfBirth;
    public int total_cash_remainings;
    public int max_remainings;
    public int min_remainings;

    public ClientTemp() {
    }

    public ClientTemp(String FIO, String character, Date dateOfBirth, int total_cash_remainings, int max_remainings, int min_remainings) {
        this.FIO = FIO;
        this.character = character;
        this.dateOfBirth = dateOfBirth;
        this.total_cash_remainings = total_cash_remainings;
        this.max_remainings = max_remainings;
        this.min_remainings = min_remainings;
    }

    public ClientTemp(int id, String FIO, String character, Date dateOfBirth, int total_cash_remainings, int max_remainings, int min_remainings) {
        this.id = id;
        this.FIO = FIO;
        this.character = character;
        this.dateOfBirth = dateOfBirth;
        this.total_cash_remainings = total_cash_remainings;
        this.max_remainings = max_remainings;
        this.min_remainings = min_remainings;
    }

    public String getFIO() {
        return FIO;
    }

    public void setFIO(String FIO) {
        this.FIO = FIO;
    }

    public String getCharacter() {
        return character;
    }

    public void setCharacter(String character) {
        this.character = character;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public int getTotal_cash_remainings() {
        return total_cash_remainings;
    }

    public void setTotal_cash_remainings(int total_cash_remainings) {
        this.total_cash_remainings = total_cash_remainings;
    }

    public int getMax_remainings() {
        return max_remainings;
    }

    public void setMax_remainings(int max_remainings) {
        this.max_remainings = max_remainings;
    }

    public int getMin_remainings() {
        return min_remainings;
    }

    public void setMin_remainings(int min_remainings) {
        this.min_remainings = min_remainings;
    }

}
