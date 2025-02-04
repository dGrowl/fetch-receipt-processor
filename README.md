# Fetch Receipt Processor

A web service implementing the API defined by [`api.yaml`](meta/api.yaml); a response to the [receipt-processor-challenge](https://github.com/fetch-rewards/receipt-processor-challenge) issued by the [Fetch](https://fetch.com/) team. It's written primarily in [TypeScript](https://www.typescriptlang.org/) using the [Fastify](https://fastify.dev/) server framework.

## Usage

Start by cloning this repository, then follow your preferred directions below.

```sh
git clone https://github.com/dGrowl/fetch-receipt-processor.git
```

### Production

There are two options for building and running the production server: a containerized [Docker](https://www.docker.com/) solution and a more hands-on [Node](https://nodejs.org/) version.

#### Docker

From the project root, run the following commands to build an image and run a server container based on that image.

```sh
docker build -t dgrowl/receipt-processor-api:latest .
docker run -d --name receipts-server -p 127.0.0.1:3000:3000 dgrowl/receipt-processor-api:latest
```

> If you *do* have Node, you can also run these commands as the `npm` scripts `docker:build` and `docker:run`.

#### Node

From the project root, run the following commands to install dependencies, generate the build, and run the server.

```sh
npm install
npm run build
npm run start
```

### Development

This is a [Node](https://nodejs.org/)-based project, so it's required for development. First, install all project dependencies with `npm install`. After that, you can use `npm run dev` or `npm run test` to start an auto-reloading development server or test suite, depending on your interests. You can also configure `git` to use the included hook, which blocks commits if there are issues with the local codebase, by running `git config --local core.hooksPath hooks/`.

## API

Once a server is started via one of the above methods, you can communicate with it via the following endpoints.

### Endpoint: Process Receipts

* Path: `/receipts/process`
* Method: `POST`
* Payload: Receipt JSON
* Response: JSON containing an id for the receipt.

Takes in a JSON receipt and returns a JSON object with an ID.

```ts
interface Receipt { // For example:
	retailer: string // "Store"
	purchaseDate: string // "2022-03-20"
	purchaseTime: string // "14:33"
	items: { shortDescription: string, price: string }[]
	/* [
		{"shortDescription": "Drink", "price": "2.25"},
		{"shortDescription": "Cookies", "price": "1.75"}
	] */
	total: string // "4.00"
}
```

The ID returned is the ID that should be passed into `/receipts/{id}/points` to get the number of points the receipt was awarded.

##### Example `curl`

```sh
curl -H 'Content-Type:application/json' -d '{"retailer": "Store", "purchaseDate": "2022-03-20", "purchaseTime": "14:33", "items": [{"shortDescription": "Drink", "price": "2.25"}, {"shortDescription": "Cookies", "price": "1.75"}], "total": "4.00"}' 127.0.0.1:3000/receipts/process
```

##### Example Response:

```json
{ "id": "7fb1377b-b223-49d9-a31a-5a02701dd310" }
```

### Endpoint: Get Points

* Path: `/receipts/{id}/points`
* Method: `GET`
* Response: A JSON object containing the number of points awarded.

A simple Getter endpoint that looks up the receipt by the ID and returns an object specifying the points awarded.

##### Example `curl`

```sh
curl 127.0.0.1:3000/receipts/7fb1377b-b223-49d9-a31a-5a02701dd310/points
```

##### Example Response

```json
{ "points": 95 }
```

## Attribution

* [`tsconfig.json`](tsconfig.json) was created using a [template](https://www.totaltypescript.com/tsconfig-cheat-sheet).
* [`hooks/pre-commit`](hooks/pre-commit) was reused/adapted from my project [kdi](https://github.com/dGrowl/kdi/blob/main/dev/hooks/pre-commit).
