

import {Jsonp, URLSearchParams} from 'angular2/http';

var params = new URLSearchParams();
    params.set('search', term); // the user's search value
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    // TODO: Add error handling
    return this.jsonp
      .get(wikiUrl, { search: params })
      .map(request => <string[]> request.json()[1]);