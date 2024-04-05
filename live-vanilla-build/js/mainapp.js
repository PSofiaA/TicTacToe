import View from "./view.js";
import Store from "./store.js";

const players = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-x",
    colorClass: "turquoise",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-o",
    colorClass: "yellow",
  },
];

function init() {
  const view = new View();
  const store = new Store("live-t3-storage-key", players);

  function initView() {
    view.closeAll();
    view.setTurnIndicator(store.game.currentPlayer);
    view.clearBoard();

    view.updateScoreboard(
      store.stats.playerWithStats[0].wins,
      store.stats.playerWithStats[1].wins,
      store.stats.ties
    );
    view.initializeBoard(store.game.moves);
  }

  initView();

  /**
   * Listeners
   */
  window.addEventListener("storage", () => {
    console.log("State changed");
    initView();
  });

  view.bindGameResetEvent((event) => {
    store.reset();
    initView();
  });

  view.bindNewRoundEvent((event) => {
    store.newRound();
    initView();
  });

  view.bindPlayerMoveEvent((square) => {
    const existingMove = store.game.moves.find(
      (move) => move.squareId === +square.id
    );
    if (existingMove) {
      return;
    }
    //Place an icon on board
    view.handlePlayerMove(square, store.game.currentPlayer);

    //Update current player
    store.playerMove(+square.id);

    if (store.game.status.isComplete) {
      view.openModal("LALALA");
      return;
    }

    //Set the next player's turn indicator
    view.setTurnIndicator(store.game.currentPlayer);
  });
}

window.addEventListener("load", init);
