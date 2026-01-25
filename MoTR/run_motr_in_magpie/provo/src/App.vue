<!-- Window is fixed, 102px, pointer cursor, gradual blurry effect on surrounding words. -->
<!--  Comprehension questions appear afterwards in the same slide -->

<template>
  <Experiment title="Mouse tracking for Reading" translate="no">

    <Screen :title="'Willkommen!'" class="instructions" :validations="{
        SubjectID: {
          minLength: $magpie.v.minLength(2)
        }
      }">
        <!-- <WelcomeScreen /> -->
        <div style="width: 40em; margin: auto;">

        <div style="background-color: lightgrey; padding: 10px;">
            <b> Vielen Dank fürs Mitmachen! </b>
        </div>
        <p>
          Vielen Dank, dass Sie bereit sind an unserer Studie teilzunehmen. Bei diesem Experiment müssen Sie Sätze lesen. Danach beantworten Sie Fragen dazu. Wenn Sie lesen, sehen Sie immer nur einen bestimmten Teil. Mit der Maus können Sie steuern, welcher Teil des Textes sichtbar ist. Bevor wir mit dem Experiment anfangen, brauchen wir Ihre Zustimmung.
        <br><br>
          Sie können immer mit der Studie aufhören. Das hat keine Nachteile für Sie.
		<br><br>
		Nach dem Experiment bitten wir Sie noch, an zwei Tests teilzunehmen. Beim ersten Test geht es um Ihren Wortschatz. Beim zweiten Test geht es um Ihr Gedächtnis. Nach dem Experiment werden Sie für die Tests auf eine neue Webseite weitergeleitet.
		 <br><br>
        </p>

        <br>
        <div style="background-color: lightgrey; padding: 10px;">
            <b> Einverständniserklärung </b>
        </div>
        <br>
        Ich stimme der Teilnahme an dieser Studie zu. Mir ist bewusst <br>
        <div style="padding-left: 30px">• dass meine Daten in pseudonymisierter Form gespeichert und eventuell veröffentlicht werden, </div>
        <div style="padding-left: 30px">• dass ich freiwillig teilnehme und nicht teilnehmem muss,</div>
        <div style="padding-left: 30px">• und dass ich jederzeit mit der Teilnahme aufhören kann.</div>
        <br>

          
          Geben Sie hier bitte ein selbstgewähltes Codeword ein.
		  Dabei kann es sich um eine beliebige Kombination von Buchstaben und Zahlen handeln. 
		  Das Codeword sollte keine Rückschlüsse auf Ihren Namen zulassen. 
		  Zum Nachweis, dass Sie am Experiment teilgenommen haben, gehen Sie nach Beendigung des Experiments zur Olat-Seite des Kurses und geben Sie das Codeword im Fragebogen "Codeword für Internetexperiment" 
		  ein.<br><br>
		  <tr> <td>&nbsp</td><td style="text-align: center;"><input name="TurkID" type="text" class="obligatory" v-model="$magpie.measurements.SubjectID"/></td>
          </tr>
          <tr>

          </tr>
          </div>
          <div v-if="
            $magpie.measurements.SubjectID&&
            !$magpie.validateMeasurements.SubjectID.$invalid
            ">
          <br> Hier geht es weiter zur Studie: <br><br>
          <br />
          <button 
            @click="$magpie.addExpData({ SubjectId: $magpie.measurements.SubjectID}); $magpie.nextScreen()">
            Weiter
          </button>

          </div>
        </Screen>


    <InstructionScreen :title="'Anleitung'">
<!-- 
      <p>Please use the "Fullscreen Mode" for the duration of the experiment:
        <a href="javascript:void(0)" @click="turnOnFullScreen">Fullscreen Mode</a>
      </p>
 -->
      <p style="margin-bottom: 5em;">In diesem Experiment müssen Sie kleine Geschichten lesen. Aber den Text kann man nur sehen, wenn Sie mit der Maus darüber fahren. Lesen Sie so schnell wie möglich. Aber am wichtigsten ist: Sie müssen die Fragen am Ende des Textes richtig beantworten können.<br><br>
	  In den Geschichten berichtet ein Schüler über die Gespräche seiner Familie beim Abendessen. Die Familienmitglieder sind den ganzen Tag unterwegs. Am Abend haben alle viel zu erzählen.
	  Der Schüler selbst erzählt, was er am Tag so erlebt hat und was er in der Schule gehört hat. Seine Geschwister, Sara, Milan und Lina erzählen ebenfalls, was es Neues gibt. Und auch die Eltern und Großeltern berichten etwas.
	  Jede Geschichte sehen Sie zunächst nur verschwommen. Um die 
