# SENG 401 - Team 1 Project Design Document

## "CommUNIcate"

### Authors
- Ibrahim Wani
- Hamd Khan
- Dominic Gartner
- Alex Mclean
- Armin Sandhu
- Kaylyn Tanton
- Ryan Khryss Obiar

### Contributors
- Esmaeil - TA

## Resources

### Dates
- Document Starting Date: 01-30-2024
- Revision Dates:
  - **Document Version** | **Revision Date** | **Status / Notes**
  - v1.1 | 01-31-2024 | Providing Purpose Component Including background reading material
  - v1.2 | 02-02-2024 | Adding context to project component
  - v1.3 | 02-04-2024 | Added detailed design, including the system's overall architecture, interactions with the system, etc.
  - v1.4 | 02-06-2024 | Wrote about the implementation plan, team organization, and schedule of major tasks
  - Final revisions

## Purpose
The design of CommUNIcate aims to address the need for enhanced communication and meaningful connections within the university environment. By providing a cutting-edge student networking app with features tailored to the unique needs of the academic community, CommUNIcate seeks to create a vibrant and interconnected campus experience. The platform enables students to engage, collaborate, and build relationships through personalized profiles, course-specific discussions, direct messaging, and a general feed for sharing and promoting events. The overall goal is to foster a sense of community, facilitate collaboration, and keep students informed about exciting opportunities on and around campus.

## Background Reading
### Previous Research Papers
| Author | Link to Document | Architectures Researched |
|--------|-------------------|--------------------------|
| Ibrahim Wani | [Research Paper - Ibrahim Wani](Research Paper - Ibrahim Wani) | MVC, Event-Sourcing, Microservices |
| Hamd Khan | [HamdKhanResearchPaper](HamdKhanResearchPaper) | MVC, Event-Sourced, Microservices |
| Dominic Gartner | [SENG 401- Software Architecture](SENG 401- Software Architecture) | MVC, Event-Sourcing, Microservices |
| Alex Mclean | [Research_Paper-Alex_Mclean-30147485](Research_Paper-Alex_Mclean-30147485) | MVC, Event-Sourcing, Microservices |
| Armin Sandhu | [SENG 401 - Software Architecture (Winter 2024) - Armin Sandhu (30143482)](SENG 401 - Software Architecture (Winter 2024) - Armin Sandhu (30143482)) | MVC, Event-Sourced, CQRS |
| Kaylyn Tanton | [SENG 401 - Software Architecture Research Paper](SENG 401 - Software Architecture Research Paper) | MVC, Event-Sourced, CQRS |
| Ryan Khryss Obiar | [401 Research Paper.docx](401 Research Paper.docx) | MVC, Event-Sourced, CQRS |


# Context
Deploying a Microservices architecture in conjunction with the Model-View-Controller (MVC) pattern for our application CommUNIcate represents a strategic choice designed to attain scalability, flexibility, testability, fault isolation, modularity, maintainability, and enhanced user engagement. This approach best contributes and is aligned with our overarching business objectives.

## Model-View-Controller (MVC) Pattern:
The MVC pattern separates the application into three interconnected components: the Model (data and business logic), the View (user interface), and the Controller (handles user input and updates the model and view accordingly). This separation of concerns enhances flexibility, scalability, testability, maintainability and team development.

## Microservices Architecture:
The Microservices architecture involves breaking down a complex application into smaller, independent services that can be developed, deployed, and scaled independently. Each service focuses on a specific business capability and communicates with other services through well-defined APIs. This architecture boosts modularity, scalability, testability, fault isolation and facilitates team collaboration and development.

## Alignment with Business Goals:
- **Scalability:** With this hybrid design, each component can be scaled independently based on demand. This enables CommUNIcate to handle varying levels of traffic, requests and management effectively, ensuring optimal performance during usage lifecycles. Furthermore, we can easily scale to accommodate a growing user base without sacrificing performance or reliability. This scalability is crucial for supporting the platform's growth and ensuring a seamless user experience.
- **Flexibility:** Our proposed design promotes flexibility by allowing teams to choose the most suitable technology stack for each service. This enables rapid innovation and the adoption of new technologies without affecting the entire system. By adopting this architecture, we can optimize resource allocation and infrastructure usage. We can dynamically adjust the scale of individual services according to demand, offering flexibility in resource allocation and enabling cost-effective operations while maximizing efficiency.
- **Testability / Fault Isolation:** Since each microservice operates independently, faults or failures in one service do not necessarily impact the entire system. This enhances the overall resilience and reliability of the application. Furthermore, the design provides greater testability as each component and service can be tested independently, making it easier to identify and address performance-related issues in a fine-grained manner.
- **Modularity and Maintainability:** Breaking the application into smaller, loosely-coupled services and components promotes modularity and ease of maintenance. We can focus on individual services without being concerned about the entire application architecture. Furthermore, this fosters improved team collaboration and coordination, enabling the division of tasks and concurrent development of individual services.

