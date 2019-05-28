var dbPromise = idb.open('basededatos', 5, function (upgradeDb) {
	upgradeDb.createObjectStore('modelo', { keyPath: 'pk' });
});


//collect latest post from server and store in idb
fetch('http://127.0.0.1:8000/vista').then(function (response) {
	return response.json();
}).then(function (jsondata) {
	dbPromise.then(function (db) {
		var tx = db.transaction('modelo', 'readwrite');
		var blogStore = tx.objectStore('modelo');
		for (var key in jsondata) {
			if (jsondata.hasOwnProperty(key)) {
				blogStore.put(jsondata[key]);
			}
		}
	});
});

//retrive data from idb and display on page
var post = "";
dbPromise.then(function (db) {
	var tx = db.transaction('modelo', 'readonly');
	var blogStore = tx.objectStore('modelo');
	return blogStore.openCursor();
}).then(function logItems(cursor) {
	if (!cursor) {
		document.getElementById('offlinedata').innerHTML = post;
		return;
	}
	for (var field in cursor.value) {
		if (field == 'fields') {
			blogData = cursor.value[field];
			for (var key in blogData) {
				if (key == 'titulo') {
					var titulo = '<h5>' + blogData[key] + '</h5>';
				}
				if (key == 'autor') {
					var autor = blogData[key];
				}
				if (key == 'texto') {
					var texto = '<p>' + blogData[key] + '</p>';
				}
			}
			post = post + '<br>' + titulo + '<br>' + autor + '<br>' + texto + '<hr>';
		}
	}
	return cursor.continue().then(logItems);
});
