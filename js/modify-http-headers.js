/**
 * Created by youfu on 7/29/2014.
 */

$(document).ready(function(){
    var headerInfo = JSON.parse(localStorage['salmonMHH']);
    var info='';
    info += '<table class="table table-bordered table-striped table-hover" style="word-break:break-all">';
    console.log(headerInfo);
    for(var i=0; i < headerInfo.length; i++) {
        if(headerInfo[i].display) {
            info += '<tr><td>'+ headerInfo[i].name +'</td><td>';
            if (headerInfo[i].notChanged) {
                info += '<input type="checkbox">';
            } else {
                info += '<input type="checkbox" checked>';
            }
            info += ' custom</td></tr>';
            info += '<tr><td colspan="2"><div contenteditable="true" class="form-control-static" id="' + headerInfo[i].name + '" value="' + headerInfo[i].value + '">';
            info += '</td></tr>';
        }
    }
    info += '</table>';
    $('#div1').html(info);

    $('#browserDefault').change(function(){
        if($(event.target).prop('checked')) {
            for (var i = 0; i < headerInfo.length; i++) {
                headerInfo[i].notChanged = true;
            }
            $('button.btn-default').attr('disabled', 'true');
            $('input.headerValue').attr('disabled', 'true');
        } else {
            $('button.btn-default').removeAttr('disabled');
            $('input.headerValue').removeAttr('disabled');
        }
    });

    $('.selected').on('click', function(){
        var targetName = $(event.target).parent().parent().parent().find('button')[0].innerHTML;
        for(var i=0; i < headerInfo.length; i++){
            if(headerInfo[i].name == targetName){
                headerInfo[i].notChanged = !headerInfo[i].notChanged;
            }
        }
        var tempText = $(event.target).parent().parent().parent().find('button')[1].innerText;
        $(event.target).parent().parent().parent().find('button')[1].innerHTML = $(event.target).html()+'<span class="caret"></span>';
        $(event.target).html(tempText);
    });

});