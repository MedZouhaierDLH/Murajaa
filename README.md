# Murajaa (مُرَاجَعَة)

Murajaa is a modern web application designed to help Muslims review and strengthen their memorization of the Holy Quran. It provides an interactive quiz interface to test your knowledge of Ayahs sequence.

![Murajaa App](image-1.png)

## Features

- **Flexible Selection**: Choose to review by specific **Juz** or **Surah**.
- **Custom Ranges**: Define specific Ayah ranges within a Surah for focused review.
- **Intelligent Quizzing**:
  - **Next Ayah**: Given an Ayah, identify the one that follows it.
  - **Previous Ayah**: Given an Ayah, identify the one that precedes it.
- **Self-Evaluation**: The evaluation is done by you, not by AI. You verify your own answers to ensure accuracy.
- **Beautiful UI**: A clean, modern, and responsive Arabic interface designed for focus.
- **Progress Tracking**: Immediate feedback and score summary after each session.

## Demo

![Selection Screen](image.png)
![Quiz Screen](image%20copy.png)
![Results Screen](image%20copy%202.png)

## Tech Stack

- **Framework**: [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Integration**: Google GenAI (configured in dependencies)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd murajaa
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## Building for Production

To create a production-ready build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## License

This project is created by Zouhaier Dlh.