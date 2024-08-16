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

--build flag will build images before starting containers ([https://docs.docker.com/reference/cli/docker/compose/up/](https://docs.docker.com/compose/reference/))

- Check in Desktop that image was created and the container is running.
- Then go to localhost:3000

Stop and clean up: **> docker compose down** (Stop and remove containers, networks)

(*) Docker compose CLI doc: [https://docs.docker.com/compose/reference/](https://docs.docker.com/compose/reference/)


## Run server in debug mode (VSCode) - Server Side:

Check: [ https://nextjs.org/docs/pages/building-your-application/configuring/debugging#debugging-with-vs-code]()

* Having the ".vscode/launch.json", simply go to the debug tab and click run (or F5)
* Now simply add breakpoints on any server-side code (e.g. any server action).

## Debug Front-end (Chrome DevTools):

Check: [ https://nextjs.org/docs/pages/building-your-application/configuring/debugging#debugging-with-chrome-devtools]()

* Add `debugger;` anywhere in front-end code. (Tip: Find any file with `'use client;'` and add it there)
  * PS: I have an example in the code: search for 'debugger;', uncomment them and hit the 'edit' (pencil) on any invoice to see it stop there.
* Open Chrome's Developer Tools, then go to the Sources tab.
  * This will show the code and scope variables, etc. as well as 'step over' or 'continue'.

(PS: you can do this front-end debug while also still running the server in debug mode)