## Prior Related Work:
Prior experience with similar projects or technologies may have influenced the decision to use a microservices architecture and MVC pattern for CommUNIcate. Lessons learned from past projects, industry practices, and research papers influenced the architectural design choices to ensure the success of the platform.

In summary, adopting a microservices architecture alongside the MVC pattern for CommUNIcate aligns with broader business goals of scalability, flexibility, testability/fault isolation, modularity, maintainability and user engagement. This design approach leverages industry best practices and prior experience and knowledge to create an efficient and adaptable platform that meets the evolving needs of the university community.


# Detailed Design
## Overall system architecture:
The overall system architecture will include a combination of MVC and microservices. The high-level organization of the code will be divided into three components. Firstly, the Model will include a multitude of microservices, each performing a specific task. Each of these microservices may communicate with their own decentralized database, separating potentially sensitive data. The View component will contain all logic related to the user interface. This includes a view microservice which will be implemented to communicate with the other services via an API gateway. Finally, the Controller will be used to facilitate communication between the two other components. This is done through an API gateway which will be implemented in the controller layer. The API gateway acts as a reverse proxy which accepts client API calls and forwards them to the appropriate microservice. Microservices further enhance our applications' scalability, maintainability, and team development, as microservices allow for the application to be broken down into smaller independent segments. These independent services can be targeted for specific development and testing, which streamlines the development process. The combination of these major architecture patterns allow for a highly flexible and efficient system that can easily adapt to evolving business requirements.
## How users Interact with the system:
Initially, users will be prompted to enter their personal and university specific information. This will include their year and program of study, and any additional details, including interests, clubs, and specific classes they are currently enrolled in. Once the profile is created, it can be updated at any time. Certain fields will automatically update, including incrementing the user’s current year of study and removing completed courses at the end of each semester. Every user has the option to add as many friends from the University as they would like. Friend recommendations will be displayed based on similar class schedules. A search option allows the user to find other individuals in the same university. Once a friend has accepted the request, users can message them directly through the application. Additionally, a user can click on a specific class they are enrolled in and see others in the same class and chat with a direct class message board. In relation to the system architecture, the user will directly interact with the View component of our appreciation. This part of the application contains the user interface (UI), and contacts the Controller and Model components to gather and build the necessary data for the UI based on the user's request. This is shown below in Figure 1. 
## How software components interact:
The interaction between software components within our system follows a clear and structured flow. The Controller component acts as the intermediary between the View and Model components, facilitating the exchange of data and instructions. When a user interacts with the UI, such as making a request to view their class schedule or send a message to a friend, the View component triggers corresponding actions within the Controller. The Controller then processes these actions, retrieving or updating data from the Model component as necessary. For example, when a user requests to view their class schedule, the Controller queries the Model to fetch the relevant data from the database and passes it back to the View for display. Similarly, when a user sends a message to a friend, the Controller updates the appropriate records in the database through the Model component before confirming the action to the user via the View. On a lower level, microservices within each MVC component interact through an API gateway, which acts as a single entry point into the system. The API gateway controls the flow of requests within the system, sending requests and responses to and from the appropriate microservice. This can be seen in Figure 1 below.
## How data flows through the system:
The flow of data through our system is designed to ensure efficient processing and seamless user experiences. Upon receiving input from the user through the View component (such as submitting a profile update or initiating a friend request), the data is transmitted to the Controller for processing. Within the controller, the API gateway forwards the client API call to the appropriate receiving microservice. This forwarded request is then processed within the receiving microservice, and the result is then sent back to the calling service. Through this processing of the requests, if information must be persistently stored or retrieved, the microservice will contact its database and perform the required operations. As such, the API gateway (within the Controller component) will be central in coordinating the flow of data and requests within the system. This systematic
<img width="522" alt="Screenshot 2024-01-30 at 10 36 09 AM" src="https://github.com/Domgartner/commUNIcate/assets/113861200/a25aa1c1-5565-4d34-b10e-829f101a2246">


