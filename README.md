# exnaton

## Table of Contents

- [About](#about)
- [Installing](#getting_started)
- [Usage](#usage)

## About <a name = "about"></a>

This is an application to display the readings for a [Smart Meter](https://en.wikipedia.org/wiki/Smart_meter) and a few metrics about the time series. It is written in React and uses Material-UI for the UI. The [backend](https://github.com/diasjuniorr/exnaton-backend) was writen in Node.js and uses the [Express](https://expressjs.com/) framework and Postgres for the database.

## Installing <a name = "installing">

Clone the repo and run `yarn install`

To start the application run `yarn start`

You'll need the backend to be running as well. It can be found [here](https://github.com/diasjuniorr/exnaton-backend)

## Usage <a name = "usage"></a>

Select the Smart Meter by informing its ID, then select the type of measurement you want to see. (e.g energy). Then select the data range you'd like to analyze and it will generate the metrics and the graph for the time series selected.
