/**
 * Created by youfu on 7/29/2014.
 */

$(document).ready(function(){
    var mhh = localStorage['salmonMHH'];
    if(mhh == undefined) {
         window.open('options.html');
         window.close();
    }
    var headerInfo = JSON.parse(mhh);
    var info='';
    info += '<table class="table table-bordered table-striped table-hover" style="word-break:break-all">';
    for(var i=0; i < headerInfo.length; i++) {
        if(headerInfo[i].display) {
            var checkboxId = 'custom'+ headerInfo[i].name;
            info += '<tr><td>'+ headerInfo[i].name +'</td><td>';
            if (headerInfo[i].notChanged) {
                info += '<input id="'+checkboxId+'" type="checkbox" name="'+ headerInfo[i].name +'">';
            } else {
                info += '<input id="'+checkboxId+'" type="checkbox" checked name="'+ headerInfo[i].name +'">';
            }
            info += ' custom</td></tr>';
            info += '<tr><td colspan="2">';

            if (headerInfo[i].notChanged) {
                info += '<div contenteditable="false" class="form-control-static" id="' + headerInfo[i].name + '">';
                info += 'Browser Default';
            } else {
                info += '<div contenteditable="true" class="form-control-static" id="' + headerInfo[i].name + '">';
                if(headerInfo[i].value == undefined || headerInfo[i].value == '') {
                    info += 'Null';
                } else {
                    info += headerInfo[i].value;
                }
            }
            info += '</div>';
            info += '</td></tr>';
        }
    }
    info += '</table>';
    $('#div1').html(info);

    $('input[type=checkbox]').on('change', function(){
        var name = $(this).attr('name');
        var custom = $(this).prop('checked');
        for(var i=0; i < headerInfo.length; i++) {
            if(headerInfo[i].name == name) {
                if(custom == true) {
                    if(headerInfo[i].value == undefined || headerInfo[i].value == '') {
                        $(this).parent().parent().next().find('div').html('Null');
                    } else {
                        $(this).parent().parent().next().find('div').html(headerInfo[i].value);
                    }
                    $(this).parent().parent().next().find('div').attr('contenteditable', true);

                } else {
                    $(this).parent().parent().next().find('div').html('Browser Default');
                    $(this).parent().parent().next().find('div').attr('contenteditable', false);
                }
                headerInfo[i].notChanged = !custom;
            }
        }
        localStorage.salmonMHH = JSON.stringify(headerInfo);
    });

    $('div[contenteditable=true]').on('input', function(){
        var name = $(event.target).attr('id');

        for(var i=0; i < headerInfo.length; i++) {
            if(headerInfo[i].name == name) {
                headerInfo[i].value = event.target.innerHTML;
            }
        }
        localStorage.salmonMHH = JSON.stringify(headerInfo);
    });

    $('div[contenteditable=false]').on('input', function(){
        var name = $(event.target).attr('id');

        for(var i=0; i < headerInfo.length; i++) {
            if(headerInfo[i].name == name) {
                headerInfo[i].value = event.target.innerHTML;
            }
        }
        localStorage.salmonMHH = JSON.stringify(headerInfo);
    });

});