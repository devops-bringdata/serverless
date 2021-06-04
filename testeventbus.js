const AWS = require('aws-sdk')
function injection() {
  const eventBridge = new AWS.EventBridge({ region: 'sa-east-1' })
  return eventBridge.putEvents(
    {
      Entries: [
        {
          EventBusName: 'validationOnEnrichment',
          Source: 'bringdata.validation.onEnrichment',
          DetailType: 'HelloMsg123',
          Detail: JSON.stringify({ teste: 'teste' })
        }
      ]
    },
    (err, data) => {
      console.log(data)
    }
  )
}
injection()
