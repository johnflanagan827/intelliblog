# IntelliBlog

<img src="https://github.com/johnflanagan827/IntelliBlog/assets/69359897/86b23c47-4dd9-48e3-9f35-e81e1a37908c" height="100">

# Introduction

IntelliBlog is an advanced platform that uses cutting-edge AI technology to generate captivating blog posts. It supports user authentication and allows you to create engaging content effortlessly from YouTube URLs, uploaded media, and user prompts. Manage all your generated blog posts conveniently on this centralized application.

## Demo

Here is a brief demo showcasing IntelliBlog's ability to generate a blog post from user prompts: 

https://github.com/johnflanagan827/IntelliBlog/assets/69359897/714c6cdb-d15d-4e66-9b8c-0305262c1e8e

## Technology Stack

IntelliBlog was built with the following:

  - **Frontend:** React with Tailwind CSS
  - **Backend:** Next.js
  - **Database:** MongoDB
  - **User Authentication:** NextAuth.js

# Getting Started

Before you dive into IntelliBlog, make sure you have the following prerequisites in place:

- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

## Installation

Set up IntelliBlog using the provided instructions:

1. Clone the repository:

```
git clone https://github.com/johnflanagan827/intelliblog.git
```

2. Change into the project directory:

```
cd intelliblog
```

3. Install dependencies:

```
npm install
```

