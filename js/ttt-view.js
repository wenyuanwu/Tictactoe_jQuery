class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;

    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    this.$el.on("click","li",(event)=> {
      const $sqr = $(event.currentTarget);
      this.makeMove($sqr);
      $sqr.off();
    });

  }

  makeMove($square) {
    const pos = $square.data("pos");
    const currentPlayer = this.game.currentPlayer;


    try {
      this.game.playMove(pos);
    } catch(e) {
      console.log(e.msg);
      alert(e.msg);
      return;
    }

    $square.addClass(currentPlayer);
    if (this.game.isOver()){

      const $figure = $("<figcaption>");
      const winner = this.game.winner();

      this.$el.off("click");
      $figure.html(`you win, ${winner}`);
      this.$el.append($figure);

    }
  }

  setupBoard() {
    const $ul = $("<ul>");
    $ul.addClass("group");

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let $li = $("<li>");
        $li.data("pos", [i, j]);
        $ul.append($li);
      }
    }
    this.$el.append($ul);
  }
}

module.exports = View;
