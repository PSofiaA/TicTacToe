export default class View {
  //namespaces
  $ = {};
  $$ = {};

  constructor() {
    this.$.menu = this.#qs('[data-id="menu"]');
    this.$.menuBtn = this.#qs('[data-id="menu-btn"]');
    this.$.menuItems = this.#qs('[data-id="menu-items"]');
    this.$.resetBtn = this.#qs('[data-id="reset-btn"]');
    this.$.newRoundBtn = this.#qs('[data-id="new-round-btn"]');
    this.$.modal = this.#qs('[data-id="modal"]');
    this.$.modalText = this.#qs('[data-id="modal-text"]');
    this.$.modalBtn = this.#qs('[data-id="modal-btn"]');
    this.$.turn = this.#qs('[data-id="turn"]');
    this.$.p1Wins = this.#qs('[data-id="p1-wins"]');
    this.$.p2Wins = this.#qs('[data-id="p2-wins"]');
    this.$.ties = this.#qs('[data-id="ties"]');

    this.$$.squares = document.querySelectorAll('[data-id="square"]');

    //UI-only event listeners
    this.$.menuBtn.addEventListener("click", (event) => {
      this.#toggleMenu();
    });
  }

  /*
   * Register all the events methods
   */

  bindGameResetEvent(handler) {
    this.$.resetBtn.addEventListener("click", handler);
    this.$.modalBtn.addEventListener("click", handler);
  }
  bindNewRoundEvent(handler) {
    this.$.newRoundBtn.addEventListener("click", handler);
  }
  bindPlayerMoveEvent(handler) {
    this.$$.squares.forEach((square) => {
      square.addEventListener("click", () => handler(square));
    });
  }

  /**
   * DOM helper methods
   */

  updateScoreboard(p1Wins, p2Wins, ties) {
    this.$.p1Wins.innerText = `${p1Wins} wins`;
    this.$.p2Wins.innerText = `${p2Wins} wins`;
    this.$.ties.innerText = `${ties} ties`;
  }
  openModal(message) {
    this.$.modal.classList.remove("hidden");
    this.$.modalText.innerText = message;
  }

  #closeModal() {
    this.$.modal.classList.add("hidden");
  }

  closeAll() {
    this.#closeModal();
    this.#closeMenu();
  }

  clearBoard() {
    this.$$.squares.forEach((square) => {
      square.replaceChildren();
    });
  }

  initializeBoard(moves) {
    this.$$.squares.forEach((square) => {
      const existingMove = moves.find((move) => move.squareId === +square.id);

      if (existingMove) {
        this.handlePlayerMove(square, existingMove.player);
      }
    });
  }

  #closeMenu() {
    this.$.menuItems.classList.add("hidden");
    this.$.menuBtn.classList.remove("border");

    const icon = this.$.menuBtn.querySelector("i");

    icon.classList.add("fa-chevron-down");
    icon.classList.remove("fa-chevron-up");
  }

  #toggleMenu() {
    this.$.menuItems.classList.toggle("hidden");
    this.$.menuBtn.classList.toggle("border");

    const icon = this.$.menuBtn.querySelector("i");
    icon.classList.toggle("fa-chevron-down");
    icon.classList.toggle("fa-chevron-up");
  }

  //player = 1 OR 2
  setTurnIndicator(player) {
    const icon = document.createElement("i");
    const message = document.createElement("p");

    icon.classList.add("fa-solid", player.colorClass, player.iconClass);

    message.classList.add(player.colorClass);
    message.innerText = `${player.name} you're up!`;

    this.$.turn.replaceChildren(icon, message);
  }

  handlePlayerMove(squareElem, player) {
    const squareIcon = document.createElement("i");
    squareIcon.classList.add("fa-solid", player.iconClass, player.colorClass);
    squareElem.replaceChildren(squareIcon);
  }

  #qs(selector, parent) {
    const elem = parent
      ? parent.querySelector(selector)
      : document.querySelector(selector);

    if (!elem) throw new Error("Could not find elements");

    return elem;
  }
}