# Implementation Plan

## Proposed Technologies:
For our CommUNIcate application, we've designed an efficient tech stack to ensure seamless and quality user experience.  
- **Frontend:** We will be using Next.js, leveraging its scalable and dependable server-side rendering capabilities for faster page loads and improved search engine visibility.
- **Authentication:** We will integrate Google Firebase for authentication, using its OAuth services to enforce security and ensure reliable login identification.
- **Backend:** We're adopting Java Spring Boot to enforce an MVC structure, streamlining the development and maintenance process by neatly separating different application features.
- **Data Storage:** For data storage, including user profiles, event details, and RSVP lists, we will employ a non-relational database, offering flexibility and scalability essential for our growing user base and evolving requirements.

## Managing Source Code:
To effectively manage source code:
- **Version Control:** Utilize Git and GitHub for version control, coupled with a two-person code review process to ensure efficient workflow.
- **Branching Strategy:** Adopt a branching strategy tailored to our workflow, creating separate branches for new features, bug fixes, and merging them into the main branch after thorough review and testing.
- **Code Review:** Implement a two-person code review process to promote code quality, catch bugs, and encourage learning between team members through pull requests on GitHub.
- **Testing and Continuous Integration:** Integrate testing and continuous integration into our workflow to maintain code quality.
  
## Integration of Components:
In integrating components for our application:
- Adopt a systematic and modular approach to ensure consistency, maintainability, and reusability across different sections of the platform.
- Design a clear and structured component architecture that divides the user interface into reusable building blocks based on functionality and UI patterns.
- Leverage component libraries like Material-UI or Bootstrap to standardize UI components which can be employed in numerous places around our web application.

## Testing the system:
To ensure the reliability and functionality of our CommUNIcate application, we're implementing a comprehensive testing approach:
- **Exploratory Testing:** Delve into the application's behavior in a flexible and open-ended manner, uncovering potential issues and various edge cases.
- **Other Practices:** Employ unit testing, integration testing, and end-to-end testing to cover various aspects of our system.
- **Test-driven Development:** Adopt test-driven development principles to streamline our testing process, improve code coverage, and maintain high software quality.

## Deployment of the System:
To deploy our application, we have chosen Vercel as our deployment platform:
- Offers a powerful and streamlined solution for deploying Next.js and other web applications.
- Seamless integration with Next.js, allowing for effortless deployment of server-side rendered or statically generated pages.
- Provides a user-friendly interface for managing deployments, allowing quick updates with just a few clicks.
- Integration with GitHub allows for seamless continuous deployment, streamlining our development workflow.

# Project Planning

## Team Organization:
- **Project Lead:** Ibrahim will oversee the project's progression and ensure effective coordination among team members.
- **Task Management:** Utilize Jira for creating and managing tickets to adhere to Agile Methodologies.
- **Task Delegations:** Delegate tasks between members based on their expertise and comfort level.
- **Progress Monitoring:** Regular check-ins and sprint meetings to review progress, address challenges, and make important decisions.

## Tentative Schedule:
| Major Tasks                    | Members                    | Expected Completion Date | Status         |
|--------------------------------|----------------------------|--------------------------|----------------|
| Home Page                      | Armin, Kaylyn, Alex        | Feb 14, 2024             | Not Implemented|
| Login / Authentication         | Hamd & Dominic             | Feb 28, 2024             | Not Implemented|
| Profile Creation               | Kaylyn, Armin & Ryan       | Feb 28, 2024             | Not Implemented|
| Events Page                    | Ibrahim & Alex             | Mar 13, 2024             | Not Implemented|
| Course-Specific Discussion     | Hamd, Dominic, Armin       | Mar 6, 2024              | Not Implemented|
| Course-Specific Due Dates/Cal. | Ryan & Kaylyn              | Mar 6, 2024              | Not Implemented|
| Direct Messaging               | Ibrahim & Alex             | Mar 13, 2024             | Not Implemented|

# Appendices

## Appendix A: References
- Khan, Hamd. "Research Paper on Architectural Styles." SENG 401, University of Calgary, Jan 24, 2024.
- Team 1. "Project Proposal: commUNIcate." SENG 401, University of Calgary, 2024.

## Appendix B: Glossary
| Term | Definition                                |
|------|-------------------------------------------|
| MVC  | Model-View-Controller Architecture        |
| CQRS | Command and Query Responsibility Segregation |

