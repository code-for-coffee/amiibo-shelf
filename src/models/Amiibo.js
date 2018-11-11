class Amiibo {
  constructor(
    attributes = {
      character: "",
      model: "",
      base64: ""
    }
  ) {
    this.attributes = attributes;
  }

  toJSON = () => {
    return JSON.stringify(this.attributes);
  };
}

export default Amiibo;
