![](https://img.shields.io/badge/status-beta-red.svg)
# Webkit Speech connector for Algolia InstantSearch.js
Webkit Speech connector for Algolia InstantSearch.js allows you to easily add Speech to Text (STT) as a widget to your Algolia search .

This repo is initially developed by [Lextenso](https://www.lextenso.fr), open to the community :hearts: and isn't affiliated or supported by Google or Algolia.

## Built with Web Speech API
This is a middleware between _Algolia InstantSearch.js_ and _Web Speech API_.
This Algolia connector is bundled with the NPM package `instantsearch.js/es/connectors/connectSearchBox`.

The connector handle :
* Microphone browser authorization
* Output text results in search input
* Refine Algolia search with new values in realtime

#### Requirements
This connector doesn't inject any templates, you have to develop your own HTML elements to trigger this connector.

You also need [Algolia](https://www.algolia.com/users/sign_up) credentials.

## Dependencies
* [instantsearch.js](https://github.com/algolia/instantsearch.js/) : 2.10.0

## Installation

### Standalone
Pre-compiled bundle will be available soon on [jsdelivr.com CDN](https://www.jsdelivr.com/) for standalone versions.
You can import the connector from the `/dist` directory.

Or build the connector with Webpack :
```console
lext:webkit-speech-algolia-connector-instantsearch.js$ npm run build
```

### ES Module with Webpack
Import the webkitSpeechAlgoliaConnector module which is available in the `/src` directory.

```js
import webkitSpeechAlgoliaConnector from './webkitSpeechAlgoliaConnector';
```

## Configuration
All attributes are listed and detailed in the [specifications section](#specifications).

#### Standalone
```html
<script type="text/javascript">
const search = instantsearch(config);

// [...]

search.addWidget(
    webkitSpeechAlgoliaConnector.default({
        container: {
            searchInput: [string],
            voiceButton: [string]
        },
        template: {
            onActiveClass: [string],
            onInactiveClass: [string],
            // OR
            onStateChange: [function (state => 'active' || 'inactive')]
        },
        recognitionConfig: {
            lang: [string],
            continuous: [boolean]
        }
    })
);

// [...]

search.start();
</script>
```

#### NPM - Webpack
```js
import InstantSearch from 'instantsearch.js/es/';
import webkitSpeechAlgoliaConnector from './webkitSpeechAlgoliaConnector';

const search = InstantSearch(config);

// [...]

search.addWidget(
    webkitSpeechAlgoliaConnector({
        container: {
            searchInput: [string],
            voiceButton: [string],
        },
        template: {
            onActiveClass: [string],
            onInactiveClass: [string],
            // OR
            onStateChange: [function (state => 'active' || 'inactive')]
        },
        recognitionConfig: {
            lang: [string],
            continuous: [boolean]
        }
    })
);

// [...]

search.start();
```
## Build examples

Two examples are available : Standalone and ES Module.
Each example require Google Chrome (> version 25) to work properly.

Execute this command to build examples.
```console
lext:webkit-speech-algolia-connector-instantsearch.js$ npm run build-example
```

## Specifications
<table>
    <tr>
        <th>Attributes</th>
        <th></th>
        <th></th>
        <th>Required ?</th>
        <th>Comment</th>
    </tr>
    <tr>
        <td>container</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td>searchInput</td>
        <td>[string]</td>
        <td>Yes</td>
        <td>This string must be a <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector">valid CSS selector</a> string.</td>
    </tr>
    <tr>
        <td></td>
        <td>voiceButton</td>
        <td>[string]</td>
        <td>Yes</td>
        <td>This string must be a <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector">valid CSS selector</a> string.</td>
    </tr>
    <tr>
        <td>template</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td>onActiveClass</td>
        <td>[string]</td>
        <td>Yes (except if `onStateChange` is set)</td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td>onInactiveClass</td>
        <td>[string]</td>
        <td>Yes (except if `onStateChange` is set)</td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td>onErrorClass</td>
        <td>[string]</td>
        <td>No (if NOT set `onInactiveClass` will be used)</td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td>onStateChange</td>
        <td>[function (state =&gt; active &vert;&vert;&nbsp;inactive &vert;&vert; error)]</td>
        <td>Yes (Only if `on{state}Class` are not enouth for your needs)</td>
        <td>This callback will be triggered every time the state change.<br/>
        Possible values: active OR inactive OR error<br><strong>NOTE</strong> : This callback function override `onInactiveClass`, `onActiveClass` and `onErrorClass`</td>
    </tr>
    <tr>
        <td>autoHideContainer</td>
        <td></td>
        <td>[boolean &vert;&vert; string]</td>
        <td>No</td>
        <td>Hide the container voiceButton if Web Speech APi isn't supported by the browser.<br>It can be a <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector">valid CSS selector</a> string, if you want to hide parent container.</td>
    </tr>
    <tr>
        <td>recognitionConfig</td>
        <td></td>
        <td></td>
        <td>No</td>
        <td>Web Speech API configuration (<a href="https://developers.google.com/web/updates/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API">see doc</a>)</td>
    </tr>
    <tr>
        <td></td>
        <td>lang</td>
        <td>[string]</td>
        <td>No</td>
        <td>By default it detect the language with the user-agent but it can be define manually.</td>
    </tr>
    <tr>
        <td></td>
        <td>continuous</td>
        <td>[boolean]</td>
        <td>No</td>
        <td>STT stop listening when it detects final sentence</td>
    </tr>
</table>

## Todo

* NPM publish
* Improve documentation

## Author
* Julien Madiot ([@Madi-Ji](https://github.com/Madi-Ji))

---
Google™ and Google Chrome™ are registered trademarks of Google LLC. and might also be trademarks or registered trademarks in other countries. ([Copyright and trademark information](https://www.google.com/permissions/logos-trademarks/))

Algolia and all other trademarks, service marks, graphics and logos used are trademarks or registered trademarks of Algolia or Algolia’s licensors. ([Acceptable use policy](https://www.algolia.com/policies/acceptable-use))
