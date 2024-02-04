# What is the Strategy Pattern?

The Strategy Pattern is a behavioral design pattern that enables selecting an algorithm's behavior at runtime. By defining a family of algorithms, encapsulating each one, and making them interchangeable, the Strategy Pattern allows for dynamically changing the behavior of an application.

## Simple Example in Python

Consider a payment processing system where different payment methods require different processing algorithms.


```python
# Strategy Interface:
class PaymentStrategy:
    def process_payment(self, amount):
        raise NotImplementedError("Subclass must implement this method")

# Concrete Strategies:
class CreditCardPayment(PaymentStrategy):
    def process_payment(self, amount):
        print(f"Processing ${amount} via Credit Card")

class PayPalPayment(PaymentStrategy):
    def process_payment(self, amount):
        print(f"Processing ${amount} via PayPal")

class BitcoinPayment(PaymentStrategy):
    def process_payment(self, amount):
        print(f"Processing ${amount} in Bitcoin")

# Context (Payment Processor):
class PaymentProcessor:
    def __init__(self, strategy: PaymentStrategy):
        self.strategy = strategy

    def execute_payment(self, amount):
        self.strategy.process_payment(amount)

# Using the Strategy Pattern:
amount = 100

# Using Credit Card Payment
credit_card_payment = CreditCardPayment()
processor = PaymentProcessor(credit_card_payment)
processor.execute_payment(amount)  # Processing $100 via Credit Card

# Switching to PayPal Payment
paypal_payment = PayPalPayment()
processor.strategy = paypal_payment
processor.execute_payment(amount)  # Processing $100 via PayPal

# Switching to Bitcoin Payment
bitcoin_payment = BitcoinPayment()
processor.strategy = bitcoin_payment
processor.execute_payment(amount)  # Processing $100 in Bitcoin
```

In this example, PaymentProcessor is the context class, and CreditCardPayment, PayPalPayment, and BitcoinPayment are concrete strategies. The strategy can be changed at runtime depending on the requirement.

## Pros:

- Flexibility: Allows for easily switching between different algorithms or behaviors dynamically.
- Decoupling: The client is decoupled from the implementation details of the algorithms.
- Extendability: New strategies can be introduced without modifying the context.

## Cons:

- Complexity: Can increase the number of classes and the overall complexity of the code.
- Understanding: Requires a deeper understanding for clients to choose the appropriate strategy.
- Overhead: If not used wisely, can introduce unnecessary overhead, particularly for simple scenarios.
