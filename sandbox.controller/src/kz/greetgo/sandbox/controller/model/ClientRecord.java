package kz.greetgo.sandbox.controller.model;

public class ClientRecord {

    public int id;
    public String FIO;
    public String character;
    public int age;
    public int totalCashRemainings;
    public int maxRemainings;
    public int minRemainings;

    public ClientRecord() {
    }

    public ClientRecord(String FIO, String character, int age, int totalCashRemainings, int maxRemainings, int minRemainings) {
        this.FIO = FIO;
        this.character = character;
        this.age = age;
        this.totalCashRemainings = totalCashRemainings;
        this.maxRemainings = maxRemainings;
        this.minRemainings = minRemainings;
    }

    public ClientRecord(int id, String FIO, String character, int age, int totalCashRemainings, int maxRemainings, int minRemainings) {
        this.id = id;
        this.FIO = FIO;
        this.character = character;
        this.age = age;
        this.totalCashRemainings = totalCashRemainings;
        this.maxRemainings = maxRemainings;
        this.minRemainings = minRemainings;
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

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getTotalCashRemainings() {
        return totalCashRemainings;
    }

    public void setTotalCashRemainings(int total_cash_remainings) {
        this.totalCashRemainings = total_cash_remainings;
    }

    public int getMaxRemainings() {
        return maxRemainings;
    }

    public void setMaxRemainings(int maxRemainings) {
        this.maxRemainings = maxRemainings;
    }

    public int getMinRemainings() {
        return minRemainings;
    }

    public void setMinRemainings(int minRemainings) {
        this.minRemainings = minRemainings;
    }
}
