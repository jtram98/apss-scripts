/**
 * Gets stock price of given stock symbol.
 * @param {string} input the stock symbol to look up.
 * @return The price of the given stock symbol.
 * @customfunction
*/
function STOCKPRICE(symbol) {
  var url = "https://query1.finance.yahoo.com/v8/finance/chart/"
  var res = UrlFetchApp.fetch(url+symbol);
  var obj = "";
  var stockPrice = 0.0;
  if(res){
    obj   = JSON.parse(res.getContentText());
    stockPrice = obj.chart.result[0].meta.regularMarketPrice
    Logger.log(symbol + ": "+ stockPrice);  
    }
  return stockPrice  
}
