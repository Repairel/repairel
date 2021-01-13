# Repairel
An MVP for Repairel CIC. An e-commerce site dedicated to selling refurbished shoes, with a focus on the ethics and sustainability of the products.

## Live Demo
* Development website (most up to date, based on develop branch): [here](https://dev-repairel-fe.herokuapp.com/)
* Production website (most stable, based on master branch): [here](https://repairel-fe.herokuapp.com/)

## Installation
- Clone the repository using `git clone https://stgit.dcs.gla.ac.uk/tp3-2020-SE04/se04-main.git`
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
  * Run the server `npm run dev`

## Technology Used
- [NextJS](https://nextjs.org/) frontend deployed to [Heroku](https://heroku.com/)
- [Strapi](https://strapi.io/) CMS backend deployed to [Heroku](https://heroku.com/)
  * [AWS S3](https://aws.amazon.com/s3/) bucket to host static content for [Strapi](https://strapi.io/)
- [Snipcart](https://snipcart.com/) integration for checkout (_subject to change_)

## Current Developer Team (**CSP5**)
| Name                 | Contact Details            |Role                           |
|----------------------|----------------------------|-------------------------------|
| Barbara Bergant      | 2333274B@student.gla.ac.uk | Team Manager, Developer, UX Developer|
| Gavin Lafferty       | 2386209L@student.gla.ac.uk | Product owner, Developer |
| Jakob Oliver Reitzel | 2403648R@student.gla.ac.uk | SCRUM Master, Developer, Librarian |
| Jack McKechnie       | 2319658M@student.gla.ac.uk | Chief Architect, Developer, Quality Assurance|

## Previous Developers
Project has been forked on behalf of the client Repairel CIC from a [Code for Good](https://www.foundersandcoders.com/tech-for-better/) developer team. Original codebase completed by Code for Good developers is [here](https://github.com/Repairel).