verschwommene Schrift lesen zu können, müssen Sie mit der Maus 
darüberfahren. Fahren Sie mit der Maus vom Beginn der Geschichte bis 
zum Ende und lesen sie aufmerksam, mit ihrer normalen Geschwindigkeit. 
Merken Sie sich dabei, was passiert ist. Am Ende gibt es zu jeder 
Geschichte eine Frage, die Sie mit ja oder nein beantworten sollen. 
Beantworten Sie die Frage zügig, anschließend erscheint dann die 
nächste Geschichte. </br>
Gleich können Sie das Lesen mit der Maus üben. Drücken Sie dazu auf 
den "Weiter"-Knopf.</p>
    </InstructionScreen>

    <template v-for="(trial, i) of trials">
      <Screen :key="i" class="main_screen" :progress="i / trials.length">
        <Slide>
          <form>
            <input type="hidden" class="item_id" :value="trial.item_id">
            <input type="hidden" class="experiment_id" :value="trial.experiment_id">
			<input type="hidden" class="experiment_num" :value="trial.experiment_num">
            <input type="hidden" class="condition_id" :value="trial.condition_id">
			<input type="hidden" class="condition_num" :value="trial.condition_num">
          </form>
          <div class="oval-cursor"></div>
          <template>
            <div v-if="showFirstDiv" class="readingText" @mousemove="moveCursor" @mouseleave="changeBack">
              <template v-for="(word, index) of trial.text.split(' ')">
                <span :key="index" :data-index="index" >
                  {{ word }}
                </span>
              </template>
            </div>
            <div class="blurry-layer" style="opacity: 0.3; filter: blur(3.5px); transition: all 0.3s linear 0s;"> 
              {{trial.text}}
            </div>
          </template>
          <button v-if="showFirstDiv" style= "bottom:40%; transform: translate(-50%, -50%)" @click="toggleDivs" :disabled="!isCursorMoving">
          Fertig
          </button>

          <div v-else style = "position:absolute; bottom:15%; text-align: center; width: 100%; min-width: -webkit-fill-available;" >
            <template>
              <form>
                <!-- comprehension questions and the response options -->
                <div>{{ trial.question.replace(/ ?["]+/g, '') }}</div>
                <template v-for='(word, index) of trial.response_options'>
                  <input :id="'opt_'+index" type="radio" :value="word" name="opt" v-model="$magpie.measurements.response"/>{{ word }}<br/>
                    <!-- <label :for="'opt_'+index"> {{ word }}&nbsp</label> -->
                </template>
              </form>
            </template>
          </div>
          
          <button v-if="$magpie.measurements.response" style="transform: translate(-50%, -50%)" @click="toggleDivs(); $magpie.saveAndNextScreen()">
            Weiter
          </button>
        </Slide>
      </Screen>
    </template>
<Screen>
 
  <p>Welche Hand haben Sie während des Experiments verwendet?</p>
    <MultipleChoiceInput
        :response.sync= "$magpie.measurements.hand"
        orientation="horizontal"
        :options="['links', 'rechts', 'beide']" />
  <button style= "bottom:30%; transform: translate(-50%, -50%)" @click="$magpie.saveAndNextScreen();">Submit</button>
</Screen>

    <SubmitResultsScreen />
  </Experiment>
</template>

<script>
// Load data from csv files as javascript arrays with objects
import stimuli_list1 from '../trials/stimuli_list1.tsv';
import stimuli_list2 from '../trials/stimuli_list2.tsv';
import stimuli_list3 from '../trials/stimuli_list3.tsv';
import stimuli_list4 from '../trials/stimuli_list4.tsv';
import provo_practice from '../trials/provo_items_practice.tsv';
import _ from 'lodash';

export default {
  name: 'App',
  data() {
    const lists = [stimuli_list1, stimuli_list2, stimuli_list3, stimuli_list4];
    const chosenItems = lists[Math.floor(Math.random() * lists.length)]; // randomly choose one of the lists
    const shuffledItems = _.shuffle(chosenItems); 
    const trials = _.concat(provo_practice, shuffledItems);
    // Create a new column in localCoherences called 'response_options'
    // that concatenates the word in response_true with the two words in response_false
    const updatedTrials = trials.map(trial => {
      return {
        ...trial,
        response_options: _.shuffle(`${trial.response_true}|${trial.response_false}`.replace(/ ?["]+/g, "").split("|")),
      }
    });
    return {
      isCursorMoving: false,
      trials: updatedTrials,
      currentIndex: null,
      showFirstDiv: true,
      // currentItem: null,
      mousePosition: {
          x: 0,
          y: 0,
        },
  }},
  computed: {
  },
  mounted() { 
    setInterval(this.saveData, 50);
    },
  methods: {
    changeBack() {
      this.$el.querySelector(".oval-cursor").classList.remove('grow');
      this.$el.querySelector(".oval-cursor").classList.remove('blank');
      this.currentIndex = null;
    },
    saveData() {
        if (this.currentIndex !== null) {
          const currentElement = this.$el.querySelector(`span[data-index="${this.currentIndex}"]`);
          if (currentElement) {
            const currentElementRect = currentElement.getBoundingClientRect();
            $magpie.addTrialData({
              Experiment: this.$el.querySelector(".experiment_id").value,
              Condition: this.$el.querySelector(".condition_id").value,
              ItemId: this.$el.querySelector(".item_id").value,
			  ExperimentNum: this.$el.querySelector(".experiment_num").value,
			  ConditionNum: this.$el.querySelector(".condition_num").value,
              Index: this.currentIndex,
              Word: currentElement.innerHTML,
              mousePositionX: this.mousePosition.x,
              mousePositionY: this.mousePosition.y,
              wordPositionTop: currentElementRect.top,
              wordPositionLeft: currentElementRect.left,
              wordPositionBottom: currentElementRect.bottom,
              wordPositionRight: currentElementRect.right
              // wordPositionTop: currentElement.offsetTop,
              // wordPositionLeft: currentElement.offsetLeft,
              // wordPositionBottom: currentElement.offsetHeight + currentElement.offsetTop,
              // wordPositionRight: currentElement.offsetWidth + currentElement.offsetLeft
          });
        } else {
          $magpie.addTrialData({
              Experiment: this.$el.querySelector(".experiment_id").value,
              Condition: this.$el.querySelector(".condition_id").value,
              ItemId: this.$el.querySelector(".item_id").value,
			  ExperimentNum: this.$el.querySelector(".experiment_num").value,
			  ConditionNum: this.$el.querySelector(".condition_num").value,
              Index: this.currentIndex,
              mousePositionX: this.mousePosition.x,
              mousePositionY: this.mousePosition.y,
          });
          
        }
      }},
    moveCursor(e) {
      this.isCursorMoving = true;
      this.$el.querySelector(".oval-cursor").classList.add('grow');
      let x = e.clientX;
      let y = e.clientY;
      const elementAtCursor= document.elementFromPoint(x, y).closest('span');
      if (elementAtCursor){
        this.$el.querySelector(".oval-cursor").classList.remove('blank');
        this.currentIndex = elementAtCursor.getAttribute('data-index');
      } else {
        this.$el.querySelector(".oval-cursor").classList.add('blank');
        const elementAboveCursor = document.elementFromPoint(x, y-3).closest('span');
        if (elementAboveCursor){
          this.currentIndex = elementAboveCursor.getAttribute('data-index');
        } else {
          this.currentIndex = -1;
        }
      }
      
      this.$el.querySelector(".oval-cursor").style.left = `${x+12}px`;
      this.$el.querySelector(".oval-cursor").style.top = `${y-6}px`;
      this.mousePosition.x = e.clientX;
      this.mousePosition.y = e.clientY;
      // this.mousePosition.x = e.offsetX;
      // this.mousePosition.y = e.offsetY;
    },
    toggleDivs() {
    this.showFirstDiv = !this.showFirstDiv;
    this.isCursorMoving = false;
    },
   //  async turnOnFullScreen() {
//       if (!document.fullscreenElement) {
//         try {
//           await document.documentElement.requestFullscreen();
//           return true;
//         } catch (e) {
//           return false;
//         }
//       }
//       return true;
//     },
//     turnOffFullScreen() {
//       document.exitFullscreen();
//     },
    getScreenDimensions() {
      return {
        window_inner_width: window.innerWidth,
        window_inner_height: window.innerHeight
      };
    }
  },
};
</script>


<style>
  .experiment {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .main_screen {
    isolation: isolate;
    position: relative;
    width: 100%;
    height: auto;
    font-size: 18px;
    line-height: 40px;
  }
  .debugResults{
    width: 100%;
  }
  .readingText {
    /* z-index: 1; */
    position: absolute;
    color: white;
    text-align: left;
    font-weight: 450;
    cursor: pointer;
    padding-top: 2%;
    padding-bottom: 2%;
    padding-left: 11%;
    padding-right: 11%;
  }
  button {
    position: absolute;
    bottom: 0;
    left: 50%;
  }
  .oval-cursor {
    position: fixed;
    z-index: 2;
    width: 1px;
    height: 1px;
    transform: translate(-50%, -50%);
    background-color: white;
    mix-blend-mode: difference;
    border-radius: 50%;
    pointer-events: none;
    transition: width 0.5s, height 0.5s;
  } 
  .oval-cursor.grow.blank {
    width: 80px;
    height: 13px;
  }
  .oval-cursor.grow {
    width: 102px;
    height: 38px;
    border-radius: 50%;
    box-shadow: 30px 0 8px -4px rgba(255, 255, 255, 0.1), -30px 0 8px -4px rgba(255, 255, 255, 0.1);
    background-color: rgba(255, 255, 255, 0.3);
    background-blend-mode: screen;
    pointer-events: none;
    transition: width 0.5s, height 0.5s;
    filter:blur(3px);
  }
  .oval-cursor.grow::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 70%;
    background-color: white;
    mix-blend-mode: normal;
    border-radius: 50%;
}
  .blurry-layer {
    position: absolute;
    pointer-events: none;
    color: black;
    text-align: left;
    font-weight: 450;
    padding-top: 2%;
    padding-bottom: 2%;
    padding-left: 11%;
    padding-right: 11%;
  }

  * {
    user-select: none; /* Standard syntax */
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    }

</style>

