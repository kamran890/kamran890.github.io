# What is the Mediator Pattern?

The Mediator Pattern is a behavioral design pattern that focuses on enhancing communication between objects in a system. It promotes loose coupling by preventing objects from referring to each other explicitly and allows their interaction to be managed by a central point of control, the mediator.

Consider a chat room where users send messages to each other. Instead of users communicating directly, a chat room (mediator) manages the messages.

```python
# The Mediator (Chat Room)
class ChatRoom:
    def display_message(self, user, message):
        print(f"[{user}]: {message}")

# The Objects (Users)
class User:
    def __init__(self, name, chat_room):
        self.name = name
        self.chat_room = chat_room

    def send_message(self, message):
        self.chat_room.display_message(self.name, message)

# Using the Mediator:
chat_room = ChatRoom()

john = User("John", chat_room)
jane = User("Jane", chat_room)

john.send_message("Hi, there!")
jane.send_message("Hey, John!")
```

In this example, ChatRoom acts as a mediator between User objects. Users don't communicate directly with each other but through the ChatRoom mediator.

## Pros:

- Reduced Complexity: Centralizes complex communications and control logic between objects, simplifying maintenance and interactions.
- Decoupled Components: Reduces dependencies among components, making them more reusable.
- Simplified Object Protocols: Objects don't need complex and numerous methods to communicate with each other.

Cons:

- Mediator Overload: The mediator can become a god object, centralizing too much functionality.
- Complexity in Mediator Logic: The logic in the mediator can become overly complex, making it a bottleneck.
- Potential for Indirect Dependencies: While direct dependencies are reduced, changes in one component might still affect others indirectly through the mediator.
