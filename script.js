
var app=new Vue({
  el:'#app',
  data:{
    searchName:'',
    searchList:[],
    currentGame:'',
    gameSelected:false,
    loading1:false,
    loadingStatus:"Loading",
    maxEntries:100,
    foundEntries:0,
    currentGameID:0,
 },

  created:function() {

  },

  methods:{
    gameSearch:function() {

      function xmlToJson(xml) {
	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};
	 this.foundEntries=0;
	 this.loading1=true; // reset status to loading
	 this.loadingStatus="Loading";
	 this.searchList=[]; //reset the search list
	 let link='https://www.boardgamegeek.com/xmlapi2/search?query='+this.searchName;
	// first, fetch the ids of games containing 'searchList'
     	 fetch(link)
	.then(response => response.text())
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(searchIDs => {
		console.log(xmlToJson(searchIDs));
		let jsonData=xmlToJson(searchIDs);
		
		let link='https://www.boardgamegeek.com/xmlapi2/thing?id=';
		// no items exist
		if (typeof jsonData.items.item == 'undefined') {
			this.loadingStatus='No game found containing that name';
			return true; }
		// if only 1 game is returned, it is not an array
		if (typeof jsonData.items.item.length == 'undefined') {
			this.foundEntries=1;
			link+=jsonData.items.item.attributes.id; }
		// if multiple games are found, they are returned as an array
		else {
			this.foundEntries=jsonData.items.item.length;
			let idSet=new Set();
			let j=0;
			while ( j<jsonData.items.item.length && j<this.maxEntries) {
				idSet.add(jsonData.items.item[j].attributes.id);
				j++;
			}
			
			for (id of idSet) { link+=id+',';  }
		link=link.substring(0, link.length - 1)
		}
	
		// from those IDs, fetch the game details
		fetch(link)
			.then(response => response.text())
			.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
			.then(data => {
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																				
				console.log(xmlToJson(data));
				jsonData2=xmlToJson(data);
				
				if (typeof jsonData.items.item.length == 'undefined') {
					this.searchList.push(jsonData2.items.item); }
				else {
					for (let k=0; k<jsonData2.items.item.length;k++) {
						this.loadMore();
						this.searchList.push(jsonData2.items.item[k]); } }
				return true;
			}).catch(err => { loadingStatus="No game found"; });
	this.loading1=false;
	return true;
	}).catch(err => { // If an error occurs, resolve it here
		console.log(err);
	    });	
    },
	loadMore: function() {
		this.loadingStatus+=".";
		if (this.loadingStatus.length > 22) {
			this.loadingStatus=this.loadingStatus.substring(0, 7) }
	},
	
	// Sometimes the API gives names in different languages. In this case, grab the english name.
	getName: function(gameName) {
	if (typeof gameName.length != 'undefined') {
		return gameName[0].attributes.value;
	}
	else { return gameName.attributes.value; }
	},

	// Occasionally, the API does not have an image for the game
	getImage:function(game) {
		if (typeof game.image != 'undefined') { return game.image["#text"]; }
		else {
	return 'https://vignette.wikia.nocookie.net/max-steel-reboot/images/7/72/No_Image_Available.gif/revision/latest?cb=20130902173013'; }
	},
   // doneLoading:function { loading2=false; },

	gameInfo: function(game) {
		if (this.currentGameID===game.attributes.id) {
			this.gameSelected=!this.gameSelected; }
		this.currentGame=game;
		this.currentGameID=game.attributes.id;
	},
	// occasionally, a yearpublished is not given
	getYear:function(game) {
		if (typeof game.yearpublished != 'undefined') { return '('+game.yearpublished.attributes.value+')'; }
		else if (typeof game.releasedate != 'undefined') { return '('+game.releasedate.attributes.value.substring(0,4)+')'; }
		else { return ''; }
	},
	
	getType: function(game) {
		if (game.attributes.type==='boardgame') { return 'Board game';}
		else if (game.attributes.type==='boardgameexpansion') { return 'Board game expansion';}
		else if (game.attributes.type==='boardgameaccessory') { return 'Board game accessory';}
		else if (game.attributes.type==='rpgitem') { return 'RPG accessory';}
		else if (game.attributes.type==='videogame') { return 'Video game'; }
		else { return ''; }
  	},

	getMinPlayers:function(game) {
		let players=game.minplayers.attributes.value;
		if (players<1) { players=1; }
		return players;
	},
	
	strip: function (html)
	{
	   var tmp = document.createElement("DIV");
	   tmp.innerHTML = html;
	   return tmp.textContent || tmp.innerText || "";
	},
}
});


/*
JSON --> items --> item[x] -->
attributes:
	id: "174973"
	type: "boardgame"
name:
	attributes:
		type:
		value:
yearpublished:
	attributes:
		value:
*/
