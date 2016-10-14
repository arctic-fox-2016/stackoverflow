$(document).ready(function(){
  $("button[name='register']").click(function(event){
    event.preventDefault()
    $.ajax({
      url:'/request/register',
      type: 'POST',
      data: {username: $("input[name='register-username']").val(), password:$("input[name='register-password']").val()},
      success: function(result){
        console.log(result)
        $("#message").html("You have successfully registered, please login")
      }
    })
  })

  $("button[name='login']").click(function(event){
    event.preventDefault()
    $.ajax({
      url:'/request/login',
      type: 'POST',
      data: {username: $("input[name='login-username']").val(), password:$("input[name='login-password']").val()},
      success: function(result){
        console.log(result)
        window.location.href="/dashboard"
      }
    })
  })
})
