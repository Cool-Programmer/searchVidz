//SEARCH BAR HANDLER
$(function () {
	var searchField = $('#query');
	var icon = $('#search-btn');

	//FOCUS HANDLER
	$(searchField).on('focus', function(){
		$(this).animate({
			width:'100%'
		}, 400);
		$(icon).animate({
			right:'340px'
		}, 400);
	})

	//BLUR HANDLER
	$('searchField').on('blur', function(){
		if (searchField.val()=="") {
			$(searchField).animate({
				width:'45%'
			}, 400, function(){});
			$(icon).animate({
				right:'720px'
			}, 400, function(){});
		}
	})
	$('#search-form').submit(function(e){
		e.preventDefault();
	});
});

//SEARCH FUNCTION
function search(){
	//CLEAR RESULTS
	$('#results').html('');
	$('#buttons').html('');

	//GET FORM INPUT
	q=$('#query').val();

	//RUN GET REQUEST ON API
	$.get(
			"https://www.googleapis.com/youtube/v3/search",{
				part: 'snippet, id',
				q: q,
				type: 'video',
				key: 'AIzaSyDje68WW9yfCvGR5pbVji84Zx9K-p3lAWc'}, 
				function (data) {
					var nextPageToken = data.nextPageToken;
					var prevPageToken = data.prevPageToken;
					console.log(data);

					$.each(data.items, function(i, item){
						var output=getOutput(item);

						//DISPLAY RESULTS
						$('#results').append(output);
					});

					var buttons = getButtons(prevPageToken, nextPageToken);
					//DISPLAY BUTTONS
					$('#buttons').append(buttons);
				}
		);
};

//NEXT PAGE FUNCTION
	function nextPage(){
	var token = $('#next-button').data('token'); 
	var q = $('#next-button').data('query');
	//CLEAR RESULTS
	$('#results').html('');
	$('#buttons').html('');

	//GET FORM INPUT
	q=$('#query').val();

	//RUN GET REQUEST ON API
	$.get(
			"https://www.googleapis.com/youtube/v3/search",{
				part: 'snippet, id',
				q: q,
				pageToken: token,
				type: 'video',
				key: 'AIzaSyDje68WW9yfCvGR5pbVji84Zx9K-p3lAWc'}, 
				function (data) {
					var nextPageToken = data.nextPageToken;
					var prevPageToken = data.prevPageToken;
					console.log(data);

					$.each(data.items, function(i, item){
						var output=getOutput(item);

						//DISPLAY RESULTS
						$('#results').append(output);
					});

					var buttons = getButtons(prevPageToken, nextPageToken);
					//DISPLAY BUTTONS
					$('#buttons').append(buttons);
				}
		);
	};

//NEXT PAGE FUNCTION
	function prevPage(){
	var token = $('#prev-button').data('token'); 
	var q = $('#prev-button').data('query');
	//CLEAR RESULTS
	$('#results').html('');
	$('#buttons').html('');

	//GET FORM INPUT
	q=$('#query').val();

	//RUN GET REQUEST ON API
	$.get(
			"https://www.googleapis.com/youtube/v3/search",{
				part: 'snippet, id',
				q: q,
				pageToken: token,
				type: 'video',
				key: 'AIzaSyDje68WW9yfCvGR5pbVji84Zx9K-p3lAWc'}, 
				function (data) {
					var nextPageToken = data.nextPageToken;
					var prevPageToken = data.prevPageToken;
					console.log(data);

					$.each(data.items, function(i, item){
						var output=getOutput(item);

						//DISPLAY RESULTS
						$('#results').append(output);
					});

					var buttons = getButtons(prevPageToken, nextPageToken);
					//DISPLAY BUTTONS
					$('#buttons').append(buttons);
				}
		);
	};

	//BUILDING OUTPUT
	function getOutput(item){
 		var videoId = item.id.videoId;
 		var title = item.snippet.title;
 		var description = item.snippet.description;
 		var thumb = item.snippet.thumbnails.high.url;
 		var channelTitle = item.snippet.channelTitle;
 		var videoDate = item.snippet.publishedAt;

 		//BUILD OUTPUT STRING
 		var output = '<li>' +
 		'<div class="list-left">' +
 		'<img src="'+thumb+'">' +
 		'</div>' +
 		'<div class="list-right">'+
 		'<h3> <a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'">' +title+ '</a></h3>' +
 		'<small>By <span class="cTitle">'+channelTitle+'</span>on '+videoDate+'</small>' +
 		'<p>'+description+'</p>' +
 		'</div>' +
 		'</li>' +
 		'<div class="clearfix"></div>' +
 		''

 		return output;
	}

	//BUILDING BUTTONs
	function getButtons(prevPageToken, nextPageToken){
		if (!prevPageToken) {
			var btnoutput = '<div class="button-container">'+
			'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"'+
			'onclick="nextPage();">Next Page</button></div>';
		}else{
			var btnoutput = '<div class="button-container">'+
			'<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'"'+
			'onclick="prevPage();">Previous Page</button>'+
			'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"'+
			'onclick="nextPage();">Next Page</button></div>';
		}
		return btnoutput;
	}
