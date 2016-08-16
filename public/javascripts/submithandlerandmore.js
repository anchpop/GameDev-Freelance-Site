
/*
$('#submit-btn').click(function()
{
	$.ajax({
        url: '/submitOrder',
        type: 'POST',
        data: { 'a': 1} ,
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            alert(response.status);
        },
        error: function () {
            alert("error");
        }
    }); 
    //$("#contact").ajaxSubmit({url: 'submitOrder', type: 'post'})
});*/

$("#submit-btn").click(function(){
  $.post("/submitOrder",{name: $('#name').val(), email: $('#email').val(), inspiration: $('#inspiration').val(), message: $('textarea#message').val()}, function(data){
    if(data==='complete')
    {
	  $('#successModal').foundation('reveal','open');
    }
  	else if (data==='error of some sort'){
		   	console.log("an error occured")
		 }
  });

});

$("#question_submit-btn").click(function(){
  $.post("/submitQuestion",{name: $('#question_name').val(), email: $('#question_email').val(), message: $('#question_message').val()}, function(data){
    if(data==='complete')
    {
      $('#question_successModal').foundation('reveal','open');
    }
    else if (data==='error of some sort'){
        console.log("an error occured")
     }
  });

});


$("#question_email").focus(function() {
}).blur(function() {

  console.log($("#question_emailLabel").val());
  if ($("#question_email").val() != "" && !email_test($("#question_email").val()))
  {
    $("#question_submit-btn").prop('disabled', true);
    $("#question_emailLabel").text("That is a very creative email")
    $("#question_emailLabel").css({ color: "red" });
  }
});



function email_test(email)
{
  var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return regex.test(email);
}




function question_allOrderFieldsGood()
{
  return email_test($("#question_email").val()) && $("#question_name").val() != "" && $("#question_message").val() != "";
}

$("#question_email").on("input", function() {
  if ($("#question_email").val() == "" || email_test($("#email").val()))
  {
    $("#question_emailLabel").text("Your email");
    $("#question_emailLabel").css({ color: "black" });
  }
  $("#question_submit-btn").prop('disabled', !question_allOrderFieldsGood());
});

$("#question_name").on("input", function() { $("#question_submit-btn").prop('disabled', !question_allOrderFieldsGood()); });


$("#question_message").on("input", function() { $("#question_submit-btn").prop('disabled', !question_allOrderFieldsGood()); });









$("#email").focus(function() {
}).blur(function() {

  console.log($("#emailLabel").val());
  if ($("#email").val() != "" && !email_test($("#email").val()))
  {
    $("#submit-btn").prop('disabled', true);
    $("#emailLabel").text("That is a very creative email")
    $("#emailLabel").css({ color: "red" });
  }
});

function allOrderFieldsGood()
{
  return email_test($("#email").val()) && $("#name").val() != "" && $("#message").val() != "";
}

$("#email").on("input", function() {
  if ($("#email").val() == "" || email_test($("#email").val()))
  {
    $("#emailLabel").text("Your email");
    $("#emailLabel").css({ color: "black" });
  }
  $("#submit-btn").prop('disabled', !allOrderFieldsGood());
});

$("#name").on("input", function() { $("#submit-btn").prop('disabled', !allOrderFieldsGood()); });


$("#message").on("input", function() { $("#submit-btn").prop('disabled', !allOrderFieldsGood()); });