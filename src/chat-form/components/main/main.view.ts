export default function template() {
  return `
  <div class="mainView">
    <div class="primaryTitle">
      <p>{{title}}</p>
    </div>
    <div class="primaryDescription" v-if="description">
      <p>{{description}}</p>
    </div>
    <textarea class="initMessage" v-model="initMessage" placeholder="Enter your message here"></textarea>
    <button class="btn btn-submit" v-on:click="sendRequest(initMessage)">Ask now</button>
  </div>
  `;
}
