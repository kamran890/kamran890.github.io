# MVC (Model-View-Controller)

MVC is a design pattern that divides an application into three main components:

- Model: Contains business logic and data.
- View: Presents information to the user.
- Controller: Interfaces between View and Model, handling user input and updating the Model.

## Implementation Option 1: Passive Model in MVC


<p align="center">
  <img src="../images/blog/mvc/passive_mvc.png" style="width:30%;" alt="passive_mvc"/>
  <br>
</p>
<p align="center">
  <details>
    <summary style="text-align: center; display: block; font-style: italic;">Figure 1: Passive MVC</summary>

    ```mermaid
    graph LR
        A[Controller] -- Manipulate Data --> B[Model]
        B -- Data/Response --> A
        A -- Trigger Update --> C[View]
        C -- Request Data --> B
        C -- User Action --> A
    ```

  </details>
</p>

**Simple Example in Python:**

```python
class Model:
    def __init__(self):
        self.data = "Initial Data"

    def get_data(self):
        return self.data

    def set_data(self, new_data):
        self.data = new_data

class View:
    def __init__(self, model):
        self.model = model

    def display(self):
        data = self.model.get_data()
        print(f"Current Data: {data}")

    def update(self):
        # This method simulates the View pulling new data from the Model
        self.display()

class Controller:
    def __init__(self, model, view):
        self.model = model
        self.view = view

    def update_model(self, new_data):
        self.model.set_data(new_data)
        self.view.update()  # Notify the view to pull updates

# Usage
model = Model()
view = View(model)
controller = Controller(model, view)

# Simulating user input
controller.update_model("Updated Data")

```

**Pros/Cons:**

- Pros: Simplifies the Model, making it straightforward and focused on data processing.
- Cons: The Controller can become complex as it handles both user input and triggering update for views.


## Implementation Option 1: Pull MVC (Semi-active Model)

<p align="center">
  <img src="../images/blog/mvc/semi_active_mvc.png" style="width:30%;" alt="semi_active_mvc"/><br>
</p>

<p align="center">
  <details>
    <summary style="text-align: center; display: block; font-style: italic;">Figure 2: Semi Active MVC</summary>

    ```mermaid
    graph LR
        A[View] -- Request Update --> B[Controller]
        B -- Manipulate Data --> C[Model]
        C -- Notify Change --> A
        A -- Fetch Data --> C
    ```

  </details>
</p>

**Simple Example in Python:**

```python
class Model:
    def __init__(self):
        self.data = "Initial Data"
        self.observers = []  # List of observers, typically Views

    def get_data(self):
        return self.data

    def set_data(self, new_data):
        self.data = new_data
        self.notify_observers()

    def register_observer(self, observer):
        self.observers.append(observer)

    def notify_observers(self):
        for observer in self.observers:
            observer.update()

class View:
    def __init__(self, model):
        self.model = model
        model.register_observer(self)

    def display(self):
        data = self.model.get_data()
        print(f"Current Data: {data}")

    def update(self):
        self.display()

class Controller:
    def __init__(self, model):
        self.model = model

    def update_model(self, new_data):
        self.model.set_data(new_data)

# Usage
model = Model()
view = View(model)
controller = Controller(model)

# Simulating user input
controller.update_model("Updated Data")

```

**Pros/Cons:**

- Pros: Allows optimization of updates in the View.
- Cons: Might result in frequent and unnecessary requests to the Model if not managed properly.


## Implementation Option 2: Push MVC (Active Model)

<p align="center">
  <img src="../images/blog/mvc/active_mvc.png" style="width:30%;" alt="active_mvc"/><br>
</p>

<p align="center">
  <details>
    <summary style="text-align: center; display: block; font-style: italic;">Figure 3: Active MVC</summary>

    ```mermaid
    graph LR
        A[View] -- User Action --> B[Controller]
        B -- Update Data --> C[Model]
        C -- Push Data --> A
    ```

  </details>
</p>


**Simple Example in Python:**

```python
class Model:
    def __init__(self, view):
        self.data = "Initial Data"
        self.view = view

    def set_data(self, new_data):
        self.data = new_data
        self.view.display(self.data)

class View:
    def display(self, data):
        print(f"Current Data: {data}")

class Controller:
    def __init__(self, model):
        self.model = model

    def update_model(self, new_data):
        self.model.set_data(new_data)

# Usage
view = View()
model = Model(view)
controller = Controller(model)

# Simulating user input
controller.update_model("Updated Data")

```

**Pros/Cons:**

- Pros: Real-time updates in the View without the need for requesting data.
- Cons: Can lead to overloading the View with updates, especially if data changes frequently.
