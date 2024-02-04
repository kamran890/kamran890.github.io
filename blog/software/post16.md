# What are Interfaces and Abstract Classes

## Interfaces

An interface is like a contract for a class. It specifies a set of methods that the implementing class must define.

```python
from abc import ABC, abstractmethod

class VehicleInterface(ABC):

    @abstractmethod
    def start_engine(self):
        pass

    @abstractmethod
    def stop_engine(self):
        pass

class Car(VehicleInterface):

    def start_engine(self):
        return "Car engine started"

    def stop_engine(self):
        return "Car engine stopped"
```

**Why Use Interfaces?**

- Consistency: Ensures that all classes implementing the interface adhere to a certain structure.
- Flexibility and Scalability: Makes your code more flexible and scalable, as new classes can be created adhering to the interface.

## Abstract Class

An abstract class is similar to an interface but can include some implemented methods. It cannot be instantiated and often serves as a base class.

```python
from abc import ABC, abstractmethod

class AbstractVehicle(ABC):
    
    def __init__(self, color):
        self.color = color

    @abstractmethod
    def stop_engine(self):
        pass

    def start_engine(self):
        return "Engine started"

class Car(AbstractVehicle):

    def stop_engine(self):
        return f"Car with color {self.color} stopped its engine"
```

**Why Use Abstract Classes?**

- Partial Implementation: Provides a way to define a base class with some common implementation.
- Mandatory Methods: Forces subclasses to implement specific methods.
