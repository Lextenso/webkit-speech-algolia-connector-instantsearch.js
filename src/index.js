import connectSearchBox from 'instantsearch.js/es/connectors/search-box/connectSearchBox';
import webkitSpeechConnectorFactory from './webkitSpeechAlgoliaConnector';
import version from './version';

let webkitSpeechConnector = connectSearchBox(webkitSpeechConnectorFactory);
webkitSpeechConnector.version = version;
webkitSpeechConnector.isAvailable = ('webkitSpeechRecognition' in window);

module.exports = webkitSpeechConnector;
