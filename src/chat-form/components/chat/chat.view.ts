export default function template() {
  return `
  <div class="chatView">
    <div class="messagesWindow">
      <div v-for="item in messages" class="message" v-bind:class="{ client: item.isClient }">
        {{item.message}}
        <div v-if="item.type === 'countdown'">
          COUNTDOWN STARTED
        </div>
      </div>
    </div>
    <div class="inputBox">
      <textarea placeholder="Enter your message..."></textarea>
      <button>
       Send
      </button>
    </div>
  </div>
  `;
}
