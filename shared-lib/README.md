# Shared npm library for the project

###

install package

-   npm

```
    npm install @promentor-app/shared-lib
```

-   yarn

```
    yarn add @promentor-app/shared-lib
```

### CI/CD

<img src="https://github.com/Pro-Mentor/shared-lib/blob/main/assets/NPM_Deployment.png" alt="CI/CD diagram" title="CI/CD Diagram">

### content

-   shared code for projects
-   setup unit test with morcha
-   setup Type Script, eslint and Prettier
-   githook with husky
-   setup CI pipeline for run Unit test, Snyk securiy check and SonarCloud quelity check with GitHub actions
-   CD pipeline for publish package to NPM Registry with GitHub actions

### Reference:

-   https://snyk.io/blog/best-practices-create-modern-npm-package/
