/**
* @OnlyCurrentDoc
*/
function getAllStockPrices() {   

  //location of stock symbols to lookup and location of where stock price should be written to
  var cellRanges = [["F5:F13","U5:U13"], ["F19:F32", "U19:U32"], ["F38:F48", "U38:U48"], ["F54:F56", "U54:U56"]]
  var url = "https://query1.finance.yahoo.com/v8/finance/chart/"
  var stockPrices = []
  
  cellRanges.forEach(range => {
    Logger.log("Current Range to Read: "+range[0] + " ... Write: "+range[1])
    var symbols =  SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(range[0]);
    //retrieve and parse stock price
    symbols.getValues().forEach(symbol => {
      var res = UrlFetchApp.fetch(url+symbol);
      var obj = "";
      var stockPrice = 0.0;
      if(res){
        obj   = JSON.parse(res.getContentText());
        stockPrice = obj.chart.result[0].meta.regularMarketPrice
        Logger.log(symbol + ": "+ stockPrice);
        stockPrices.push([stockPrice])
      }
    })
    //set stock price in given cell range
    SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(range[1]).setValues(stockPrices)
    stockPrices = []
  })
  
  
  
  
 /* symbols.getRanges().forEach(rangex => {
    rangex.getValues().forEach(symbol => {
      //Logger.log("symbol: "+symbol)
      var res = UrlFetchApp.fetch(url+symbol);
      var obj = "";
      var stockPrice = 0.0;
      if(res){
        obj   = JSON.parse(res.getContentText());
        stockPrice = obj.chart.result[0].meta.regularMarketPrice
        Logger.log(symbol + ": "+ stockPrice);
        stockPrices.push([stockPrice])
      }

    })
  })*/

  /*Logger.log(symbols)
  
  var stockPrices = []
  symbols.getValues().forEach(symbol => {
    var res = UrlFetchApp.fetch(url+symbol);
    var obj = "";
    var stockPrice = 0.0;
    if(res){
      obj   = JSON.parse(res.getContentText());
      stockPrice = obj.chart.result[0].meta.regularMarketPrice
      Logger.log(symbol + ": "+ stockPrice);
      stockPrices.push([stockPrice])
  }
  })*/
  

  Logger.log("Length: " +stockPrices.length)
 // const cell = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getActiveRange();
  //var toWrite = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRangeList(["U5:U13", "U19:U32"])
  
}