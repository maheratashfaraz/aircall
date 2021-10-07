# Aircall tech test X

### In order to run the app, once you clone the repo, please use the following commands:
`npm install`
`npm start`

To run the test: 
`npm run cypress:open`

-----------------------------------------------------------------------------------------------------------------

### API issues

Two of the APIs didn't work as expected, however for the sake of implementation, they are considered to be working correctly: 

- /calls/:id/archive:

currently returns 401 due to strict-origin-when-cross-origin (assuming it is backend issue)

- /auth/refresh-token:

currently returns 401 due to strict-origin-when-cross-origin (assuming it's backend issue)









