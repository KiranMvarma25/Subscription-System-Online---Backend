# Subscription-System-Online---Backend


Quick Set Up in your Machine-

1. Clone the Repository
2. npm i
3. npm start



Here the API's Realted to this Application.


Users - 

post
http://localhost:PORT/users/createUsers 

post
http://localhost:PORT/users/userLogin

get
http://localhost:PORT/users/userAuthentication

get
http://localhost:PORT/users/getUsers

get by Id
http://localhost:PORT/users/getUsersById/

put by Id
http://localhost:PORT/users/updateUsersById/

delete by Id
http://localhost:PORT/users/deleteUsersById/


Services - 

post
http://localhost:PORT/services/createService

get
http://localhost:PORT/services/getServices

get by Id
http://localhost:PORT/services/getService/

put by Id
http://localhost:PORT/services/updateService/

delete by Id
http://localhost:PORT/services/deleteService/


Subscriptions -

post
http://localhost:PORT/subscriptions/createSubscription

get
http://localhost:PORT/subscriptions/getSubscriptions

get by Id
http://localhost:PORT/subscriptions/checkSubscription/

get by Id
http://localhost:PORT/subscriptions/getSubscriptionByDate?start=2025-04-07&end=2026-04-07

get by Id
http://localhost:PORT/subscriptions/upcoming

get by Id
http://localhost:PORT/subscriptions/active/


Payments -

post
http://localhost:PORT/payments/createpayment

get by Id
http://localhost:PORT/payments/invoices/


Analytics -

get
http://localhost:PORT/analytics/service

get
http://localhost:PORT/analytics/revenue