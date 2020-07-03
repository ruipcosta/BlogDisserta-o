var movLeft = 0;
var movRight = 0;
var movUp = 0;
var movDown = 0;
var time = 3;
var start = false;
var intervalId;


function makeLeftRand(){
    let randLeft1 = Math.floor(Math.random() * (Math.floor(1470) - Math.ceil(10) + 1)) + Math.ceil(10);
    let randLeft2 = 3;
    let randLeft3 = 3;
    let randLeft4 = 3;
    let randLeft5 = 3;
    do {
        randLeft2 =  Math.floor(Math.random() * (Math.floor(1470) - Math.ceil(10) + 1)) + Math.ceil(10);
    }
    while(randLeft2==randLeft1);
    do {
        randLeft3 =  Math.floor(Math.random() * (Math.floor(1470) - Math.ceil(10) + 1)) + Math.ceil(10);
    }
    while(randLeft3==randLeft1 || randLeft3==randLeft2);
    do {
        randLeft4 =  Math.floor(Math.random() * (Math.floor(1470) - Math.ceil(10) + 1)) + Math.ceil(10);
    }
    while(randLeft4==randLeft1 || randLeft4==randLeft2 || randLeft4==randLeft3);
    do {
        randLeft5 =  Math.floor(Math.random() * (Math.floor(1470) - Math.ceil(10) + 1)) + Math.ceil(10);
    }
    while(randLeft5==randLeft1 || randLeft5==randLeft2 || randLeft5==randLeft3 || randLeft5==randLeft4);
    
    return [randLeft1,randLeft2,randLeft3,randLeft4,randLeft5]
}

function makeTopRand(){
    let randTop1 = Math.floor(Math.random() * (Math.floor(600) - Math.ceil(1) + 1)) + Math.ceil(1);
    let randTop2 = 3;
    let randTop3 = 3;
    let randTop4 = 3;
    let randTop5 = 3;
    do {
        randTop2 =  Math.floor(Math.random() * (Math.floor(600) - Math.ceil(1) + 1)) + Math.ceil(1);
    }
    while(randTop2==randTop1);
    do {
        randTop3 =  Math.floor(Math.random() * (Math.floor(600) - Math.ceil(1) + 1)) + Math.ceil(1);
    }
    while(randTop3==randTop1 || randTop3==randTop2);
    do {
        randTop4 =  Math.floor(Math.random() * (Math.floor(600) - Math.ceil(1) + 1)) + Math.ceil(1);
    }
    while(randTop4==randTop1 || randTop4==randTop2 || randTop4==randTop3);
    do {
        randTop5 =  Math.floor(Math.random() * (Math.floor(600) - Math.ceil(1) + 1)) + Math.ceil(1);
    }
    while(randTop5==randTop1 || randTop5==randTop2 || randTop5==randTop3 || randTop5==randTop4);

    return [randTop1,randTop2,randTop3,randTop4,randTop5]
}
function makeWidthRand(){
    let randWidth1 = Math.floor(Math.random() * (Math.floor(100) - Math.ceil(58) + 1)) + Math.ceil(58);
    let randWidth2 = 3;
    let randWidth3 = 3;
    let randWidth4 = 3;
    let randWidth5 = 3;
    do {
        randWidth2 =  Math.floor(Math.random() * (Math.floor(100) - Math.ceil(58) + 1)) + Math.ceil(58);
    }
    while(randWidth2==randWidth1);
    do {
        randWidth3 =  Math.floor(Math.random() * (Math.floor(100) - Math.ceil(58) + 1)) + Math.ceil(58);
    }
    while(randWidth3==randWidth1 || randWidth3==randWidth2);
    do {
        randWidth4 =  Math.floor(Math.random() * (Math.floor(100) - Math.ceil(58) + 1)) + Math.ceil(58);
    }
    while(randWidth4==randWidth1 || randWidth4==randWidth2 || randWidth4==randWidth3);
    do {
        randWidth5 =  Math.floor(Math.random() * (Math.floor(100) - Math.ceil(58) + 1)) + Math.ceil(58);
    }
    while(randWidth5==randWidth1 || randWidth5==randWidth2 || randWidth5==randWidth3 || randWidth5==randWidth4);

    return [randWidth1,randWidth2,randWidth3,randWidth4,randWidth5]
}

$(function() {
	// Keydown listener
	$(document).keydown(function(e) {
        ek = e.keyCode;
		if (ek==37) movLeft=1;
		if (ek==39) movRight=1;
		if (ek==38) movUp=1;
		if (ek==40) movDown=1;
	});
	// Keyup listener
	$(document).keyup(function(e) {
		ek = e.keyCode;
		if (ek==37) movLeft=0;
		if (ek==39) movRight=0;
		if (ek==38) movUp=0;
		if (ek==40) movDown=0;
	});
});


$(document).ready(function(){
    $("#txtbeg").hide()
    $('.arrow').hide();
    $('img').hide(); 
    jQuery('<div/>', {
        id: '5',
        "class": 'circle',
    }).appendTo('body');
    
    $("#txttimer").text(time);
    setup("all");

    $(document).keyup(function(e){
            if (e.originalEvent.code == "Enter"){
                $("#txtstart").hide();
                $("#txtbeg").show()
                intervalId = setInterval("timer()",1000);
            }
    })
})

