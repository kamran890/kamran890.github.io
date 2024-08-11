I’m excited to introduce my latest project, Smart Rule Engine, a generative AI-powered rule engine that leverages the advanced capabilities of GPT-4 to provide a seamless, chat-based interface for managing rule engines in IoT platforms. Currently, Smart Rule Engine integrates with Thingsboard, a popular IoT platform, with plans to support additional platforms in the near future.

Smart Rule Engine will be offered as a SaaS-based service soon, hosted on the cloud. Users can easily sign up, integrate their IoT platforms, and begin managing their rule engines, all through a simple and intuitive chat interface.

## How It Works

* Sign-Up & Integration:

    While signing up, users can connect their IoT platform to Smart Rule Engine. The tool automatically pulls relevant data from the platform, including information about connected devices and the parameters those devices can control.

    <p align="center">
        <img src="../images/blog/smart-rule-engine/signup.png" style="width:50%;" alt="signup"/><br>
        <i>Figure 1: Sign up & Integration</i>
    </p>


* Login:

    Once registered, users can log in and access the chat interface.

    <p align="center">
        <img src="../images/blog/smart-rule-engine/login.png" style="width:50%;" alt="login"/><br>
        <i>Figure 2: Login</i>
    </p>

* Chat Interface:

    The core of Smart Rule Engine is its chat-based management system. Through this interface, users can effortlessly manage their rule engines. For example, users can ask the system to list all existing rule engines, create new ones, or modify or delete existing ones.

    <p align="center">
        <img src="../images/blog/smart-rule-engine/chat.png" style="width:50%;" alt="chat"/><br>
        <i>Figure 3: Chat Interface for Rule Engine</i>
    </p>

## Current Progress

Significant progress has been made, including:

* Signup and platform integration: Creating tenant and adding integration.

* Puling data from IoT platform: A task manager for running periodic task that pull data from the connected IoT platform. This process retrieves information about devices and their parameters at regular intervals, ensuring that the data within Smart Rule Engine reflects the current state of the IoT platform environment.

* AI Integration: Integrating GPT-4 and prompt engineering

* Rule Engine Management: Creating, modifying, and deleting rule engines through the chat interface. Smart Rule Engine understands user intent with the help of GPT-4 and perform actions accordingly.

* Data Subscrition: Subscribing to devices data from IoT platform over websockets.

* Rule Chain Execution. Running all rule chains and performing actions based on rule chain logic.

* Triggering device's parameters: Based on rule chain, updating devices parameters/attributes.


## Use Case: Controlling an HVAC System

* Creating Rule Chain:

    Consider a typical use case for controlling an HVAC system. A user might want to create a rule that controls the heating and cooling systems based on room temperature. For example:

    User Prompt:
    <blockquote>
        If the temperature in Meeting Room 1 is 2 degrees below the setpoint, turn on the heating mode and activate the heating relay for the HVAC system. If the temperature is 2 degrees above the setpoint, switch to cooling mode and activate the cooling relay. Otherwise, turn off both the heating and cooling relays. The setpoint is 73 degrees.
    </blockquote>

    If any information is missing, the system will prompt the user for the necessary details. Once all the information is provided, Smart Rule Engine will rephrase the rule and ask the user for confirmation to ensure the intent is correctly captured. Upon confirmation, the rule is created and activated.

    <p align="center">
        <img src="../images/blog/smart-rule-engine/create.png" style="width:50%;" alt="create"/><br>
        <i>Figure 4: Generate Rule Chain</i>
    </p>

    Evaluating above rule chain by simulating device. Through following script, temperature is simulated as 70 degrees.

    <p align="center">
        <img src="../images/blog/smart-rule-engine/simulate_temperature_70.png" style="width:50%;" alt="simulate_temperature_70"/><br>
        <i>Figure 5: Simulating temperature as 70 degrees</i>
    </p>

    We know that based on rule chain we created, heating shall be turned on. Let's see in Thingsboard.

    <p align="center">
        <img src="../images/blog/smart-rule-engine/thingsboard_heating.png" style="width:50%;" alt="thingsboard_heating"/><br>
        <i>Figure 6: Meeting Room 1 Device on Thingsboard</i>
    </p>

    We can see in above figure that Heat Relay of Meeting 1 is turned on.

    Similarly through following script, temperature is simulated as 76 degrees.

    <p align="center">
        <img src="../images/blog/smart-rule-engine/simulate_temperature_76.png" style="width:50%;" alt="simulate_temperature_76"/><br>
        <i>Figure 7: Simulating temperature as 76 degrees</i>
    </p>

    We know that based on rule chain we created, now cooling shall be turned on. Let's see in Thingsboard.

    <p align="center">
        <img src="../images/blog/smart-rule-engine/thingsboard_cooling.png" style="width:50%;" alt="thingsboard_cooling"/><br>
        <i>Figure 8: Meeting Room 1 Device on Thingsboard</i>
    </p>

    We can see in above figure that Cool Relay of Meeting 1 is turned on.

