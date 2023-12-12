# What is the Bridge Pattern?

The Bridge Pattern is a design pattern used to separate the abstraction from its implementation, allowing them to be developed independently. This pattern involves an interface which acts as a bridge between the abstraction and its implementation, making them loosely coupled.

## Simple Example in Python

Consider a software application with a user interface that needs to support different themes (like dark mode, light mode, etc.) without mixing the theme logic with the UI logic.

```python
# The Implementor (Themes):
class Theme:
    def get_color(self):
        pass

class DarkTheme(Theme):
    def get_color(self):
        return "Dark colors"

class LightTheme(Theme):
    def get_color(self):
        return "Light colors"

# The Abstraction (User Interface):
class UserInterface:
    def __init__(self, theme):
        self.theme = theme

    def display(self):
        pass

class Toolbar(UserInterface):
    def display(self):
        print(f"Toolbar with {self.theme.get_color()}")

class Menu(UserInterface):
    def display(self):
        print(f"Menu with {self.theme.get_color()}")

# Using the Bridge:

dark_theme = DarkTheme()
light_theme = LightTheme()

toolbar = Toolbar(dark_theme)
toolbar.display()  # Output: Toolbar with Dark colors

menu = Menu(light_theme)
menu.display()  # Output: Menu with Light colors
```

In this example, UserInterface (with its subclasses Toolbar and Menu) acts as the abstraction, and Theme (with its subclasses DarkTheme and LightTheme) acts as the implementor. The UserInterface class uses composition to include a theme, and its display method uses this theme to determine its appearance.

## Pros:

- Flexibility: The UI can change or add new themes without altering its core functionality.
- Scalability: New UI elements or themes can be added without affecting existing code.
- Maintainability: Separating UI and theme logic makes the code more maintainable.
- Extensibility: It's easy to extend the application with new themes or UI components.

## Cons:

- Complexity: Increases complexity due to the creation of more classes.
- Overhead: More objects in memory can lead to a slight performance overhead.
- Initial Setup: More effort is required for the initial setup of the pattern.
