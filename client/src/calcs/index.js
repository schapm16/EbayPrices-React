import utils from '../utils';

const default_buyerShipping = 10.50,
    default_stateTax = 0.075,
    default_ebayShippingDiscount = 0.25,
    default_ebayFee = 0.1,
    default_paypalFeeRate = 0.029,
    default_paypalFeeFixed = 0.3


export default {
  myOverallStats: (my) => {
    my = utils.objToFloat(my);

    let myCalc = {};
    
    my.buyerShipping = my.buyerShipping || default_buyerShipping;
    my.tax = my.stateTax || default_stateTax;
    
    my.price = ((1 - my.sale) * my.markedPrice) * (1 + my.tax);
    my.shipping = my.buyerShipping * (1 - default_ebayShippingDiscount);

    myCalc.costToBuyer = (my.profit + my.price + my.shipping + default_paypalFeeFixed) / (1 - default_ebayFee - default_paypalFeeRate);
    myCalc.listFor = myCalc.costToBuyer - my.buyerShipping;
    myCalc.roi = (my.profit / my.price) * 100;

    return utils.objToTwoDecimals(myCalc);
  },

  myStatsForListing: (myOverallStats, listing) => {
    myOverallStats = utils.objToFloat(Object.assign({},myOverallStats));

    let myListingStats = {};
    
    myListingStats.priceDiff = myOverallStats.costToBuyer - parseFloat(listing.price);
    myListingStats.priceDiffPerc = myListingStats.priceDiff / parseFloat(listing.price) * 100;

    return utils.objToTwoDecimals(myListingStats);
  }
} 