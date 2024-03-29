package sample;

public class ElectronicMoneyMain {

  public static void main(String[] args) {
    String action = null;
    int amount = 0;
    String to = null;
    String from = null;
    String id = null;

    for (int i = 0; i < args.length; ++i) {
      if ("-action".equals(args[i])) {
        action = args[++i];
      } else if ("-amount".equals(args[i])) {
        amount = Integer.parseInt(args[++i]);
      } else if ("-to".equals(args[i])) {
        to = args[++i];
      } else if ("-from".equals(args[i])) {
        from = args[++i];
      } else if ("-id".equals(args[i])) {
        id = args[++i];
      } else if ("-help".equals(args[i])) {
        printUsageAndExit();
        return;
      }
    }

    if (action == null) {
      printUsageAndExit();
      return;
    }

    ElectronicMoney eMoney = new ElectronicMoney();

    if (action.equalsIgnoreCase("charge")) {
      if (to == null || amount < 0) {
        printUsageAndExit();
        return;
      }
      eMoney.charge(to, amount);
    } else if (action.equalsIgnoreCase("pay")) {
      if (to == null || amount < 0 || from == null) {
        printUsageAndExit();
        return;
      }
      eMoney.pay(from, to, amount);
    } else if (action.equalsIgnoreCase("getBalance")) {
      if (id == null) {
        printUsageAndExit();
        return;
      }
      int balance = eMoney.getBalance(id);
      System.out.println("The balance for " + id + " is " + balance);
    }
    eMoney.close();
  }

  private static void printUsageAndExit() {
    System.err.println(
        "ElectronicMoneyMain -action charge/pay/getBalance [-amount number (needed for charge and pay)] [-to id (needed for charge and pay)] [-from id (needed for pay)] [-id id (needed for getBalance)]");
    System.exit(1);
  }
}
