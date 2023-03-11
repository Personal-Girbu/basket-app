# Simple basket

This is a simple basket app made with React and TypeScript.

## Demo

The project is deployed at [https://gn-simple-basket.netlify.app/](https://https://gn-simple-basket.netlify.app/).

## Local usage

After downloading/cloning the project follow these steps:

- Create a file `.env` using `.env.example`, replace `YOUR_OPENAI_API_KEY` with your API key from your account [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)

  Run the following commands:

- `npm install`
- `npm start`

## Features

The project has the following features:

- Display a list of groceries
- Adds an item to list
- Changes quantity of exisitng item
- Removes an individual item
- Keeps the list to localstorage after page reload
- Removes all items with a button
- Display alerts after user actions

## Concepts

The project covers the following concepts:

- Creating reusable components
- React hooks (useState, useEffect, useContext)
- Custom hooks
- Data fetch from API
- Unit tests for most of the components
