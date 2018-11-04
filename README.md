# Ebay Price Checker

### Purpose

This app is rooted in my hobby of buying and reselling Nike athletic shoes.  I quickly got tired of switching back and forth between a mobile spreadsheet and the Ebay app to check prices and see what my potential profits were while standing in a busy store.  This app combines both of those functions into one user friendly interface.  

Now a user can enter the name of a men's or women's athletic shoe and some information about their in-store purchase price as well as their desired profit and the shipping they expect to charge a customer -- and vola! -- the profitable ebay sale price as well a comparison of that price to other sellers on Ebay who have recently sold or are actively selling the same shoes is presented for analysis.

### Developer Geekiness

In addition to making this app in React, there were a couple of other new things I wanted to try: 

1. Real-time api calls to Ebay while the user is inputting information removing any sort of wait time once the input is complete.   
2. Infinite scrolling of results.   

### Notes

1.  Currently this app only supports South Carolina sales tax. (I built it for myself after all).

2. Don't use this to make money just yet!  I'm having an issue with Ebay's Finder API returning inconsistent results.

### Try it out!

http://ebaypricechecker.herokuapp.com/