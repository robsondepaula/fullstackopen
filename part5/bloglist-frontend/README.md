# Description

This folder contains the frontend part of the blog list app and its details come from part 5 of the course.

The backend was written on the part 4.

## Running

End to end functionality can be checked by starting the backend:
```
./run_service.sh
```

And then the frontend:
```
npm start
```

## e2e with Cypress

Start the backend in test mode:
```
./run_service.sh test
```

The frontend:
```
npm start
```

And then Cypress:
```
npm run cypress:open
```