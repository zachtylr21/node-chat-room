var username = "";
var socket = io();

$(function () {
    $('form').submit(function(){
        socket.emit('chat message', username, $('#m').val());
        $('#m').val('');
        return false;
    });

    socket.on('chat message', function(usr, msg){
        $('#messages').append($('<li>').text(usr + ": " + msg));
    });

    socket.on('new user', function(usr) {
        $('#messages').append($('<li>').text(usr + " joined!"));
    });

    socket.on('user disconnect', function(usr) {
        $('#messages').append($('<li>').text(usr + " left."));
    });

    socket.on('user typing', function(usr) {
        $("#display-typing").text(usr + " is typing...");
        setTimeout(function () {
            $("#display-typing").text("");
            }, 5000);
    });
});

$(document).ready(function (){
    username = prompt("Please enter your username");
    if(username=="") username="lazy pants";
    $("#display-username").text("Username: " + username);
    socket.emit('new user', username);

    $("#m").keyup(function() {
        socket.emit('user typing', username);
    });

    $("#m").keypress(function (e) {
        if(e.which == 13 && !e.shiftKey) {        
            $(this).closest("form").submit();
            e.preventDefault();
            return false;
        }
    });
});