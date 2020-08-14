// events-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
    const modelName = 'events';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema(
        {
            details: { type: String, required: true },
            device_id: { type: String, required: true },
            type: { type: String, required: true },
            title: { type: String, required: true },
            name: { type: String, required: true },
            reportee: { type: String, required: true },
            date: { type: Date, 'default': Date.now},
            coordinates: {
                long :{ type: Number, required: true },
                lat :{ type: Number, required: true }
            }
        });

    // This is necessary to avoid model compilation errors in watch mode
    // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
    if (mongooseClient.modelNames().includes(modelName)) {
        mongooseClient.deleteModel(modelName);
    }
    return mongooseClient.model(modelName, schema);

};

