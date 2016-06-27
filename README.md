##Poll Factory

This is a polling application built with Rails, JavaScript and React.

The production site can be found at: https://poll-factory.herokuapp.com/

A user can do the following:
* Create an account
* Log in and log out of account
* Logged in user can create polls
* Polls can be shared via Twitter or by sharing the link
* Unregistered users can vote on the poll without logging in
* Voters are prevented from voting multiple times by storing their vote in localStorage
* Chart.js is used to display the results of the vote after a user has voted
* Polls can be created with an expiration date, after which voting is disabled

### Installation

To install the application, clone via ```git``` and pull in gem dependencies with ```bundler```:

```
$ git clone git@github.com:ksk5280/poll-factory.git
$ cd poll-factory
$ bundle install
```

To set up the database run:

```
$ bundle exec rake db:{create,migrate}
```

To start server:
```
$ rails s
```
Navigate to ```http://localhost:3000```

### Testing with RSpec

Tests can be run by typing ```rspec``` in the terminal.
