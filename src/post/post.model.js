const { v4 } = require('uuid');

class Post {
  constructor(id, title, content) {
    this._id = id;
    this._title = title;
    this._content = content;
  }

  static fromRequestBody(body) {
    return new this(v4(), body.title, body.content);
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get content() {
    return this._content;
  }

  toJSON() {
    return {
      id: this._id,
      title: this._title,
      content: this._content
    }
  }
}

module.exports = Post;