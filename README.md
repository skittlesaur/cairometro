<p align="center">
<img src="https://cairometro.baraa.app/assets/logo.png" alt="Cairo Metro Logo">
</p>

<h1 align="center">
Cairo Metro
</h1>

An extensive rapid transit system serving the city of Cairo Egypt. The project aims to provide an efficient and
user-friendly application for managing and accessing information about the Cairo Metro.

This project is part of the Software Engineering course at the German International University under the supervision
of [Dr. Amr Desouky](https://github.com/desoukya) and Eng. Ayman Iskandar.

# Tools & Technologies

- [Linear](https://linear.app): for project management
- [Figma](https://figma.com): for UI/UX design
- [Next.js](https://nextjs.org): for the frontend
- [Node.js](https://nodejs.org): for the backend
- [MongoDB](https://mongodb.com): for the database

# Features

- **Station Information**:
  Provides detailed information about each station, including its location, lines it serves, and nearby landmarks.
- **Route Planning**:
  Allows users to plan their trips by selecting their starting and ending stations, and the app will provide them with
  the best route to take.
- **Ticketing System**:
  Facilitates the purchase and management of tickets, including options for single rides, daily passes, and monthly
  subscriptions.
- **User Profiles**:
  Allows users to create accounts and manage their information, including their tickets and payment methods.
- **Admin Dashboard**:
  Provides an interface for admins to manage the system, including adding new stations, managing tickets, and viewing
  statistics.
- **Customer Support**:
  Provides a way for users to contact customer support and report any issues they face with a real-time chat system.

# Installation and Usage

To run the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/skittlesaur/cairometro.git
```

2. Install the dependencies:

```bash
cd cairometro
yarn install
```

3. Set up the environment variables:

```bash
cp .env.example .env
```

Then, fill in the required variables in the `.env` file.

4. Run the development server:

```bash
yarn dev
```

**Authentication Note**:

The project requires `hosts` file configuration to work properly. Add the following line to your `hosts` file:

```
::1       cairometro
127.0.0.1 cairometro
::1       api.cairometro
127.0.0.1 api.cairometro
```

Run the frontend at [http://cairometro:3000](http://cairometro:3000) and the backend at [http://api.cairometro:1111](http://api.cairometro:1111).

# Repository Structure

The repository follows the following structure:

```text
├── apps
│   ├── graphql
│   │   ├── prisma   # Prisma schema and nexus types
│   │   └── src
│   │       ├── api  # Public Express API
│   │       ├── lib  # Utility functions
│   │       ├── notifications  # Notification templates in mjml
│   │       ├── permissions  # Permissions for the GraphQL API
│   │       ├── resolvers    # GraphQL resolvers
│   │       │   ├── mutations
│   │       │   └── queries
│   │       ├── types        # GraphQL types
│   │       └── utils        # Utility functions
│   └── home
│       ├── components  # React components
│       ├── context     # React context
│       ├── graphql     # GraphQL queries and mutations
│       ├── help        # Help pages markdown files
│       ├── icons       # SVG icons
│       ├── layouts     # React layouts
│       ├── lib         # Utility functions
│       ├── pages       # Next.js pages
│       ├── public      # Public assets
│       ├── styles      # CSS styles
│       └── types       # TypeScript types
```

# Meet the Team

| Name           | Role                                                       | GitHub                                               |
|----------------|------------------------------------------------------------|------------------------------------------------------|
| Baraa Ahmed    | Team Leader, UI/UX, and Frontend Developer                 | [@skittlesaur](https://github.com/skittlesaur)       |
| Omar Elbarbary | 3rd Party API Integrator and Backend Developer             | [@ElBarBary01](https://github.com/ElBarBary01)       |
| Youssef Saad   | Localizations, Animations, and Full Stack Developer        | [@YoussefElbasha](https://github.com/YoussefElbasha) |
| Youssef Khaled | Frontend 3rd Party API Integrator and Full Stack Developer | [@sbayce](https://github.com/sbayce)                 |
| Momen Yasser   | QA Tested and Full Stack Developer                         | [@thethirdsh](https://github.com/thethirdsh)         |
