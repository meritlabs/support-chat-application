# Merit Support Bot

Merit Support Discord bot.

# Getting started

To work on this project, you need:
- node.js

Start with installing dependencies:
```
npm install 
```

Prepare the package by running:
```
npm run prepare
```

Check out the configuration file `src/common/env/dev.ts` for development and `src/common/env/prod.ts` for production usage.

Run the server:
```
npm run  start # for production
npm run  start:dev # for development
```

Deploy it:
```
./deploy.sh
```

The application is designed to be deployed to Heroku, but can be used on bare metal or in container.

## Contributing

Please, check out our [Contribution guide](./CONTRIBUTING.md) and [Code of Conduct](./CODE_OF_CONDUCT.md).

## License

**Code released under [the MIT license](./LICENSE).**

Copyright (C) 2017 - 2021 The Merit Foundation.

