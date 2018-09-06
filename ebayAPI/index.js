const request = require('request-promise-native');

if (process.env.NODE_ENV !== "production") {
  const devUtils = require('./devUtils');
  devUtils.logRequests(request);
}


const ebayEndpoint = request.defaults({
  url: 'http://svcs.ebay.com/services/search/FindingService/v1',
  headers: {
    'X-EBAY-SOA-SECURITY-APPNAME': process.env.APPID,
    'X-EBAY-SOA-GLOBAL-ID': 'EBAY-US',
    'X-EBAY-SOA-RESPONSE-DATA-FORMAT': 'JSON',
  }
});

function findCategoryId(gender) {
  if (gender.match(/womens/gi)) {
    return '95672'
  }
  else if (gender.match(/mens/gi)) {
    return '15709'
  }
  
}

function addItemFilters(options, filters) {
  options.qs = Object.assign(options.qs, {
    'itemFilter(0).name': 'Condition',
    'itemFilter(0).value(0)': '1000',
    'itemFilter(0).value(1)': '1500',
    'itemFilter(1).name': 'HideDuplicateItems',
    'itemFilter(1).value': 'true'
  });

  if (!filters) return options;

  filters.forEach((filter, index) => {
    options.qs[`itemFilter(${index+2}).name`] = filter.name;
    options.qs[`itemFilter(${index+2}).value`] = filter.value;

  });
  
  return options;
}

function specifyPagination(options, page=1) {
  options.qs['paginationInput.entriesPerPage'] = 15;
  options.qs['paginationInput.pageNumber'] = page;
  return options;
}

module.exports = {
  findCompletedItems: (req) => {
    let options = {
        method: 'GET',
        qs: {
          'operation-name': 'findCompletedItems',
          'categoryId': findCategoryId(req.query.apiCategory),
          'keywords': req.query.keywords,
          'sortOrder': 'EndTimeSoonest'
      }
    };

    options = addItemFilters(options, [
      {
        name: 'SoldItemsOnly', 
        value: 'true'
      },
      {    
        name: 'EndTimeTo',
        value: req.query.timeStamp 
      }
    ]);

    options = specifyPagination(options, req.query.page);

    return ebayEndpoint(options)
      .then((response) => JSON.parse(response))
      .catch((error) => console.log(error));

  },

  findItemsAdvanced: (req) => {
    let options = {
        method: 'GET',
        qs: {
          'operation-name': 'findItemsAdvanced',
          'categoryId': findCategoryId(req.query.apiCategory),
          'keywords': req.query.keywords,
          'sortOrder': 'PricePlusShippingLowest'
      }
    }

    options = addItemFilters(options, [{name: 'StartTimeTo', value: req.query.timeStamp}]);
    options = specifyPagination(options, req.query.page);

    return ebayEndpoint(options)
      .then((response) => JSON.parse(response))
      .catch((error) => console.log(error))

  }
}

