# TESTING ENDPOINTS

# -------------------------------------------------------------- [TEST GET ALL RECIPES]
curl -X GET http://127.0.0.1:5000/recipes


# -------------------------------------------------------------- [TEST INSERT STOCK FROM PANTRY]
curl -X POST http://127.0.0.1:5000/pantry/insert-stock \
-H "Content-Type: application/json" \
-d '{
    "name": "Azeite",
    "quantity": "1",
    "unit": "l",
    "expiration_date": "2024-12-31"
}'

# -------------------------------------------------------------- [TEST REMOVE STOCK FROM PANTRY]
curl -X POST http://127.0.0.1:5000/pantry/remove-stock \
-H "Content-Type: application/json" \
-d '{
    "name": "Azeite",
    "quantity": "50",
    "unit": "ml"
}'

# -------------------------------------------------------------- [TEST GET COMPLETE PANTRY]
curl -X GET http://127.0.0.1:5000/pantry/stock

# -------------------------------------------------------------- [TEST INSERT PRODUCT INTO SHOPPING LIST]
curl -X POST http://127.0.0.1:5000/pantry/insert-grocery \
-H "Content-Type: application/json" \
-d '{"name": "azeite"}'

# -------------------------------------------------------------- [TEST REMOVE PRODUCT FROM SHOPPING LIST]
curl -X DELETE http://127.0.0.1:5000/pantry/remove-grocery \
-H "Content-Type: application/json" \
-d '{"name": "azeite"}'

# -------------------------------------------------------------- [TEST GET COMPLETE SHOPPING LIST]
curl -X GET http://127.0.0.1:5000/pantry/shopping-list


# -------------------------------------------------------------- [TEST SEND EMAIL]
curl -X POST http://127.0.0.1:5000/send-email \
-H "Content-Type: application/json" \
-d '{
    "from_addr": "kitchen_assistant@outlook.com",
    "to_addr": "inesaguia@ua.pt",
    "subject": "Test Email from Python",
    "body": "Hello, this is a test email sent from Python using SMTP with Outlook.",
    "smtp_server": "smtp-mail.outlook.com",
    "smtp_port": 587,
    "password": "kitchen123."
}'