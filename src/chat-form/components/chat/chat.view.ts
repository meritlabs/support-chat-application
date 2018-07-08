export default function template() {
  return `
  <div class="chatView">
    <div class="messagesWindow">
      <div v-for="item in messages" class="message" v-bind:class="{ client: item.isClient }">
        {{item.message}}
        <div v-if="item.type === 'countdown'">
          <p><strong>Help on the go!</strong></p>
          <div class="countdown">
            <div>
              {{countdown | toMinutes}}
            </div>
            :
            <div>
              {{countdown | toSeconds}}
            </div>
          </div>
          <p><small>Your request posted in the community, 
            please wait before someone will be connected to your application!</small></p>
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