Installation is complete! You can proceed to follow the [Setting up Enviornment Variables](#setting-up-environment-variables) section to set up the necessary configurations.

# Setting Up Environment Variables

In this section, we will highlight how to configure the required environment variables. First, create a `.env` file in the root directory, and copy the following skeleton code:

```
DATABASE_URL=
SECRET=

GITHUB_ID=
GITHUB_SECRET=

GOOGLE_ID=
GOOGLE_SECRET=

OPENAI_API_KEY=

STABILITY_API_KEY=
```

## NextAuth.js

To ensure secure encryption and hashing in [NextAuth.js](https://next-auth.js.org/), you will need to generate a secret. The secret is used to encrypt the NextAuth.js JSON Web Tokens (JWT) and hash email verification tokens. Follow the steps below to generate a strong secret:

**1. Run OpenSSL Command:** Type the following command and press Enter:

```
openssl rand -base64 32
```

**2. Copy the Result:** The output of the command will be a random string, which is your generated secret. It will look something like this:

```
4d3FQ6nzjY9bG4GzSDS4uABnv+Jh7m/yhP0/h1/wtMI= 
```

**3. Update `.env` File:** In your project's root directory, update the `.env` file as follows:

```
SECRET=YOUR_SECRET
```

Replace `YOUR_SECRET` with the secret value you just generated.

## MongoDB

To connect to the [MongoDB](https://www.mongodb.com/) database service, you will need to sign up for an account. Follow these steps to obtain the connection URI:

**1. Create a MongoDB Account:** If you do not have a MongoDB account, visit [MongoDB](https://www.mongodb.com/) and create one.

**2. Create a Free Shared Cluster:** After signing up and logging in, navigate to the MongoDB dashboard and create a new free shared cluster. This cluster will host your data and allow your application to access MongoDB services.

**3. Cluster Configuration:** Once the cluster is created, you can customize its configuration according to your project's needs. For most use cases, the default settings will work fine.

**4. Cluster Name:** Feel free to name your cluster as you prefer.

**5. Get Connection URI:** After setting up the cluster, go to the "Clusters" section in the MongoDB dashboard, select your newly created cluster, and click on "Connect."

**6. Choose a Connection Method:** In the "Connect" window, choose "Connect Your Application" to get the connection string.

**7. Whitelist Your IP Address:** To allow your application to access the cluster, ensure that you whitelist your IP address. You can also allow all IP addresses for development purposes.

**8. Copy the Connection URI:** You will now be presented with the MongoDB connection URI. It should look something like this:

```
mongodb+srv://username:password@clustername.mongodb.net/test
```

**9. Update `.env` File:** In your project's root directory, update the `.env` file as follows:

```
DATABASE_URL=YOUR_MONGODB_URI
```

Replace `YOUR_MONGODB_URI` with the connection URI you obtained from MongoDB.

## GitHub

To enable user login through [GitHub](https://github.com/) as a provider in [NextAuth.js](https://next-auth.js.org/), you will need to obtain a GitHub Client ID and Secret. Follow the steps below to create a new OAuth application and get the required credentials:

**1. Sign in to GitHub:** Go to [GitHub](https://github.com/) and log in to your account. If you don't have an account, create one.

**2. Go to Developer Settings:** Click on your profile picture in the top-right corner and select "Settings" from the dropdown menu. In the settings page, navigate to the "Developer settings" tab in the left-hand menu.

**3. Create a New OAuth App:** In the "Developer settings" page, click on "OAuth Apps" under the "OAuth applications" section. Then click the "New OAuth App" button.

**4. Fill Out the Application Details:** You will be prompted to fill out the following:

  - ***Application Name:*** Feel free to name this whatever you want.
  - ***Homepage URL:*** Enter the following URL: `http://localhost:3000`.
  - ***Application Description:*** You can leave this section blank.
  - ***Authorization callback URL:*** Enter the following URL: `http://localhost:3000`.

**5. Register the Application:** After filling out the details, click the "Register application" button.

**6.Get the Client ID and Secret:** Once the application is registered, you will be redirected to the application's settings page. Here you can find the "Client ID" and "Client Secret" under the "Client ID" and "Client Secret" sections, respectively.

**7. Update `.env` file:** In your project's root directory, update the `.env` file as follows:

```
GITHUB_ID=YOUR_GITHUB_ID
GITHUB_SECRET=YOUR_GITHUB_SECRET
```

Replace `YOUR_GITHUB_ID` and `YOUR_GITHUB_SECRET` with the Github Client ID and Secret you just generated.
 
## Google

To enable user login through Google as a provider in NextAuth.js, you will need to obtain a Google Client ID and Secret. Follow the steps below to create a new OAuth project on the [Google Developer Console](https://console.developers.google.com/) and get the required credentials:

**1. Sign in to Google Developer Console:** Go to the [Google Developer Console](https://console.developers.google.com/) and sign in with your Google account. If you do not have an account, create one.

**2. Create a New Project:** Click on the project dropdown at the top of the page, then click "New Project." Enter a unique name for your project and click "Create."

**3. Create OAuth Consent Screen:** In the left-hand menu, go to "OAuth consent screen." Select "External" user type and Click "Create."

**4. Fill Out the Application Details:** You will be prompted to fill out the following:

  - ***Application Name:*** Feel free to name this whatever you want.
  - ***User Support Email:*** Enter your Google Gmail address.
  - ***Application Home Page:*** Enter the following URL: `http://localhost:3000`.
  - ***Developer Contact Information:*** Enter your Google Gmail address.

Feel free to leave the additional optional fields blank. Continue to click "Save and Continue" until you reach the "Summary" section.

**5. Create Credentials:** In the left-hand menu, go to "Credentials" and click "Create Credentials." Select "OAuth Client ID."

**6. Configure the OAuth Client ID:** Choose "Web application" as the application type. Feel free to name the application as you prefer.

**7. Get the Client ID and Secret:** After filling out the details, click the "Create" button. You will now see your generated Google Client ID and Secret.

**8. Update `.env` file:** In your project's root directory, update the `.env` file as follows:

```
GOOGLE_ID=YOUR_GOOGLE_ID
GOOGLE_SECRET=YOUR_GOOGLE_SECRET
```

Replace `YOUR_GOOGLE_ID` and `YOUR_GOOGLE_SECRET` with the Google Client ID and Secret you just generated.

## OpenAI

To access the OpenAI API and utilize its powerful language models in your application, you will need to obtain an API key. Here is how you can get an API key for [OpenAI](https://openai.com/):

**1. Sign up for an OpenAI Account:** If you do not have an account, go to [OpenAI](https://openai.com/) and sign up for an account.

**2. Navigate to API Access:** After signing in, click on your profile picture in the top-right corner and select "View API Keys" from the dropdown menu.
  
**3. Create a New API Key:** In the "View API Keys" section, click the "Create New Key" button. Feel free to name the key as you prefer. The key will be displayed on the screen.

**4. Update `.env` file:** In your project's root directory, update the `.env` file as follows:

```
OPENAI_API_KEY=YOUR_OPENAI_KEY
```

Replace `YOUR_OPENAI_KEY` with the OpenAI key you just generated.

## Stability AI

To enhance your blog posts with AI-generated images using [Stability AI](https://stability.ai/), you will need to obtain an API key. This key will grant your application access to Stability AI's image generation capabilities, enabling you to create captivating and visually appealing images for your blog content.

**1. Sign Up for a Stability AI Account:** If you do not have an account, visit the [Stability AI](https://stability.ai/) website and sign up for an account. As part of the account creation process, Stability AI will assign a default API key to your account.

**2. Access API Key:** After signing in, access your account page or dashboard. Look for the "API Keys" section or panel, where you can manage your API keys. Simply click the "Copy" button next to the default key to gain access to the Stability AI key.

**3. Update `.env` file:** In your project's root directory, update the `.env` file as follows:

```
STABILITY_API_KEY=YOUR_STABILITY_KEY
```

Replace `YOUR_STABILITY_KEY` with the Stability AI key you just generated.

# Quick Start

Now that you have set up the necessary configurations, getting started is easy.

First, run the development server:

```
npm run dev
```

Now, open [localhost:3000](localhost:3000) with your browser to see the website content. 

Congratulations! You have now successfully set up IntelliBlog. If you encounter any issues or have questions, please feel free to reach out for support.

# License

This project is licensed under the MIT License. Feel free to use, modify, and distribute the code as you see fit. See the [LICENSE](LICENSE) file for more details.
