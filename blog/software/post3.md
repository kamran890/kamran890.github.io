# Understanding SOLID Principles: A Simple Guide

SOLID principles are a set of design principles in software engineering that enable developers to create more maintainable, understandable, and flexible software.

## Single Responsibility Principle (SRP)

A class should have only one reason to change, meaning it should focus solely on a single aspect of functionality, ensuring that each class addresses a specific concern or responsibility.

**Bad Example:**

```python
class UserManagement:
    def __init__(self, user_name):
        self.user_name = user_name

    def save_user_to_database(self):
        print(f"User {self.user_name} saved to database")

    def send_user_email(self):
        print(f"Email sent to {self.user_name}")

```

**Problem:**

The UserManagement class is handling both database operations and email sending functionalities. This violates SRP as the class has more than one reason to change (user database management and email communication).

**Fixed Example:**

```python
class User:
    def __init__(self, user_name):
        self.user_name = user_name

class UserDatabase:
    def save_user(self, user: User):
        print(f"User {user.user_name} saved to database")

class EmailService:
    def send_email(self, user: User):
        print(f"Email sent to {user.user_name}")
```

**Explanation:**

In the fixed example, responsibilities are divided among three classes: User for user information, UserDatabase for database operations, and EmailService for handling emails.


## Open/Closed Principle (OCP)

Software entities like classes, modules, functions, etc., should be open for extension but closed for modification, implying that they should be designed to allow their behavior to be extended without modifying their source code.

**Bad Example:**

```python
class ReportGenerator:
    def generate(self, report_type):
        if report_type == "PDF":
            return "Generating PDF report"
        elif report_type == "Excel":
            return "Generating Excel report"
```

**Problem:**

The ReportGenerator class has to be modified every time a new report type is introduced, which violates the OCP.
Fixed Example:

```python
class ReportGenerator:
    def generate(self):
        raise NotImplementedError

class PDFReportGenerator(ReportGenerator):
    def generate(self):
        return "Generating PDF report"

class ExcelReportGenerator(ReportGenerator):
    def generate(self):
        return "Generating Excel report"
```

**Explanation:**

The fixed version allows new report types to be added without modifying the existing classes, thus adhering to the OCP.

## Liskov Substitution Principle (LSP)

Subtypes or derived classes should be substitutable for their base classes or interfaces without altering the correctness or expected behavior of the program, ensuring that a class and its derived classes can be used interchangeably without errors.

**Bad Example:**

```python
class Bird:
    def fly(self):
        pass

class Duck(Bird):
    def fly(self):
        return "Flying"

class Ostrich(Bird):
    def fly(self):
        raise NotImplementedError("Cannot fly")
```

**Problem:**

The Ostrich class, a subclass of Bird, cannot use the fly method, violating the LSP.

**Fixed Example:**

```python
class Bird:
    pass

class FlyingBird(Bird):
    def fly(self):
        pass

class Duck(FlyingBird):
    def fly(self):
        return "Flying"

class Ostrich(Bird):
    pass
```

**Explanation:**

By creating a separate FlyingBird class, we ensure that all subclasses of FlyingBird can fly, adhering to LSP.

## Interface Segregation Principle (ISP)

Clients should not be forced to depend upon interfaces that they do not use, advocating for creating specific interfaces towards specific client needs rather than one general-purpose interface.

**Bad Example:**

Imagine a multifunction printer that can print, scan, and fax. If we represent these functionalities in a single interface, it forces the implementing classes to define all methods, even if they're not needed.

```python
class IMultifunctionDevice:
    def print(self, document):
        pass

    def scan(self, document):
        pass

    def fax(self, document):
        pass

class PrinterScanner(IMultifunctionDevice):
    def print(self, document):
        print(f"Printing: {document}")

    def scan(self, document):
        print(f"Scanning: {document}")

    def fax(self, document):
        raise NotImplementedError("Fax not supported")
```

**Problem:**

The PrinterScanner class is forced to implement the fax method, even though it doesn't support faxing. This violates ISP.

**Fixed Example:**

We can segregate the IMultifunctionDevice interface into smaller, more specific interfaces. This allows implementing classes to only focus on the functionalities they support.

```python
class IPrinter:
    def print(self, document):
        pass

class IScanner:
    def scan(self, document):
        pass

class IFax:
    def fax(self, document):
        pass

class Printer(IPrinter):
    def print(self, document):
        print(f"Printing: {document}")

class Scanner(IScanner):
    def scan(self, document):
        print(f"Scanning: {document}")

class PrinterScanner(IPrinter, IScanner):
    def print(self, document):
        print(f"Printing: {document}")

    def scan(self, document):
        print(f"Scanning: {document}")
```

**Explanation:**

In this improved design, each class only implements the interfaces relevant to its functionality. Printer implements IPrinter, Scanner implements IScanner, and PrinterScanner implements both IPrinter and IScanner. None of the classes are forced to implement methods they don't need, adhering to the Interface Segregation Principle. This makes the system more flexible and easier to maintain, as each class focuses only on the functionalities it is meant to provide.


## Dependency Inversion Principle (DIP)

High-level modules should not depend on low-level modules; both should depend on abstractions, and abstractions should not depend upon details, but details should depend upon abstractions, promoting a decoupling of software modules and making the system more flexible and adaptable to change.

**Bad Example:**

```python
class MySQLDatabase:
    def connect(self):
        print("Connection to MySQL Database")

class DataManager:
    def __init__(self):
        self.database = MySQLDatabase()

    def save_data(self, data):
        self.database.connect()
        print(f"Saving {data}")
```

**Problem:**

The DataManager class is directly dependent on a specific MySQLDatabase class. If you need to switch to a different database, you have to modify the DataManager class, which violates DIP.

**Fixed Example:**

```python
from abc import ABC, abstractmethod

class Database(ABC):
    @abstractmethod
    def connect(self):
        pass

class MySQLDatabase(Database):
    def connect(self):
        print("Connection to MySQL Database")

class PostgreSQLDatabase(Database):
    def connect(self):
        print("Connection to PostgreSQL Database")

class DataManager:
    def __init__(self, database: Database):
        self.database = database

    def save_data(self, data):
        self.database.connect()
        print(f"Saving {data}")
```

**Explanation:**

In the fixed example, DataManager now depends on an abstract Database class rather than a concrete MySQLDatabase class. This way, DataManager can work with any database that adheres to the Database interface (like MySQLDatabase or PostgreSQLDatabase), without needing to change its code. This adheres to DIP by depending on abstractions (the Database interface) rather than concrete implementations (MySQLDatabase or PostgreSQLDatabase). This makes DataManager more flexible and easier to maintain, as it can easily adapt to different databases.
