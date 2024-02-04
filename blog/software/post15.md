# Object-Oriented Relationships: Unraveling the Complexities

Object-oriented programming (OOP) several relationships to handle complexity and reuse code. Let's dive into some of these key relationships: Inheritance, Composition, Aggregation, Subtyping, and Delegation.


<p align="center">
  <img src="../images/blog/relationships/relations_uml.png" style="width:50%;" alt="relations_uml"/>
  <br>
</p>
<p align="center">
  <details>
    <summary style="text-align: center; display: block; font-style: italic;">Figure 1: Object-Oriented Relationships</summary>

    ```classDiagram
    class Vehicle {
        <<abstract>>
    }
    class Car {
        Engine engine
        delegateMaintenance()
    }
    class Bicycle {
    }
    class Engine {
    }
    class Library {
        Book[] books
    }
    class Book {
    }
    class Office {
        Printer printer
        delegatePrinting()
    }
    class Printer {
        print(document)
    }
    class Maintenance {
        performMaintenance()
    }

    Vehicle <|-- Car : Inheritance
    Vehicle <|-- Bicycle : Inheritance
    Car *-- Engine : Composition
    Library o-- Book : Aggregation
    Car ..> Maintenance : Delegation
    Office ..> Printer : Delegation
    ```

  </details>
</p>

## Inheritance

Inheritance is a mechanism where a new class (derived class) inherits the features from an existing class (base class). This relationship provides a way to create a new class from an existing 

```python
class Animal:
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Bark!"

# Usage
dog = Dog()
print(dog.speak())  # Outputs: Bark!
```

**Why to Use**

- Reusability: Avoids redundancy by using existing class features.
- Extensibility: Easy to extend existing functionality.
- Hierarchical structure: Represents real-world relationships.

## Composition

Composition is a design technique in OOP where a class is composed of one or more objects of other classes.

```python
class Engine:
    def start(self):
        return "Engine starts"

class Car:
    def __init__(self):
        self.engine = Engine()

    def start(self):
        return self.engine.start()

# Usage
car = Car()
print(car.start())  # Outputs: Engine starts
```

**Why to Use**

- Strong Relationship: Indicates a strong relationship between the composing object and the component.
- Encapsulation: Encapsulates behavior in separate objects.
- Flexibility: Easily replace or change components.


## Aggregation

In aggregation, the child object can exist independently of the parent. For instance, a book can exist without a library, and a library doesn't necessarily own the books it contains.

```python
class Book:
    def __init__(self, title):
        self.title = title

class Library:
    def __init__(self):
        self.books = []

    def addBook(self, book):
        self.books.append(book)

    def getTitles(self):
        return [book.title for book in self.books]

# Usage
library = Library()
book1 = Book("1984")
book2 = Book("To Kill a Mockingbird")

library.addBook(book1)
library.addBook(book2)

print(library.getTitles())  # Outputs: ['1984', 'To Kill a Mockingbird']
```

**Why to Use Aggregation**

- Individual Lifecycles: Books can exist without being part of a library, emphasizing their independent lifecycle.
- Weak Ownership: The library doesn't have strict ownership of the books, meaning the books are not destroyed when the library is.
- Flexibility: Books can be part of more than one library, demonstrating flexibility in relationships.

## Subtyping

Subtyping, often used interchangeably with inheritance in OOP, is the concept where a subtype is substitutable for its supertype.

```python
class Bird:
    def fly(self):
        pass

class Sparrow(Bird):
    def fly(self):
        return "Flying"

# Usage
def letItFly(bird: Bird):
    print(bird.fly())

sparrow = Sparrow()
letItFly(sparrow)  # Outputs: Flying
```

**Why to Use**

- Polymorphism: Enables polymorphism where the interface remains constant but the underlying implementation can vary.
- Interchangeability: Subtypes can be substituted without affecting the correctness of the program.

## Delegation

Delegation is a technique where an object expresses certain behavior but actually forwards responsibility of implementing that behavior to an associated object.

```python
class Printer:
    def print(self, document):
        return f"Printing: {document}"

class Office:
    def __init__(self):
        self.printer = Printer()

    def printDocument(self, document):
        return self.printer.print(document)

# Usage
office = Office()
print(office.printDocument("Report"))  # Outputs: Printing: Report
```

**Why to Use**

- Simplicity: Simplifies objects by delegating complex tasks.
- Reusability: Promotes reusability by using functionality from other classes.
- Loose Coupling: Achieves loose coupling between classes.
