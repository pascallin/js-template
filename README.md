# js-template

some javascript template stater for usage

## quick start

```shell
npm i -g @thruster/cli
thruster create --from git --resource github.com:pascallin/js-template --path packages/react-antd-control-panel new-project
```

## Development

```shell
yarn // or npm i
yarn lerna bootstrap
// start scripts example
yarn lerna run start --parallel
```

## packages templates

### typescript-basic-template

#### tech stack

- `eslint` & `prettier` for code style
- `commintlint` & `lint-staged` & `husky` for commit style and git hook
- `typescript` & `tsnode` & `nodemon` for code running

### ts-apollo-server

#### tech stack

- `apollo-server`
- `graphql-import` for collect graphql schema
- `graphql-tools`

### react-ant-control-panel

- `eslint` for code style
- react
- redux
- antd
- styled-components
