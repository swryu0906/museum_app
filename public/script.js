'use strict'

$(function(){

  let renderTemplate_show_artists = Handlebars.compile($('template#NAME').html());

    $('#showArtist').click( =>(e){
      e.preventDefault();

    $.ajax({
      // need URL from SUNGWON
      url: ""
    }).done( => (data){
      console.log('show artist')
      showArtist(data);
    });
  });

    let showArtist = =>(data){
      let $results = $('.results-div');
      let compiledTemplate = renderTemplate_show_artists(data);
      $results.html('').append(compiledTemplate)
    }
  }


//pulls new artist info from front end and sends to server.
  $('#artist_form_save').click( => (e){
    e.preventDefault();
    saveArtistData = {};
    saveArtistData.name = $('#name').val();
    saveArtistData.img_url = $('#img_url').val();
    saveArtistData.nationality = $('#nationality').val();
    saveArtistData.birthYear = $('#birthYear').val();
    saveArtistData.description = $('#description').val();
    console.log(data)

    $.ajax({
      type: "POST",
      // need route from Sungwon
      url: "/",
      data: saveArtistData;
      console.log('artist has been saved')
    })
  })









});
