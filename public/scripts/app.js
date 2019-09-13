/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [{
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
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
      "handle": "@rd" 
    },
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
  // Calls createTweetElement for each tweet
  // Cakes return value and appends it to the tweets container
}

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// Creates a tweet html structure and returns it
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
    <div>
    ${moment(
      new Date(tweet.created_at)
    ).fromNow()}
    </div>
    <div>
      <span class="buttons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
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

// Will load tweets live
function loadTweets() {
  event.preventDefault();
  $.ajax({
    method: 'GET',
    url: "/tweets",
    dataType: 'json',
  }).done(function(data) { 
    $("#tweetsContainer").empty();
    renderTweets(data);
  })
}

function isValidText(text) {
  console.log(text)
  console.log(text.length)
  if (text.length == 5) {
    return true;
  } else {
    return false;
  }
}

function postTweets() {
  $("form").on("submit", function(event) {
    event.preventDefault();
    let textInput = $("#textarea").serialize();
    if (isValidText(textInput)) {
      $(".error-message").slideDown("slow", function() {
      setTimeout(function(){$(".error-message").slideToggle()}, 500);
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

function toggleTextBox(){
  $("#write").on("click", function(event) {
    $(".new-tweet").slideToggle();
  })
}

$(document).ready(function () {
  $(".new-tweet").slideToggle();
  loadTweets();
  postTweets();
  toggleTextBox();
})