# Watson Developer Cloud Webpack Example

This example app shows a basic client and server setup to use the Watson JS SDK in a client-side context.

The example here uses [express](http://expressjs.com/) to serve the content and [webpack](https://www.npmjs.com/package/webpack-dev-middleware) and
[webpack-dev-middleware](https://www.npmjs.com/package/webpack-dev-middleware) to generate the client-side bundle.

## Important notes

A server-side component is required to generate auth tokens for services that use an IAM apikey.

Not all Watson services currently support [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS),
and in some cases, certain methods work while others do not. Below is a partial list of service support:

The following services support CORS

- Tone Analyzer
- Speech to Text\*
- Text to Speech\*
- Personality Insights
- Visual Recognition
- Natural Language Understanding
- Watson Assistant

* Speech to Text and Text to Speech should be usable via the Node.js SDK, but we also have a [Speech JavaScript SDK](https://www.npmjs.com/package/watson-speech) that was specifically written for browser support.

The following services do not support CORS

- Language Translator

## Webpack configuration

The `ibm-watson` Node SDK version 5+ should work out of the box with most bundlers, including webpack.

In most cases, you will want to add the following in your webpack.config.js file:

```js
node: {
  // see http://webpack.github.io/docs/configuration.html#node
  // and https://webpack.js.org/configuration/node/
  fs: 'empty',
  module: 'empty',
  net: 'empty',
  tls: 'empty',
},
```
so that it should look like this:
```js
module.exports = {
  mode: 'development',
  entry: './public/client.js',
  output: {
    filename: 'bundle.js',
  },
  node: {
    // see http://webpack.github.io/docs/configuration.html#node
    // and https://webpack.js.org/configuration/node/
    fs: 'empty',
    module: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
```

Several services use the `fs` and `module` libraries, which won't work in browser environments, and the `request` library loads `fs`,
`net`, and `tls`, but shouldn't need any of them for basic usage because webpack automatically includes [equivalent libraries](https://www.npmjs.com/package/node-libs-browser).
