# Fetch Receipt Processor

A web service implementing the API defined by [`api.yml`](meta/api.yml); a response to the [receipt-processor-challenge](https://github.com/fetch-rewards/receipt-processor-challenge) issued by the [Fetch](https://fetch.com/) team.

## Setup

### Development

* Run `git config --local core.hooksPath hooks/` to use the Git hooks from `/hooks`.

## Attribution

* [`tsconfig.json`](tsconfig.json) was created using a [template](https://www.totaltypescript.com/tsconfig-cheat-sheet).
* [`hooks/pre-commit`](hooks/pre-commit) was reused/adapted from my project [kdi](https://github.com/dGrowl/kdi/blob/main/dev/hooks/pre-commit).
