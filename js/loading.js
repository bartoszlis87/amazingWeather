export {Loading};

class Loading {
  constructor() {
    this.$body = document.querySelector("#body-id");
  }
  enable() {
    this.$body.classList.add("loading");
  }
  disable() {
    this.$body.classList.remove("loading");
  }
}
