# Contributing

**Working on your first Pull Request?** You can learn how from this _free_ series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

## Setting up the project locally

To install the project you need to have `npm` or `yarn` and `node`

1.  [Fork](https://help.github.com/articles/fork-a-repo/) the project, clone your fork:

    ```
    # Clone your fork
    git clone https://github.com/<your-username>/react-semantic-ui-datepickers.git

    # Navigate to the newly cloned directory
    cd react-semantic-ui-datepickers
    ```

2.  `npm install` or `yarn` to install dependencies
3.  `npm run storybook` or `yarn storybook` to start Storybook

> Tip: Keep your `master` branch pointing at the original repository and make
> pull requests from branches on your fork. To do this, run:
>
> ```
> git remote add upstream https://github.com/arthurdenner/react-semantic-ui-datepickers.git
> git fetch upstream
> git branch --set-upstream-to=upstream/master master
> ```
>
> This will add the original repository as a "remote" called "upstream,"
> Then fetch the git information from that remote, then set your local `master`
> branch to use the upstream master branch whenever you run `git pull`.
> Then you can make all of your pull request branches based on this `master`
> branch. Whenever you want to update your version of `master`, do a regular
> `git pull`.

## Submitting a Pull Request

Please go through existing issues and pull requests to check if somebody else is already working on it, we use `someone working on it` label to mark such issues.

Also, make sure to run the tests before you commit your changes:

`npm run test` or `yarn test`.

## Add yourself as a contributor

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

To add yourself to the table of contributors on the `README.md`, please use the
automated script as part of your PR:

`npm run add-contributor` or `yarn add-contributor`

Follow the prompt and commit `.all-contributorsrc` and `README.md` in the PR.

Thank you for taking the time to contribute! 👍
