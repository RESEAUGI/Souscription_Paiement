Backend de Souscription

Pour Enregistrer une souscription dans la base de données il faut faire un post sur la route

http://localhost:5000/subscription/create

Et le corps de la requête doit être au format JSON suivant l'exemple suivant:

- Pour un paiement mobile
    {
   "userId": "ec9e4f82-f7d9-4624-aed6-34ad54e795c9",

   "startDate": "2024-07-06",

   "endDate" :"2024-10-06",
   
   "status": "active",
   
  "paymentDate":"2024-07-06",

   "category":"Standard",

    "amount":15000,

    "duration":3,

    "methodType":"mobile",

    "provider":"Orange",
    
    "phoneNumber":"698715442"
   
}

- Pour un paiement par carte
{
   "userId": "ec9e4f82-f7d9-4624-aed6-34ad54e795c9",

   "startDate": "2024-07-06",

   "endDate" :"2024-10-06",
   
   "status": "active",
   
  "paymentDate":"2024-07-06",

   "category":"Standard",

    "amount":15000,

    "duration":3,

    "methodType":"card",

    "cardNumber":"XXXX-XxXXX-XXXXX",
    
    "expirationDate":"aaaa-mm-jj",

    "cvc":"123"
   
}

- Pour un paiement par paypal
    {
    "userId": "ec9e4f82-f7d9-4624-aed6-34ad54e795c9",

    "startDate": "2024-07-06",

    "endDate" :"2024-10-06",
    
    "status": "active",
    
    "paymentDate":"2024-07-06",

    "category":"Standard",

        "amount":15000,

        "duration":3,

        "paypalEmail":"abc@example.com"
    }

NB: En cas de soucis bien vouloir me contacter via mon github

N'hésitez pas à me suivre :) (github: Yannhack007) 