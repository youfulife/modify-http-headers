/**
 * Created by youfu on 7/29/2014.
 */
var headersInfo = [];
var tempHeader = {};
tempHeader.notChanged = false;
tempHeader.display = true;
tempHeader.name = '';
tempHeader.value = '';

$(document).ready(function(){
    var mhh = localStorage['salmonMHH'];
    if(mhh == undefined) {
        initDefaultHeaders();
    } else {
        headersInfo = JSON.parse(mhh);
        for (var i = 0; i < headersInfo.length; i++) {
            var name = headersInfo[i].name;
            var value = headersInfo[i].value;
            initHeaderTabValue(name, value);
            initHeaderTabEvents(name);
            if(i > 3) {
                addCustomHeaderCheckBox(name);
                addCustomHeaderNavTab(name);
                addCustomHeaderTabPane(name);
            }
        }

    }


    $('#addCustomHeader').on('click', function(){
        $('#addCustomHeaderModal').modal("show");
    });
    $('#saveCustomHeader').on('click', function(){
        if(tempHeader.name != '' && !headerNameRepeat(tempHeader.name)) {
            headersInfo.push(tempHeader);
            localStorage.salmonMHH = JSON.stringify(headersInfo);
            addCustomHeaderCheckBox(tempHeader.name);
            addCustomHeaderNavTab(tempHeader.name);
            addCustomHeaderTabPane(tempHeader.name);
        }
        $('#addCustomHeaderModal').modal("hide");
    });
    $('#customHeaderName').on('change', function(){
        tempHeader.name = $(this).val().toString().replace(/(^\s*)|(\s*$)/g, '');
    });
    $('#customHeaderValue').on('change', function(){
        tempHeader.value = $(this).val().toString().replace(/(^\s*)|(\s*$)/g, '');
    });
    $('input[type=checkbox]').on('change', function(){
        var name = $(this).prop('name');
        var display = $(this).prop('checked');
        var index = headerIndex(name);
        headersInfo[index].display = display;
        localStorage.salmonMHH = JSON.stringify(headersInfo);
    });

    $('#workHostFilter').on('input', function(){
        localStorage['includeUrlText'] = this.innerHTML.toString().replace(/(^\s*)|(\s*$)/g, '');
        //console.log(localStorage['includeUrlText']);
    })

    $('#resetDefault').on('click', function(){
        headersInfo = [];
        localStorage.removeItem('salmonMHH');
        localStorage.removeItem('includeUrlText');
    });

});


function headerIndex(name)
{
    for(var i=0; i < headersInfo.length; i++) {
        if(headersInfo[i].name == name) {
            return i;
        }
    }
    return -1;
}


function headerNameRepeat(name)
{
    for(var i=0; i < headersInfo.length; i++) {
        if(headersInfo[i].name == name) {
            return true;
        }
    }
    return false;
}


function addCustomHeaderCheckBox(name)
{
    var checkBoxId = 'display' + name;
    var html = '';
    html += '<div class="checkbox">';
    html += '<label><input id="'+checkBoxId+'" type="checkbox" checked name="'+name+'">' + name + '</label>';
    html += '</div>';
    $("div.checkbox:last").append(html);
    $('#'+checkBoxId).prop('checked', headersInfo[headerIndex(name)].display);
    $('#'+checkBoxId).on('change', function(){
        var name = $(this).prop('name');
        var display = $(this).prop('checked');
        var index = headerIndex(name);
        headersInfo[index].display = display;
        localStorage.salmonMHH = JSON.stringify(headersInfo);
    });
}


function addCustomHeaderNavTab(name)
{
    var tabPaneHref = '#' + name.toLowerCase() + 'Tab';
    var html = '';
    html += '<li>';
    html += '<a href="'+tabPaneHref+'" role="tab" data-toggle="tab">' + name + '</a></li>';
    $('ul li:eq(-2)').before(html);
}


function addCustomHeaderTabPane(name)
{
    var tabPaneId = name.toLowerCase() + 'Tab';
    var inputValueId = name.toLowerCase() + 'Value';
    var clearBtnId = 'clear' + name + 'Value';
    var saveBtnId = 'save' + name + 'ValuePersistence';
    var html = '';
    html += '<div class="tab-pane" id="'+tabPaneId+'"><br/><br/>';
    html += '<label for="'+inputValueId+'"><b>' + name + '</b></label><br/>';
    html += '<table class="table table-bordered table-hover" style="word-break:break-all">';
    html += '<tr><td class="col-lg-11"><div class="form-control-static" contenteditable="true" id="'+inputValueId +'"></div></td>';
    html += '<td><button type="button" class="btn" id="'+clearBtnId+'">' + '清空' + '</button></td></tr>';
    html += '</table><br/><div class="btn-group col-lg-offset-5">';
    html += '<button type="button" class="btn btn-lg btn-default" id="'+saveBtnId+'">' + '保存修改' + '</button>';
    html += '</div></div>';
    $('div.tab-pane:eq(-2)').before(html);
}


function initDefaultHeaders()
{
    $("input[type=checkbox]:checked").each(function() {
        var header = {};
        var name = $(this).attr('name');
        header.name = name;
        header.value = '';
        header.notChanged= true;
        header.display = true;
        headersInfo.push(header);
        initHeaderTabEvents(name);
    });
    localStorage.salmonMHH = JSON.stringify(headersInfo);
}


function initHeaderTabValue(name, value)
{
    var inputDivId = '#' + name.toString().toLowerCase() + 'Value';
    $(inputDivId).html(value);
}


function initHeaderTabEvents(name)
{
    var inputDivId = '#' + name.toString().toLowerCase() + 'Value';
    var saveBtnId = '#' + 'save' + name.toString() + 'Value' + 'Persistence';
    var clearBtnId = '#' + 'clear' + name.toString() + 'Value';
    $(inputDivId).on("input", function (event) {

        var header = {};
        header.name = name;
        header.value = event.target.innerHTML;
        header.notChanged = false;
        header.display = true;
        for(var i=0; i < headersInfo.length; i++) {
            if(headersInfo[i].name == header.name) {
                headersInfo.splice(i, 1);
            }
        }
        headersInfo.push(header);
    });
    $(saveBtnId).on('click', function() {
        localStorage.salmonMHH = JSON.stringify(headersInfo);
    });
    $(clearBtnId).on('click', function(){
        //console.log($('#refererValue').html());
        for(var i=0; i < headersInfo.length; i++) {
            if(headersInfo[i].name == name) {
                headersInfo.splice(i, 1);
            }
        }
        $(inputDivId).empty();
    });
}