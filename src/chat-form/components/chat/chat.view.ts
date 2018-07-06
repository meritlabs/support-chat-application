export default function template() {
  return `
  <div class="chatView">
    <div v-for="item in messages">
      {{item.message}}
    </div>
  </div>
  `;
}
