/*
The OAuth credential can be found here: https://console.cloud.google.com/apis/credentials?project=youtube-analytics-207816
Docs:
https://ga-dev-tools.web.app/dimensions-metrics-explorer/
*/

// Replace with your view ID.
var VIEW_ID = '228697947';

// Query the API and print the results to the page.
function queryReports(eventAction, onResult) {
  gapi.client.request({
    path: '/v4/reports:batchGet',
    root: 'https://analyticsreporting.googleapis.com/',
    method: 'POST',
    body: {
      reportRequests: [
        {
          viewId: VIEW_ID,
          dateRanges: [
            {
              startDate: '2023-01-01',
              endDate: 'today'
            }
          ],
          dimensions: [
            {
              name: 'ga:eventCategory'
            },
            {
              name: 'ga:eventAction'
            },
            {
              name: 'ga:eventLabel'
            },
            {
              name:"ga:segment"
            }
          ],
          metrics: [
            {
              expression: 'ga:totalEvents'
            },
            {
              expression: 'ga:eventValue'
            },
            {
              expression: 'ga:avgEventValue'
            }
          ],
          segments: [
            {
              "dynamicSegment":
              {
                "name":eventAction,
                "sessionSegment":
                {
                  "segmentFilters":[
                  {
                    "simpleSegment":
                    {
                      "orFiltersForSegment":[
                      {
                        "segmentFilterClauses":[
                        {
                          "dimensionFilter":
                          {
                            "dimensionName":"ga:eventAction",
                            "expressions":[eventAction],
                            "operator":"EXACT"
                          }
                        }]
                      }]
                    }
                  }]
                }
              }
            }
          ]
        }
      ]
    }
  }).then(onResult, console.error.bind(console));
}
