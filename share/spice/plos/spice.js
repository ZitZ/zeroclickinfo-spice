// TODO

function ddg_spice_plos(request) {

  // Get query and exclude the trigger.
  var query = DDG.get_query().replace(/plos/i, "");

  // Check if response is OK and results > 0.
  var status = request['responseHeader']['status'];
  var numFound = request['response']['numFound'];

  if (status === 0 && numFound > 0) {
    // Get docs and define loop limit.
    var docs = request['response']['docs'];
    if (docs.length < 5) {
      var limit = docs.length;
    } else {
      var limit = 5;
    };

    // Create object for results.
    var results = '<div>'
                + '<span style="font-family:monospace;padding-bottom:1em;">Data Provided by PLOS</span>'
                + '<ol style="padding-top:0.5em;">';

    // Loop over documents.
    for (var i = 0; i < limit; i++) {
      // Define article and its id.
      var doc = docs[i];
      var id = doc['id'];

      // Write article citation.
      results += '<li style="padding-bottom:0.5em;">'
              + '<a href="http://dx.doi.org/' + id + '" style="">';
      
      // Title, has to exist.
      var title = doc['title_display'];
      results += '<span style="color:#333333;">' + title + '</span><br>';

      // Author list trimmed for more than 3 authors.
      var author_list = doc['author_display'];
      if (author_list.length > 3) {
        var authors = author_list.splice(0, 3).join(', ') + ', et al';
      } else {
        var authors = author_list.join(', ');
      }
      results += '<span style="color:#444444;font-size:0.8em;">' + authors + '.</span> ';

      // Journal, only add if it is defined.
      if (doc['journal']) {
        var journal = doc['journal'];
        results += '<span style="color:#444444;font-style:italic;font-size:0.8em;">' + journal + '</span> ';
      } 

      // Publication date and year.
      var pubdate = doc['publication_date'];
      var year = pubdate.substr(0, 4);
      results += '<span style="color:#444444;font-size:0.8em;">(' + year + ')</span>';

      // Close up citation.
      results += '</a>'
              + '</li>';
    };

    // Finish results.
    results += '</ol>'
            + '</div>';

    // Define callback items.
    var items = [[]];
    items[0] = {
      a: results,
      h: query + ' (PLOS)',
      s: 'PLOS',
      u: 'http://www.plosone.org/search/advancedSearch.action?pageSize=50&unformattedQuery=' + query,
      force_big_header: true,
    }
    nra(items);
  }
}
