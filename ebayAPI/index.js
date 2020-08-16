const axios = require('axios');
const devDebug = require('./devDebug');

const ebayEndpoint = axios.create({
  method: 'get',
  url: 'http://svcs.ebay.com/services/search/FindingService/v1'
})

const defaultParams = {
  'SECURITY-APPNAME': process.env.APPID,
  'GLOBAL-ID': 'EBAY-US',
  'RESPONSE-DATA-FORMAT': 'JSON',
  'REST-PAYLOAD': true
}

if (process.env.NODE_ENV !== "production") {
  devDebug.logAxiosRequest(ebayEndpoint);
  devDebug.logAxiosResponse(ebayEndpoint);
}

function findCategoryId(gender) {
  if (gender.match(/womens/gi)) {
    return '95672'
  }
  else if (gender.match(/mens/gi)) {
    return '15709'
  }
}

function addItemFilters(options, filters) {
  options = Object.assign(options, {
    'itemFilter(0).name': 'Condition',
    'itemFilter(0).value(0)': '1000',
    'itemFilter(0).value(1)': '1500',
    'itemFilter(1).name': 'HideDuplicateItems',
    'itemFilter(1).value': 'true'
  });

  if (!filters) return options;

  filters.forEach((filter, index) => {
    options[`itemFilter(${index+2}).name`] = filter.name;
    options[`itemFilter(${index+2}).value`] = filter.value;
  });
  
  return options;
}

function specifyPagination(options, page=1) {
  options['paginationInput.entriesPerPage'] = 15;
  options['paginationInput.pageNumber'] = page;
  return options;
}

module.exports = {
  findCompletedItems: (req) => {
    let options = Object.assign({}, defaultParams, {
      'operation-name': 'findCompletedItems',
      'categoryId': findCategoryId(req.query.apiCategory),
      'keywords': req.query.keywords,
      'sortOrder': 'EndTimeSoonest'
    });

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

    return ebayEndpoint.request({params: options})
      .then((response) => response.data)
      .catch((error) => console.log(error));
  },

  findItemsAdvanced: (req) => {
    let options = Object.assign({}, defaultParams, {
      'operation-name': 'findItemsAdvanced',
      'categoryId': findCategoryId(req.query.apiCategory),
      'keywords': req.query.keywords,
      'sortOrder': 'PricePlusShippingLowest'
    });

    options = addItemFilters(options, [{name: 'StartTimeTo', value: req.query.timeStamp}]);
    options = specifyPagination(options, req.query.page);

    return ebayEndpoint.request({params: options})
      .then((response) => response.data)
      .catch((error) => console.log(error))
  }
}
