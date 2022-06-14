import { getAll, get } from './model.js';

export async function listAction(request, response) {
  try{
    const movies = await getAll(1); //Im Moment verfügen wir über keine Benutzer-Id. Lösung: Setzen für den Benutzer den Wert 1
    const moviesResponse = {
    movies,
    links: [{rel: 'self', href: request.baseUrl + '/'}], //links-Eigenschaften (HATEOAS)
    };
    response.json(moviesResponse); //Objekt wird statt mit render- oder send-Methode mit der json-Methode des Response-Objekt zurückgesendet.
  } catch (e) {
    console.error(e);
    response.status(500).send('An error happened'); //Fehler beim Auslesen von Datensätzen werden angezeigt.
  } 
}

export async function detailAction(request, response){
  try{
    const movie = await get(request.params.id, 1);
    if (!movie){
      response.status(404).send('Not Found'); //Der Datensatz kann nicht gefunden werden.
      return;
    }
    const movieResponse = {
    ...movie,
    links: [{rel: 'self', href: `${request.baseUrl}/${movie.id}`}],
    };
    response.json(movieResponse);
  } catch (e){
    onsole.error(e);
    response.status(500).send('An error happened');
  }
  
}
