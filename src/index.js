import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { App } from './App';

const client = new ApolloClient({
  headers: {
    "Content-Type": "application/json",
    "x-api-key": ""
  },
  uri: 'https://graphql.icy.tools/graphql', 
  cache: new InMemoryCache()
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

