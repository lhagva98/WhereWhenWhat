class chest {
  static state = {};
  static set(data, callback = () => {}) {
    this.state = {
      ...this.state,
      ...data,
    };
    callback();
  }
  static get(option) {
    return this.state[option];
  }
}

export default chest;
