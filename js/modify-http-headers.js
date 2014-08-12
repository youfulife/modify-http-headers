/**
 * Created by youfu on 7/29/2014.
 */

$(document).ready(function(){
    var headerInfo = JSON.parse(localStorage['salmonMHH']);
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
            info += '<tr><td colspan="2"><div contenteditable="true" class="form-control-static" id="' + headerInfo[i].name + '"></div>';
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
                if(custom == true && headerInfo[i].value != undefined && headerInfo[i].value != '') {
                    $(this).parent().parent().next().html(headerInfo[i].value);
                } else {
                    $(this).parent().parent().next().html('Browser Default');
                }
                headerInfo[i].notChanged = !custom;
            }
        }
        localStorage.salmonMHH = JSON.stringify(headerInfo);
    });
});