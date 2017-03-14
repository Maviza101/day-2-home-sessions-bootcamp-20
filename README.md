# How to run this project
* Clone this repo.
```bash
git clone https://github.com/Maviza101/day-1-home-sessions-bootcamp-20.git
```
* Open a terminal and `cd` (i.e navigate) into the directory of the repo you cloned above.
* Enter this command:
```bash
npm install -g
```
* This will install the project globally on your machine. So, you can call:
```bash
spotify-artists lecrae
```
from any directory on your computer and it will give you the appropriate results.
* You can also run the spec/test files for the project as follows:
```bash
npm test
```

## Options
* You may add the following options to your command:
**`[-n|--page-number]` : State if you want to see page 1, 2, 3 etc. Default is 
1. Maximum is 100,000.
**`[-p|--per-page]` : State if you want to see 5 results per page, 2 results per 
page, 20 results per page etc. Default is 10. Maximum is 50.


## Examples
```bash
spotify-artists lecrae -p 15
spotify-artists lecrea -p 30 -n 15
spotify-artists lecrae -n 4
```

## Adding your own tests
* Just add them under the `tests` directory and save them with the format `someFunctionality_spec.js`.
* Run `npm` tests again and it will all tests, both new and old.
