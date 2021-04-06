# Repairel
A MVP for Repairel CIC, an e-commerce site dedicated to selling refurbished shoes, with a focus on the ethics and sustainability of the products.

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
    - Specify the **public** Snipcart API key: `SNIPCART_API_KEY="{key}"`
        - It's crucial to include the quotation marks
        - {key} is available on the **public** API keys section of the Snipcart dashboard
    - Specify the **secret** Snipcart API key: `SNIPCART_QUERY_API_KEY="{key}:"`
        - It's crucial to include the quotation marks and colon
        - {key} is available on the **secret** API keys section of the Snipcart dashboard
  * Run the server `npm run dev`

## Technology Used
- [NextJS](https://nextjs.org/) frontend deployed to [Heroku](https://heroku.com/)
- [Strapi](https://strapi.io/) CMS backend deployed to [Heroku](https://heroku.com/)
  * [AWS S3](https://aws.amazon.com/s3/) bucket to host static content for [Strapi](https://strapi.io/)
- [Snipcart](https://snipcart.com/) integration for checkout

## Current Developer Teams
### (**SE04**)
| Name     | Email     
| :------------- | :----------: |
|  Declan Davidson |  2038796D@student.gla.ac.uk    |
|  Luke Holland  |  2342915H@student.gla.ac.uk     |
|  Wafa Khan Tareen |  2366702T@student.gla.ac.uk     |
|  Fraser Dempster  |  2331229D@student.gla.ac.uk     |
|  Ewan Hempsey  |  2314230H@student.gla.ac.uk      |\

### (**CSP5**)
| Name     | Email     
| :------------- | :----------: |
|  Jack McKechnie |  2319658M@student.gla.ac.uk   |
|  Gavin Lafferty |  2386209L@student.gla.ac.uk    |
|  Barbara Bergant |  2333274B@student.gla.ac.uk     |
|  Jakob Reitzel  |  2403648R@student.gla.ac.uk    |\



## Previous Developers
Project has been forked on behalf of the client Repairel CIC from a [Code for Good](https://www.foundersandcoders.com/tech-for-better/) developer team. Original codebase completed by Code for Good developers is [here](https://github.com/Repairel).
