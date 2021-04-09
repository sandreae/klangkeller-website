# KLANGKELLER

Website and booking platform for [klangkeller](www.klangkeller.net)

*This is not a template repo, it contains documentation files specific to this instance. This may be improved in the future, but for now that's the way it is. If you want to deploy your own instance, clone this repo and then delete all files in public/documentation and views/documentation (except for the root view documentation.ejs). Then you can configure the site following the instructions below.*

---
## Requirements

For development, you will need Node.js and a node global package. In addition to this you will need either mongodb running locally or to run using docker. 

### Node
#### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm
---

## Install

    $ git clone https://github.com/sandreae/klangkeller-website
    $ cd klangkeller-website
    $ npm install

## Configure app

Edit `config/default.json` with your own information, it might look something like this:

```
{
    "Site": {
        "title": "KLANGKELLER",
        "venues": ["kino", "keller", "hof"],
        "organisers": [{"name": "organiser1", "email": "organiser1[at]klangkeller.net"},{"name": "organiser2", "email": "organiser2[at]klangkeller.net"}],
        "dbString": null,
        "user": "admin",
        "password": "change-me-bad-password",
        "contentPath": "default"
    }
}
```

You also need to set these environment variables:

```
MONGO_URL=db_string
USER=admin
PASSWORD=password
NODE_APP_INSTANCE=default
```

These overide the variables `dbString`, `user` and `password` in the config file above and should be set for security reasons.

If you want to run multiple instances of this app, deployed from the same repo, you can configure this by creating new config and content files and setting the `NODE_APP_INSTANCE` appropriately.

## Running the project

    $ npm start
    $ npm run dev

## Docker
#### Locally
    $ docker-compose up

#### Dokku deployment
    $ dokku git:from-image sandreae/klangkeller:latest

## TODO

Improve how documentation is handled. Currently it is manually placed in named folders in public/document and corresponding ejs template files must be created.