* Listing Rule Chains

    Use can ask tool to list all the existing rule chains

    User Prompt:
    <blockquote>
        list all rule chains
    </blockquote>


    <p align="center">
        <img src="../images/blog/smart-rule-engine/list.png" style="width:50%;" alt="list"/><br>
        <i>Figure 9: List Rule Chains</i>
    </p>

* Updating Rule Chain

    Now the above created rule chain can be modified by simply asking the tool.

    User Prompt:
    <blockquote>
        Modify setpoint to 75 degrees in HVAC rule chain
    </blockquote>


    <p align="center">
        <img src="../images/blog/smart-rule-engine/update.png" style="width:50%;" alt="update"/><br>
        <i>Figure 10: Update Rule Chain</i>
    </p>

* Deleting Rule Chain

    Now if the user no longer need this rule chain. They can ask to remove it.

    User Prompt:
    <blockquote>
        Remove HVAC rule chain
    </blockquote>


    <p align="center">
        <img src="../images/blog/smart-rule-engine/delete.png" style="width:50%;" alt="delete"/><br>
        <i>Figure 11: Delete Rule Chain</i>
    </p>


## Current challenges

While GPT-4 is a powerful tool for understanding and generating natural language responses, it can occasionally produce inconsistent results. At times, the responses might not accurately capture the user’s intent, leading to exceptions or misunderstandings. Even when GPT-4 correctly interprets and rephrases the intent, it might not always generate the correct JSON schema required for rule creation.

To address this challenge, I am focusing on two key areas: prompt engineering and fine-tuning.

Prompt Engineering involves crafting and refining the prompts provided to GPT-4 to guide its responses more effectively. By carefully designing system prompt, we can improve the AI’s ability to understand user prompts better. This process includes experimenting with different phrasing, context-setting, and directive language to optimize the AI's performance.

Fine-Tuning is another critical strategy I am exploring. By training the model on specific data sets related to IoT platforms and rule engine management, the ability of AI can be improved to generate precise and reliable JSON schemas and better understand user intent.

## Future Work

Looking ahead, several enhancements and extensions are planned:

* Multi-Parameter Triggers: Creation of rules based on multiple input sources. For example, triggering a relay based on multiple sensors.

* Unit and Data Type Resolution: Developing strategies to handle cases where IoT platforms don’t provide units or data types. (e.g., determining whether "1," "ON," or "true" activates a relay).

* Edge Case Handling: Addressing situations where GPT-4 might not fully understand user intent.

* Expanding Capabilities: Exploring possibilities to extend Smart Rule Engine’s functionality to include reporting, device provisioning, dashboard creation, and ultimately controlling the entire IoT platform through the chat interface.


## Contributing to project

This is an open-source project, contributions are most welcome:

* Code Contributions: Submit patches to enhance existing features, add new ones, or fix bugs.
* Bug Reports: Help us improve by reporting issues you encounter. Please provide as much detail as possible.
* Patch Reviews: Review and provide feedback on other contributors' patches to ensure quality and consistency.

Your contributions, no matter how small, are valued and help make Smart Rule Engine better for everyone

Here is project repo: https://github.com/kamran890/smart-rule-engine
