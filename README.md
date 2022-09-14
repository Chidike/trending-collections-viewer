RUN INSTRUCTIONS

On a system running Node.js and the npm cli

in the trend-collections-viewer folder

run

npm install
npm start

NOTE: I apologize for doing this in plain js, I accidentally overlooked the TypeScript component of this. Though by time I remembered I did not have enough time to refactor the app to tsx.

TECHNICAL QUESTIONS:

Handles user authentication: I would opt to use something like Auth0 that way I would have the choice between their hosted cloud database or my own external database. The schema of the database would include name, email, user_id, an encrypted password field, and a boolean determining whether the account has been verfied or not. If my project is well defined and my schema wasn't changing much would opt for an SQL database. If the team was high growth and the project was more open ended I would prefer a NoSQL database for scalability and performance.

Serves data to the client via an API: If it were a system that did not have to utiize a lot of caching I would prefer to use GraphQL as it makes it very easy to write queries, also it gives you only the information you want so there are some performance benefits,

Scales to handle thousands of requests per second: Caching can be utilized to make data retrieval quicker as less information needs to be pulled via the API's. If the system were using a RESTFUL API I would consider using something like GraphQL, this way only the information that is absolutely needed is being pulled and we are not wasting time fetching unecessary data.

Provide real-time updates to clients as new data is available: I would achieve this with use of state management and the React lifecycle methods the view will be updated when the state is updated.