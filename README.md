## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

## Env file:

Rename `env.local` file to  `.env` and fill out with the actual values needed.

(You can find them in Vercel Settings Tab > Environment Variables)

## DB User (sample):

user@nextmail.com
123456

## Doc for more on metadata:

(*) https://nextjs.org/docs/app/api-reference/functions/generate-metadata

## Build Docker Image and run container:

To build image, run: > **docker build -t nextjs-docker .**  (Check if it was created)

Then to build your container: > **docker run --name next-container -p 3000:3000 nextjs-docker** (Check that container was created)

Then go to localhost:3000

## Run Docker Container (w/ Docker Compose):

Run:  > **docker compose up --build**

- Check in Desktop that image was created and the container is running.
- Then go to localhost:3000
