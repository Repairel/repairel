# Repairel
An MVP for Repairel CIC. An e-commerce site dedicated to selling refurbished shoes, with a focus on the ethics and sustainability of the products.

## Live Demo
* Development website (most up to date, based on develop branch): [here](https://dev-repairel-fe.herokuapp.com/)
* Production website (most stable, based on master branch): [here](https://repairel-fe.herokuapp.com/)

## Installation
- Clone the repository using `git clone https://github.com/Repairel/repairel.git`
- Navigate to the project folder using `cd`
- Setup the backend:
  * Go to the backend folder `cd repairel-be`
  * Install the dependencies `npm i`
  * Create a file called `.env` using `touch .env` (\*)
    - Inside of file specify these variables:
      * `AWSAccessKeyId={keyid}`
      * `AWSSecretKey={secret key}`
      * `AWSBucketName={bucket name}`
  * Run the server `npm run develop`
  * (\*) **Note**: [AWS S3](https://aws.amazon.com/s3/) bucket is required for static content delivery (media)
- Setup the frontend:
  * From project folder go to front end folder `cd repairel-fe`
  * Install dependencies `npm i`
  * Create a file called `.env` using `touch .env`
    - Inside of file specify the API URL: `NEXT_PUBLIC_API_URL={url}`
        - `{url}` is the url of your API in our case for develop branch it is `https://dev-repairel.herokuapp.com/`
        - `{url}` will be `http://localhost:1337` if developing a new feature which requires updates to backend
    - Specify the **secret** Snipcart API key: `SNIPCART_TEST_API_KEY="{key}:"`
        - It's crucial to include the quotation marks and colon
        - {key} is available on the **secret** API keys section of the Snipcart dashboard
  * Run the server `npm run dev`

## Technology Used
- [NextJS](https://nextjs.org/) frontend deployed to [Heroku](https://heroku.com/)
- [Strapi](https://strapi.io/) CMS backend deployed to [Heroku](https://heroku.com/)
  * [AWS S3](https://aws.amazon.com/s3/) bucket to host static content for [Strapi](https://strapi.io/)
- [Snipcart](https://snipcart.com/) integration for checkout (_subject to change_)

## Current Developer Teams
### (**SE04**)
| Name     | Student #     | Email    | Customer Meeting Role    |   Scrum Roles     
| :------------- | :----------: | -----------: |-----------: | -----------: |
|  Declan Davidson | 2038796   | 2038796D@student.gla.ac.uk    | Contact    | Product Owner |
|  Luke Holland  | 2342915   | 2342915H@student.gla.ac.uk    |Lead Demonstrator    | Developer |
|  Wafa Khan Tareen | 2366702   | 2366702T@student.gla.ac.uk    |Checker    | Quality Assurance |
|  Fraser Dempster  | 2331229   | 2331229D@student.gla.ac.uk    |Meeting Chair    | Scrum Master |
|  Ewan Hempsey  | 2038796   | 2038796D@student.gla.ac.uk    |Note Taker    | Toolsmith |
|  Ivo de Vero  | 2310555   | 2310555D@student.gla.ac.uk   |Team Coach    |               |\



## Previous Developers
Project has been forked on behalf of the client Repairel CIC from a [Code for Good](https://www.foundersandcoders.com/tech-for-better/) developer team. Original codebase completed by Code for Good developers is [here](https://github.com/Repairel).
