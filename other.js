<script type="text/javascript">
        // OddsAPI
        // let sport = "sport=americanfootball_ncaaf&";
        let sport = "sport=baseball_mlb&";
        let oddsKey = "?apiKey=1f0ba35c47c21e5fcc328fcb4fd96990&";
        let region = "region=us&";
        let oddsMarket = "mkt=h2h";
        let oddsQueryURL = "https://api.the-odds-api.com/v3/odds/" + oddsKey + sport + region + oddsMarket;
        // Performing our AJAX GET request
        $.ajax({
            url: oddsQueryURL,
            method: "GET"
      }).then(function(response){
        console.log(response);
        console.log(typeof response);
        console.log(response.data);
        // returns matchup
        console.log(response.data[0].teams[0] + " @ " + response.data[0].teams[1]);
        // return bookmaker namel may want to consider a loop of this array and match on "site_nice"
        console.log(response.data[0].sites[0].site_key);
        // logs home team odds? 
        console.log(response.data[0].sites[0].odds.h2h[0]);
        let homeOdds = response.data[0].sites[0].odds.h2h[0];
        // logs away team odds
        console.log(response.data[0].sites[0].odds.h2h[1]);
        let awayOdds = response.data[0].sites[0].odds.h2h[1];
        // odds conversion form decimal to american odds 
        function convertOdds() {
            if (homeOdds >= 2) {
                let amHomeOdds = (homeOdds - 1) * 100;
                console.log(amHomeOdds);
            } else {
                let amHomeOdds = 100 / (1 - homeOdds);
                console.log(amHomeOdds);
            }
            if (awayOdds >= 2) {
                let amAwayOdds = (awayOdds - 1) * 100;
                console.log(amAwayOdds);
            } else {
                let amAwayOdds = 100 / (1 - awayOdds);
                console.log(amAwayOdds);
            };
        };
        convertOdds();

        // Date Conversion from google; several methods online we should look into
        // can also return the odds in ISO format if it is easier to use
        const unixTimestamp = response.data[0].commence_time;

        const milliseconds = unixTimestamp * 1000;

        const dateObject = new Date(milliseconds);

        const humanDateFormat = dateObject.toLocaleString() //2019-12-9 10:30:15

        dateObject.toLocaleString("en-US", {weekday: "long"}) // Monday
        dateObject.toLocaleString("en-US", {month: "long"}) // December
        dateObject.toLocaleString("en-US", {day: "numeric"}) // 9
        dateObject.toLocaleString("en-US", {year: "numeric"}) // 2019
        dateObject.toLocaleString("en-US", {hour: "numeric"}) // 10 AM
        dateObject.toLocaleString("en-US", {minute: "numeric"}) // 30
        dateObject.toLocaleString("en-US", {second: "numeric"}) // 15
        dateObject.toLocaleString("en-US", {timeZoneName: "short"}) // 12/9/2019, 10:30:15 AM CST

        console.log(humanDateFormat);

        // Baseball API 
        var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://api-baseball.p.rapidapi.com/games?date=2020-09-30",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "api-baseball.p.rapidapi.com",
		"x-rapidapi-key": "882901cd3fmsh09795b56d7fe234p12ffa8jsncdf84a2dcccc"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});


// var settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://api-baseball.p.rapidapi.com/games?league=1&season=3",
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "api-baseball.p.rapidapi.com",
// 		"x-rapidapi-key": "882901cd3fmsh09795b56d7fe234p12ffa8jsncdf84a2dcccc"
// 	}
// }

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });






    //     // twitter API
    //     // twitter collection 
            // https://developer.twitter.com/en/docs/twitter-api/v1/tweets/curate-a-collection/overview/about_collections
        let twKey = "?apiKey=uiisJPy3OEQxSDwknQnsGqvyg&";
        let twKeySecret = "ctHmGJRH1NcMAH7Y5cjAbxWFKgWnr1d2V2IO9suvwkC5NFOlAT";
        let bearerToken = "AAAAAAAAAAAAAAAAAAAAALyFIAEAAAAAZ%2FHow%2Frr6MCLQLHlC96Zr0D7krA%3DB335BMV1jxw9DRiUZJAmjv7c9VUY4PMz8XrXFdpkDyIgX1PWyY"
        let screenName = "screen_name=oddsapp1&";
        let count = "count=1";
        // let twQueryURL = "https://api.twitter.com/1.1/collections/list.json?" + screenName + count;
        // 1310621676690964480
        let twQueryURL = "https://api.twitter.com/2/tweets?ids=1278747501642657792";

        // Performing our AJAX GET request
        $.ajax({
            url: twQueryURL,
            method: "GET", 
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization Bearer AAAAAAAAAAAAAAAAAAAAALyFIAEAAAAAZ%2FHow%2Frr6MCLQLHlC96Zr0D7krA%3DB335BMV1jxw9DRiUZJAmjv7c9VUY4PMz8XrXFdpkDyIgX1PWyY');
                console.log('set header function worked');
            }
      }).then(function(response){
            console.log('resonse function worked');
            console.log(response);
      });

      });