function timer(){
    time--;
    if (time==2) $('#txtbeg').fadeOut(2000);
    if (time==0){
        clearInterval(intervalId);
        $('.arrow').show();
        $('img').show(); 
        setInterval("play()", 10);
    }
    $("#txttimer").text(time);
}

function checkPosition(){
    $(".line").detach();
    $(".cone").detach();
    for (i=1;i<=5;i++){
        let circle = $(`.circle#${i}`);
        var y=circle.position().top;
        var x=circle.position().left;
        createCone(i,x,y);

        if (y>600) {
            circle.hide();
            setup(i);
        }
    }

}

function setup(statement){
    let randWidth = makeWidthRand();
    let randLeft = makeLeftRand();
    let randTop = makeTopRand();
    console.log(randWidth);
    if (statement=="all"){
        for (let i=1; i<=5;i++){
            let borderRadius=randWidth[i-1]/2;
            let borderRadiusTarget=borderRadius-26;
            let widthTarget = randWidth[i-1]-53;
            $(`.circle#${i}`).css({
                "top":-50-randTop[i-1],
                "left":randLeft[i-1],
                "width":randWidth[i-1],
                "height":randWidth[i-1],
                "-webkit-border-radius": borderRadius,
                "-moz-border-radius": borderRadius,
                "border-radius": borderRadius
            });
            $(`.target#${i*10}`).css({
                "top":-50-randTop[i-1]+borderRadius-borderRadiusTarget,
                "left":randLeft[i-1]+borderRadius-borderRadiusTarget,
                "width":widthTarget,
                "height":widthTarget,
                "-webkit-border-radius": borderRadiusTarget,
                "-moz-border-radius": borderRadiusTarget,
                "border-radius": borderRadiusTarget
            });
        }
    }
    else {
        let borderRadius=randWidth[i-1]/2;
        let borderRadiusTarget=borderRadius-26;
        let widthTarget = randWidth[i-1]-53;
        $(`.circle#${statement}`).css({
            "top":-50-randTop[statement-1],
            "left":randLeft[statement-1],
            "width":randWidth[i-1],
            "height":randWidth[i-1],
            "-webkit-border-radius": borderRadius,
            "-moz-border-radius": borderRadius,
            "border-radius": borderRadius
        
        });
        $(`.target#${statement*10}`).css({
            "top":-50-randTop[i-1]+borderRadius-borderRadiusTarget,
                "left":randLeft[i-1]+borderRadius-borderRadiusTarget,
                "width":widthTarget,
                "height":widthTarget,
                "-webkit-border-radius": borderRadiusTarget,
                "-moz-border-radius": borderRadiusTarget,
                "border-radius": borderRadiusTarget
        });
    
    }

    $('.circle').show();
}

function createCone(i,x1,y1){
    let targetradius = $(`.circle#${i}`).width()/2;
    y1+=targetradius;
    x1+=targetradius;
    let x2=768;
    let y2=600;     
    let target2car = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
    let car2tangent = Math.sqrt(Math.pow(target2car,2)-Math.pow(targetradius,2));
    let tangent2target_angle = Math.asin(targetradius/target2car) * 180 / Math.PI;

    let target2car_angle = Math.atan2(y1-y2, x1-x2)* 180 / Math.PI;
    let tangentline1 = target2car_angle + tangent2target_angle;
    let tangentline2 = target2car_angle - tangent2target_angle;
    target2car_angle+=90+180;
    let transform = 'rotate('+target2car_angle+'deg)';
    let transform1 = 'rotate('+tangentline1+'deg)';
    let transform2 = 'rotate('+tangentline2+'deg)';

    var cone = $('<div>')
        .appendTo('body')
        .addClass('cone')
        .css({
            'transform': transform,
            "border-bottom-width": target2car,
            "border-left-width":targetradius,
            "border-right-width":targetradius,
            left:768-targetradius,
            top:600});
    
    var line = $('<div>')
        .appendTo('body')
        .addClass('line')
        .css({
          'position': 'absolute',
          'transform': transform1
        })
        .width(car2tangent)
        .css({left: 768, top:600});
    
    var line = $('<div>')
    .appendTo('body')
    .addClass('line')
    .css({
      'position': 'absolute',
      'transform': transform2
    })
    .width(car2tangent)
    .css({left: 768, top:600});

    return line;
}

function play(){
    $(".arrow").css({'transform': 'rotate(0deg)'});
    checkPosition();
    $('.circle').css({"top":"+=1"});
    $('.target').css({"top":"+=1"});
    if (movUp)  {
        $('.circle').css({"top":"+=1"});
        $('.target').css({"top":"+=1"});
    }
    if (movDown)  {
        $('.circle').css({"top":"-=1"});
        $('.target').css({"top":"-=1"});
    }
    if (movRight) {
        $('.circle').css({"left":"-=1"});
        $('.target').css({"left":"-=1"});
        $(".arrow").css({'transform': 'rotate(45deg)'});
    }
    if (movLeft){
        $('.circle').css({"left":"+=1"})
        $('.target').css({"left":"+=1"})
        $(".arrow").css({'transform': 'rotate(-45deg)'});
    };

    if (movLeft && movUp) $(".arrow").css({'transform': 'rotate(-26.5deg)'});
    if (movRight && movUp) $(".arrow").css({'transform': 'rotate(26.5deg)'});

    
}

  