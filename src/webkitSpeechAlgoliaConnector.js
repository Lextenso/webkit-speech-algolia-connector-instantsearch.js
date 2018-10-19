let toFactory = require('to-factory');
/**
* @module lextenso/webkit-speech-algolia-connector-instantsearch.js
*/

class webkitSpeechAlgoliaConnectorClass {
    constructor(connectorRenderingOptions, isFirstRendering) {
        if (!isFirstRendering) return;

        this.renderingOptions = connectorRenderingOptions;
        this.config = this.renderingOptions.widgetParams;

        if(!this.isAvailable()){
            return;
        }

        this.initialize();

        let triggerButton = document.querySelector(this.config.container.voiceButton);
        if(triggerButton !== null){
            triggerButton.addEventListener('click', this.doStart.bind(this));
        }
        return this;
    }

    initialize() {
        if (!this.renderingOptions || !this.renderingOptions.widgetParams.template || !this.renderingOptions.widgetParams.container) {
            throw new Error('webkitSpeechAlgoliaConnector.js: Missing required connector config.');
        }

        if(!this.config.container.searchInput || !this.config.container.voiceButton){
            throw new Error('webkitSpeechAlgoliaConnector.js: Missing required container config.');
        }

        this.isListening = false;

        const defaultRecognitionConfig = {
            onresult: this.onResult.bind(this),
            onerror: this.setError.bind(this),
            interimResults: true,
            continuous: false
        }
        this.recognitionConfig = {
            ...this.config.recognitionConfig,
            ...defaultRecognitionConfig
        };
        delete this.config.recognitionConfig;

        return this;
    }

    isAvailable() {
        const available = ('webkitSpeechRecognition' in window);
        if (!available) {
            this.autoHideContainer();
        }
        return available;
    }

    autoHideContainer() {
        if(typeof this.config.autoHideContainer === 'boolean' && this.config.autoHideContainer){
            document.querySelector(this.config.container.voiceButton).style.display = 'none';
        } else if (typeof this.config.autoHideContainer === 'string'){
            document.querySelector(this.config.autoHideContainer).style.display = 'none';
        } else {
            this.switchBtnClassByState('error');
        }
    }

    switchBtnClassByState(state='active') {
        if(typeof this.config.template.onStateChange === 'function'){
            return this.config.template.onStateChange(state);
        }
        const containerClassList = document.querySelector(this.config.container.voiceButton).classList;
        if(typeof this.config.template.onErrorClass !== 'undefined' && containerClassList.contains(this.config.template.onErrorClass)){
            containerClassList.remove(this.config.template.onErrorClass)
        }
        if(state === 'inactive' || (state === 'error' && typeof this.config.template.onErrorClass === 'undefined')) {
            if(containerClassList.contains(this.config.template.onActiveClass)){
                containerClassList.replace(this.config.template.onActiveClass, this.config.template.onInactiveClass);
            } else {
                containerClassList.add(this.config.template.onInactiveClass);
            }
        } else if (state === 'active') {
            if(containerClassList.contains(this.config.template.onInactiveClass)){
                containerClassList.replace(this.config.template.onInactiveClass, this.config.template.onActiveClass);
            } else {
                containerClassList.add(this.config.template.onActiveClass);
            }
        } else if(state === 'error' && typeof this.config.template.onErrorClass === 'string'){
            if(containerClassList.contains(this.config.template.onActiveClass)){
                containerClassList.remove(this.config.template.onActiveClass)
            }
            if(containerClassList.contains(this.config.template.onInactiveClass)){
                containerClassList.remove(this.config.template.onInactiveClass)
            }
            containerClassList.add(this.config.template.onErrorClass);
        }
        return true;
    }

    doStart() {
        if(typeof this.isListening === 'boolean' && !this.isListening){
            this.recognition = new webkitSpeechRecognition();

            Object.keys(this.recognitionConfig).forEach((prop) => {
                if(prop in this.recognition){
                    this.recognition[prop] = this.recognitionConfig[prop];
                } else {
                    console.warn('webkitSpeechAlgoliaConnector.js: '+prop+' doesn\'t exist in SpeechRecognition');
                }
            });

            this.recognitionStart();
        } else if (typeof this.isListening === 'boolean' && this.isListening) {
            this.recognitionStop();
        } else {
            throw new Error('webkitSpeechAlgoliaConnector.js: Something went wrong.');
        }
    }

    recognitionStart(){
        this.recognition.start();
        this.isListening = true;
        document.querySelector(this.config.container.searchInput).value = '';
        this.switchBtnClassByState('active');
    }

    onResult(data) {
        let previousQuery = document.querySelector(this.config.container.searchInput).value || '';
        let query = '';

        for(let i = data.resultIndex; i < data.results.length; ++i) {
            console.log(data.results[i]);
            if(typeof data.results[i] !== 'undefined' && typeof data.results[i].isFinal === 'boolean' && data.results[i].isFinal){
                query = data.results[i][0].transcript;
                if(typeof this.recognition.continuous === 'boolean' && !this.recognition.continuous){
                    this.recognitionStop();
                }
            } else {
                query += data.results[i][0].transcript;
            }
        }

        query = query.trim();
        if(query !== '' && previousQuery !== query){
            this.renderingOptions.refine(query);
        }
    }

    recognitionStop(){
        if(this.isListening){
            this.isListening = false;
            this.recognition.stop();
            this.switchBtnClassByState('inactive');
        }
    }

    setError(err){
        this.recognition.stop();
        this.isListening = false;
        this.switchBtnClassByState('error');
        console.error(err);
        throw new Error('webkitSpeechAlgoliaConnector.js: Something went wrong.');
    }

};

export default toFactory(webkitSpeechAlgoliaConnectorClass);
