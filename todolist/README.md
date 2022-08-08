## About

This project has been created with _Create WXP App_.

## Setup

### **Create Self-Signed Certificate** :lock:

In case you had opted out from creating the SSL certificate during setup, you can create so by following these steps:

1. Create the ssl folder, `mkdir ssl`.
2. `cd ssl` and run the following commands:
    - `openssl genrsa -out key.pem`
    - `openssl req -new -key key.pem -out csr.pem` (We may enter the Country, Organization, Email and skip all other input parameters)
    - `openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem`

### **Allowing self-signed certificates for localhost in Chrome** :warning:

1. Open `chrome://flags`
2. Enable this flag: `Allow invalid certificates for resources loaded from localhost.`
3. Restart Chrome

### **Running the application** :rocket:

1. For installing the dependencies, run `npm install`.
2. To build the application, run `npm run build`.
3. To start the application, run `npm run start`.
