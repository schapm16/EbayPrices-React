import utils from '../utils';

const default_buyerShipping = 0,
    default_stateTax = 0.075,
    default_ebayShippingDiscount = 0.25,
    default_ebayFee = 0.1,
    default_paypalFeeRate = 0.029,
    default_paypalFeeFixed = 0.3,
    default_sale = 0;


export default {
  myOverallStats: (my) => {
    my = utils.objToFloat(my);

    let myCalc = {};
    
    my.buyerShipping = my.buyerShipping || default_buyerShipping;
    my.tax = my.stateTax || default_stateTax;
    my.sale = my.sale || default_sale;
    
    my.price = ((100 - my.sale) / 100 * my.markedPrice) * (1 + my.tax);
    my.shipping = my.buyerShipping * (1 - default_ebayShippingDiscount);

    myCalc.costToBuyer = (my.profit + my.price + my.shipping + default_paypalFeeFixed) / (1 - default_ebayFee - default_paypalFeeRate);
    myCalc.listFor = myCalc.costToBuyer - my.buyerShipping;
    myCalc.roi = (my.profit / my.price) * 100;

    return utils.objToTwoDecimals(myCalc);
  },

  myStatsForListing: (myOverallStats, listing) => {
    myOverallStats = utils.objToFloat(Object.assign({},myOverallStats));

    let myListingStats = {};
    let listingTotalPrice = parseFloat(listing.price) + parseFloat(listing.shippingCost);
    
    myListingStats.priceDiff = myOverallStats.costToBuyer - listingTotalPrice;
    myListingStats.priceDiffPerc = myListingStats.priceDiff / listingTotalPrice * 100;

    return utils.objToTwoDecimals(myListingStats);
  }
} 