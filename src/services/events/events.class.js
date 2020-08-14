const { Service } = require('feathers-mongodb');

exports.Events = class Events extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('events');
    });
  }
};
