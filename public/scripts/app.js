/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


const renderTweets = function (tweets) {
  let array = []
  for (let tweet of tweets) {
    array.unshift(createTweetElement(tweet));
  }
  $("#tweetsContainer").append(array);
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
}



// creates a tweet html structure and returns it
const createTweetElement = function (tweet) {
  let $tweet = $('<article>').addClass('tweet');

  const markup = `
<section class="boxDesign" >
<div style="padding: 2%">
 
    <div class = "tweetIdFormat">
      <img src=${tweet.user.avatars} />
      <p>${tweet.user.name}</p>
      <span class="handle" >
      ${tweet.user.handle}
      </span>
    </div>
    <br>
  <span>
    <p class ="paragraphFormat"> 
    ${escape(tweet.content.text)}
    </p>
  </span>
  <span class="bottomTweet">
    <div>${moment(
      new Date(tweet.created_at)
    ).fromNow()}
    <div>
      <span class="buttons">
        <button>b1</button>
        <button>b2</button>
        <button>b3</button>
      </span>
    </div>
  </span>
</div>
</section>
<br>
`
  $tweet = $tweet.append(markup);
  return $tweet;
}

function postTweets() {
  $("form").on("submit", function(event) {
    event.preventDefault();
    let textInput = $("#textarea").serialize();
    if (!isValidText(textInput)) {
      $(".error-message").slideDown("slow", function() {
      setTimeout(function(){$(".error-message").slideToggle()}, 1000);
      });
    } else {
        $.ajax('/tweets/', {
        method: 'POST',
        data: $(this).serialize(),
        dataType: 'text',   
    }).done(function() {
        $("#textarea").val('');
        $("#counter").text("140");
        data.content = "text= "

        loadTweets(data);

    }).error(function(){
          console.log("Post ERROR")
      })
      }
  })
}

  function loadTweets() {
    event.preventDefault();
    $.ajax( {
      method: 'GET',
      url: "/tweets/",
      dataType: 'json',
    }).done(function(data) { 
    $("#tweetsContainer").empty();
     renderTweets(data);
    }).fail(function(){
      console.log(" get tweet error")
    })
  };


$(document).ready(function () {
  
});