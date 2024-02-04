# What is the Observer Pattern?

The Observer Pattern involves two key components: a subject and multiple observers. The subject maintains a list of observers, providing a mechanism to add or remove them. When the state of the subject changes, it automatically notifies all observers, typically by calling one of their methods.

## Python Example: Weather Station Monitoring

Consider a weather station that tracks weather data and needs to update multiple display elements whenever the data changes.

```python
# The Subject (Weather Data):
class WeatherData:
    def __init__(self):
        self._observers = []
        self._temperature = 0

    def register_observer(self, observer):
        self._observers.append(observer)

    def remove_observer(self, observer):
        self._observers.remove(observer)

    def notify_observers(self):
        for observer in self._observers:
            observer.update(self._temperature)

    def set_temperature(self, temperature):
        self._temperature = temperature
        self.notify_observers()

# The Observer (Display Elements):
class TemperatureDisplay:
    def update(self, temperature):
        print(f"Temperature Display: Temperature is {temperature}°C")

class ForecastDisplay:
    def __init__(self):
        self._last_temperature = None

    def update(self, temperature):
        forecast = self._generate_forecast(temperature)
        print(f"Forecast Display: {forecast}")
        self._last_temperature = temperature

# Using the Observer Pattern:

weather_data = WeatherData()

temp_display = TemperatureDisplay()
forecast_display = ForecastDisplay()

weather_data.register_observer(temp_display)
weather_data.register_observer(forecast_display)

weather_data.set_temperature(30)  # Updates both displays
```

In this example, WeatherData is the subject, and TemperatureDisplay and ForecastDisplay are observers. When the temperature changes, both displays are updated automatically.

## Pros:

- Loose Coupling: The subject doesn't need to know details about the observers, reducing dependencies.
- Real-Time Updates: Observers can receive and process changes in the subject in real-time.
- Scalability: Easily add new observers without modifying the subject.

## Cons:

- Uncontrolled Updates: Careless use can lead to issues if the state of the subject is changed frequently.
- Memory Considerations: If observers do not unsubscribe effectively, it can lead to memory leaks.
- Complexity: In large systems, managing updates can become complex, especially if observers depend on each other.
