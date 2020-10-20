// https://developer.twitter.com/
var Twitter = require('twitter');
require('dotenv').config();
var axios = require('axios');

var client = new Twitter({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token_key: process.env.ACCESS_TOKEN_KEY,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

axios("https://quotes.rest/qod?language=en").then(Response => {
	return [Response.data.contents.quotes[0].quote, Response.data.contents.quotes[0].author];
}).then(([quote, author]) => {
	client.post('statuses/update', {status: `${quote}\n${author}`}, function(error, tweet, response){
		if(!error){
			console.log(tweet);
		}
	})
});

// favorite hashtags
var params = {
    q: '#dsciem',
    count: '100'
};

client.get('search/tweets', params, function(error, tweets, response){
    if(!error){
        var obj = JSON.parse(response.body);
        var statuses = obj.statuses;
        for(var i=0 ; i<statuses.length ; i++){
            if(!statuses[i].favorited){
                var params2 = {
                    id: statuses[i].id_str
                };
                client.post('favorites/create', params2, function(error, tweet, response){
                    if(!error){
                        console.log(`${tweet} liked!`);
                    }else{
                        console.log(error);
                    }
                });
            }
        }
    }
});

// we can add a cron-job  like scheduler for this job
// explore twitter API and quotes API