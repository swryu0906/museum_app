'use strict'

$(function(){

  let renderTemplate_show_artists = Handlebars.compile($('template#artist-template').html());
  let renderTemplate_show_paintings = Handlebars.compile($('template#painting-template').html());
  let renderTemplate_show_artists_form = Handlebars.compile($('template#artist-form-template').html());
  let renderTemplate_show_paintings_form = Handlebars.compile($('template#painting-form-template').html());

// =================================================================
// Link Click Events ===============================================
// =================================================================

  $('#showArtist').click((e) => {
    e.preventDefault();

    $.ajax({
      type: "GET",
      url: "/artists"
    }).done((data) => {
      console.log('show artists');
      showArtist(data);
    });
  });

  $('#showPainting').click((e) => {
    e.preventDefault();

    $.ajax({
      type: "GET",
      url: "/paintings"
    }).done((data) => {
      console.log('show paintings')
      showPainting(data);
    });
  });

  // show the Create Artist form
  $('#addArtist').click((e) => {
    e.preventDefault();

    $.ajax({

    }).done((data) => {
      console.log('show artist form');
      showArtistForm(data);
    });
  });

  // show the Create Artist form
  $('#addPainting').click((e) => {
    e.preventDefault();

    $.ajax({

    }).done((data) => {
      console.log('show artist form');
      showPaintingForm(data);
    });
  });

// =================================================================
// Render templates ================================================
// =================================================================

  let showArtist = (data) => {
    resetView();
    
    let $results = $('.results-div');
    let compiledTemplate = renderTemplate_show_artists(data);
    $results.html('').append(compiledTemplate)
  }

  let showPainting = (data) => {
    resetView();

    let $results = $('.results-div');
    let compiledTemplate = renderTemplate_show_paintings(data);
    $results.html('').append(compiledTemplate);
  }

  let showArtistForm = (data) => {
    resetView();

    let $form = $('.form-div');
    let compiledTemplate = renderTemplate_show_artists_form(data);
    $form.html('').append(compiledTemplate);
  }

  let showPaintingForm = (data) => {
    resetView();

    let $form = $('.form-div');
    let compiledTemplate = renderTemplate_show_paintings_form(data);
    $form.html('').append(compiledTemplate);
  }

  // clear out the previous results and forms field
  let resetView = () => {
    $('.results-div').empty();
    $('.form-div').empty();
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
