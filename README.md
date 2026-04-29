<a id="readme-top"></a>

<br />
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#running-the-project">Running the Project</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

---

## About The Project

A modern web application for technical teams to register, list, and manage internal service demands. It features a dynamic data table, grid view, dark mode toggle, optimistic updates, and a json-server-based backend.

### Built With

[![React][React.js]][React-url]
[![Vite][Vite]][Vite-url]
[![Tailwind CSS][Tailwindcss]][Tailwind-url]
[![Shadcn UI][Shadcn]][Shadcn-url]
[![React Query][ReactQuery]][ReactQuery-url]
[![JSON Server][JsonServer]][JsonServer-url]

---

## Getting Started

To get a local copy of this project up and running, follow these simple steps.

### Prerequisites

* **Git**: For cloning the repository.
* **Node.js**: Includes npm, which is necessary for running JavaScript projects.
* **pnpm**: A fast, disk space efficient package manager.

### Running the Project

1.  **Clone this repository:**
    ```bash
    git clone https://github.com/Batsy13/demands-manager.git
    ```
2.  **Navigate to the project folder:**
    ```bash
    cd demands-manager
    ```
3.  **Install the dependencies:**
    ```bash
    pnpm install
    ```
4.  **Set up environment variables (in the right directory):**
    ```bash
    cd apps/web
    ```
    ```bash
    cp .env.example .env
    ```
5.  **Start the mock backend server:**
    ```bash
    npx json-server db.json
    ```
6.  **Run the application in development mode:**
    ```bash
    pnpm run dev
    ```

## Contact

Feel free to connect with me!

* **LinkedIn**: [@Pedro Costa](https://www.linkedin.com/in/pedro-costa-b189262b3/)
* **Project Link**: [Demands Manager on GitHub](https://github.com/Batsy13/demands-manager)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[Vite]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white
[Vite-url]: https://vite.dev/
[Tailwindcss]: https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC
[Tailwind-url]: https://tailwindcss.com/
[React-url]: https://reactjs.org/
[Shadcn]: https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white
[Shadcn-url]: https://ui.shadcn.com
[ReactQuery]: https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white
[ReactQuery-url]: https://tanstack.com/query/latest
[JsonServer]: https://img.shields.io/badge/JSON_Server-333333?style=for-the-badge&logo=json&logoColor=white
[JsonServer-url]: https://github.com/typicode/json-server