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

  $('#addArtist').click((e) => {
    e.preventDefault();

    $.ajax({

    }).done((data) => {
      console.log('show artist form');
      showArtistForm(data);
    });
  });

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
  $('#artist_form_submit').click( (e) =>  {
    e.preventDefault();
    // saveArtistData = {};
    // saveArtistData.name = $('#name').val();
    // saveArtistData.img_url = $('#img_url').val();
    // saveArtistData.nationality = $('#nationality').val();
    // saveArtistData.birthYear = $('#birthYear').val();
    // saveArtistData.description = $('#description').val();
    // console.log(data)

    var new_artist_data = $('.artist_form').serialize();
    $.ajax({
      type: "POST",
      url: "/artists",
      data: new_artist_data
      console.log('artist has been saved')
    })
  })


  //edit artist info from front end and sends to server.
    $('#artist_edit_submit').click( (e) => {
      e.preventDefault();
      // editArtistData = {};
      // editArtistData.name = $('#name').val();
      // editArtistData.img_url = $('#img_url').val();
      // editArtistData.nationality = $('#nationality').val();
      // editArtistData.birthYear = $('#birthYear').val();
      // editArtistData.description = $('#description').val();
      // console.log(editArtistData);
      var edit_artist_data = $('.artist_edit_form').serialize();

      $.ajax({
        type: "PUT",
        url: "/artists",
        data: edit_artist_data
        console.log('artist has been saved')
      })
    })

  //edit painting info
    $('#painting_form_submit').click( (e) => {
      e.preventDefault();
      // editPaintingData = {};
      // editPaintingData.title = $('#title').val();
      // editPaintingData.img_url = $('#img_url').val();
      // editPaintingData.year_made = $('#year_made').val();
      // console.log(editPaintingData);
        var edit_painting_data = $('.painting_form').serialize();
      $.ajax({
        type: "PUT",
        url: "/paintings",
        data: edit_painting_data;
        console.log('painting data updated')
      })
    })
});
