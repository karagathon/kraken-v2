// Initializes the `reports` service on path `/reports`
const { Reports } = require('./reports.class');
const { IllegalReports } = require('./reports.class');
const { EmergencyReports} = require('./reports.class');
const createModel = require('../../models/reports.model');
const hooks = require('./reports.hooks');
const logger = require('../../logger')

module.exports = function (app) {
  const options = {
    Model: createModel(app)
  };

  const setQueryType = name => {
    return async context => {
      context.params.query.type = name
      context.params.query.$sort = { date: -1 }
    }
  }

  const distinctDevice  = () => {
    return async context => {
      context.params.query.$select = ['device_id']
    }
  }


  // Initialize our service with any options it requires
  app.use('/reports', new Reports(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('reports');

  service.hooks(hooks);


  app.use('/events/all',new Reports(options, app))

  app.use('/events/illegal_fishing', new IllegalReports(options, app))

  app.service('events/illegal_fishing').hooks(
    {
      before: {
        find : [setQueryType('illegal_fishing')]
      }
    }
  )

  app.use('/events/emergencies',new EmergencyReports(options, app))

  app.service('events/emergencies').hooks(
    {
      before: {
        find : [setQueryType('emergency')]
      }
    }
  )

  app.use('/devices',new EmergencyReports(options, app))

  app.service('devices').hooks(
    {
      before: {
        find : [distinctDevice()]
      }
    }
  )

};


