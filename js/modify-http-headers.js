/**
 * Created by youfu on 7/29/2014.
 */



$(document).ready(function(){
    var headerInfo = JSON.parse(localStorage['salmonMHH']);
    var info='';
    info += '<table class="table table-bordered table-condensed table-hover">';
    for(var i=0; i < headerInfo.length; i++) {
        if(headerInfo[i].display) {
            info += '<tr><div class="input-group"><div class="input-group-btn">';
            info += '<button type="button" class="btn btn-default">' + headerInfo[i].name + '<\/button>';
            info += '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">';
            if (headerInfo[i].notChanged) {
                info += '浏览器默认 <span class="caret"></span></button>';
                info += '<ul class="dropdown-menu" role="menu">';
                info += '<li><a href="#" class="selected">自定义</a></li>';
            } else {
                info += '自定义 <span class="caret"></span></button>';
                info += '<ul class="dropdown-menu" role="menu">';
                info += '<li><a href="#" class="selected">浏览器默认</a></li>';
            }
            info += '<li class="divider"></li>';
            info += '<li><a href="#" class="deleteHeader">删除</a></li>';
            info += '</ul></div>';
            info += '<input type="text" class="form-control headerValue" id="' + headerInfo[i].name + '" value="' + headerInfo[i].value + '">';
            info += '</div></tr>';
        }
    }
    info += '</table>';
    $('#div1').html(info);

    $('.headerValue').change(function(){
        var targetId = $(event.target).attr('id');
        var targetValue = $(event.target).val();
        for(var i=0; i < headerInfo.length; i++){
            if(headerInfo[i].name == targetId){
                headerInfo[i].value = targetValue;
            }
        }
    });

    $('#savePersistence').click(function(){
        localStorage.salmonMHH = JSON.stringify(headerInfo);
    });

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

    $('.deleteHeader').click(function(){
        var targetName = $(event.target).parent().parent().parent().find('button')[0].innerHTML;
        for(var i=0; i < headerInfo.length; i++){
            if(headerInfo[i].name == targetName){
                headerInfo.splice(i, 1);
            }
        }
        $(event.target).parent().parent().parent().parent().empty();
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