const version = 'v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(version).then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/quizproject.css',
        '/generalknowledge.html',
		'/quizproject_gk.js',
		'/math.html',
		'/quizproject_math.js',
		'/sports.html',
		'/quizproject_sports.js',
		'/science.html',
		'/quizproject_science.js',
		'/videogame.html',
		'/quizproject_vg.js',
		'/film.html',
		'/quizproject_film.js',
        '/notfound.txt',
			'quizimages/generalknowledge.jpg',
			'quizimages/math.png',
			'quizimages/sports.png',
			'quizimages/testtube.png',
			'quizimages/videogame.jpg',
			'quizimages/film.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();

        caches.open(version).then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('/notfound.txt');
      });
    }
  }));
});