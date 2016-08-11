
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
          user=$("#user").val();
          pass=$("#password").val();
          $.post("http://localhost:3000/submitOrder",{name: $('#name').val(), email: $('#email').val(), inspiration: $('#inspiration').val(), message: $('textarea#message').val()}, function(data){
            if(data==='complete')
            {
        	  $('#sucsessModal').foundation('reveal','open');
            }
         	else if (data==='error of some sort'){
       		   	console.log("an error occured")
       		 }
          });

        });