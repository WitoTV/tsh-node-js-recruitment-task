## The Software House - Node.js Developer recruitment task

Hey there!

This is a very old code that clearly needs some improvements :) Can you help us with it?

#### Stage 1 - Code review

Create a new GitHub/BitBucket repository and do a pull request of our code to it. Perform a code review of our code.
What should be changed in your opinion?

#### Stage 2 - Bug fixing

We have tested all of the positive paths in our API, however for some reason our tests are not working properly anymore. Can you fix it?

What's more, the app is not working on production. For some reason nothing is available on address `http://localhost:3000/posts`.
Can you help us?

All of the fixes should be added as a new commit.

#### Stage 3 - new features

Our app lacks a few things:

- validation for post body on `POST /posts` endpoint
- not found page endpoint (right now it is a static page, we want a json response)
- centralized error handling

Can you help us add those features?

### Rules

**Every stage should be added as separate commit.**

**As a result we want to have a repository with single PR containing 3 commits: initial, bugfixing and new features.**  

**Feel free to refactor our code.**