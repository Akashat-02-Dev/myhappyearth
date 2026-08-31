# MyHappyEarth 🌍

Welcome to the **MyHappyEarth** repository! This is a modern web application built to promote sustainable living, offer eco-friendly products, and track real-world environmental impact. Our mission is to build a movement of everyday people making small swaps that clean coastlines, restore forests, and prove another way of living is possible.

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Backend/Database:** [Firebase 12](https://firebase.google.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations/Scrolling:** React Scroll

## 📂 Project Structure

The project follows a standard Next.js App Router structure:

```text
myhappyearth/
├── public/                 # Static assets (images, hero backgrounds, etc.)
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── admin/          # Admin dashboard route
│   │   ├── contact/        # Contact us page
│   │   ├── enquiry/        # Wholesale/Enquiry page
│   │   ├── impact/         # Impact metrics page
│   │   ├── products/       # Product catalog
│   │   └── productDetails/ # Individual product detail pages
│   ├── components/         # Reusable React components
│   │   ├── ui/             # Core UI components
│   │   ├── products/       # E-commerce related components
│   │   └── impact/         # Impact tracking components
│   ├── data/               # Static data, constants, and mock data
│   └── lib/                # Utility functions and Firebase configuration
├── .env.local              # Environment variables (not tracked in git)
├── next.config.mjs         # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🌟 Key Features

1. **E-Commerce & Product Showcase:** Explore sustainable solutions and eco-friendly products.
2. **Impact Tracking:** Live metrics on community impact (e.g., trees planted, plastic diverted).
3. **Admin Dashboard:** Secure area for managing products and content.
4. **Enquiry System:** Streamlined contact and wholesale enquiry forms.
5. **Responsive Design:** Beautiful, fluid UI built with Tailwind CSS that works seamlessly across all devices.

## 🛠️ Getting Started

First, clone the repository and install the dependencies:

```bash
# Clone the repository
git clone https://github.com/your-username/myhappyearth.git

# Navigate to the project directory
cd myhappyearth

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Environment Variables

Create a `.env.local` file in the root directory and add the required Firebase configuration and any other necessary secrets:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Running the Development Server

Start the development server with Turbopack for faster reloads:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## 📦 Build for Production

To create an optimized production build:

```bash
npm run build
npm run start
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📄 License

This project is licensed under the MIT License.
