# Understanding the Factory Design Pattern in Python

The Factory Method Pattern encapsulates the object creation process by defining an interface for generating objects, thereby separating the instantiation from the client code.


## Simple Example in python:

```python
class Shape:
    def draw(self):
        pass

class Circle(Shape):
    def draw(self):
        print("Drawing a Circle")

class Square(Shape):
    def draw(self):
        print("Drawing a Square")

class Rectangle(Shape):
    def draw(self):
        print("Drawing a Rectangle")

class ShapeFactory:
    def create_shape(self, shape_type):
        if shape_type == "Circle":
            return Circle()
        elif shape_type == "Square":
            return Square()
        else:
            raise ValueError("Unknown Shape type")

# Client code
factory = ShapeFactory()

user_shape = input("Enter shape")
shape1 = factory.create_shape(user_shape)
shape1.draw()
```

## Problem Solved

1. The above example demonstrates dynamic, user input-driven object creation, enhancing runtime flexibility and adaptability in shape creation.

2. Extending the code with new shapes involves only changes to the factory, not the client code, streamlining maintenance and scalability.
