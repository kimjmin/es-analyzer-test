$(function(){

  $("#analyzeBtn").on("click", function( event ) {
    var chk_arr_vals = [];
    var a_text_val = $('#a_text').val();
    var chk_arr = $('#alalyzer_list input[type="checkbox"]:checked');
    chk_arr.each( function(){
//      console.log( $(this).val() );
      chk_arr_vals.push($(this).val());
    });
    // console.log(chk_arr_vals);
    // console.log(a_text_val);
    $('#analyzer_results').html("");
    for(var i=0; i< chk_arr_vals.length; i++){
      var anz_title = chk_arr_vals[i];
      $.ajax({
        url: "/es",
        method: "POST",
        data: {
          analyzers: anz_title,
          a_text: a_text_val
        },
        success: function( result ) {
          console.log(result.data.tokens);
          var result_panel = "";
          result_panel += $('#analyzer_results').html();
          result_panel += '<div class="panel panel-default">';
          result_panel +='<div class="panel-heading">';
          result_panel +='<h3 class="panel-title">'+result.analyzer+'</h3>';
          result_panel +='</div>';
          result_panel +='<div class="panel-body">';
          for(var t=0; t< result.data.tokens.length; t++){
            
            if(t > 0 && result.data.tokens[t].position === result.data.tokens[t-1].position){
              result_panel += ' <button type="button" class="btn btn-success btn-sm">'+result.data.tokens[t].token+'</button> ';
            } else {
              if(t > 0){result_panel +='</p></div>';}
              result_panel += '<div class="row"><p>';
              result_panel += "&nbsp;&nbsp;P: "+result.data.tokens[t].position;
              result_panel += '&nbsp;&nbsp;<button type="button" class="btn btn-success btn-sm">'+result.data.tokens[t].token+'</button> ';
            }
            
            if(t === result.data.tokens.length-1){result_panel += '</p></div>';}
            //result_panel += result.tokens[t];
            
          }
          result_panel +='</div>';
          result_panel +='</div>';
          result_panel +='</div>';
          $('#analyzer_results').html(result_panel);

        }
      });
    }
  });


});