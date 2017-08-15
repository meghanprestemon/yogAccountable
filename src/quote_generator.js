//
// let quoteData = {}
//
// function getData () {
//     $.getJSON("https://api.forismatic.com/api/1.0/","method=getQuote&lang=en&format=jsonp&jsonp=?", function(data) {
//     $(".message").html('"' + data.quoteText + '"');
//
//     if (data.quoteAuthor === "") {
//       data.quoteAuthor = "Unknown";
//     }
//     quoteData = data;
//     $(".author").html("- " + data.quoteAuthor);
//
//     $("#getMessage").attr("disabled", false);
//
//   });
// }
