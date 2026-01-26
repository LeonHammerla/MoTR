import Vue from 'vue';
import VueKonva from 'vue-konva';
import VueMagpie from 'magpie-base';
import App from './App.vue';
import magpieConfig from './magpie.config.js';

Vue.config.productionTip = false;

// Load Konva components
Vue.use(VueKonva, { prefix: 'Canvas' });

// Load magpie components
Vue.use(VueMagpie, magpieConfig);

// Override/extend translations used by $t(...)
// IMPORTANT: do not assign messages.de / messages['de-DE'] (getter-only in this setup)
const i18n = Vue.prototype._i18n;
const messagesStore = i18n && i18n._vm && i18n._vm.$data && i18n._vm.$data.messages;

if (messagesStore) {
  const deMsg = messagesStore.de || messagesStore['de-DE'];

  if (deMsg) {
    deMsg.screens = deMsg.screens || {};
    deMsg.screens.SubmitResultsScreen = deMsg.screens.SubmitResultsScreen || {};

    Object.assign(deMsg.screens.SubmitResultsScreen, {
      waiting: 'Ihre Daten werden übermittelt, bitte warten...',
      done: 'Alles erledigt. Vielen Dank! Die Seite wird automatisch zu den zusätzlichen Tests weitergeleitet.',
      error: 'Beim Hochladen der Ergebnisse ist ein Problem aufgetreten.',
      manual:
        'Um Ihre wertvolle Zeit nicht zu verschwenden, klicken Sie bitte auf die Schaltfläche unten, um Ihre Daten herunterzuladen, und führen Sie dann eine der folgenden Optionen aus:',
      contact: 'Option 1: Senden Sie die Datei als E-Mail-Anhang an die Autor*innen der Studie:',
      download: 'Daten herunterladen',
      upload: 'Option 2: Laden Sie die Daten anonym über folgenden Link hoch:',
      thanks: 'Vielen Dank für Ihre Teilnahme!'
    });
  } else {
    // eslint-disable-next-line no-console
    console.warn(
      '[i18n override] No German locale object found in messagesStore. Available locales:',
      Object.keys(messagesStore)
    );
  }
} else {
  // eslint-disable-next-line no-console
  console.warn('[i18n override] Could not access i18n messages store.');
}

// start app
new Vue({
  render: (h) => h(App)
}).$mount('#app');
