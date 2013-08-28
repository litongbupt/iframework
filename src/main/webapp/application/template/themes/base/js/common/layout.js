$(function(){
	//导航
	$(".nav dt").click(function(){
		$(".nav dd a").removeClass("active");
		if($(this).next("dd").is(":visible")){
			$("dd").hide();
		}else{
			$(this).next("dd").siblings("dd").hide().end().show();
			$(this).siblings("dt").removeClass("active").end().addClass("active");
		}
	});
	$(".nav dd a").click(function(){
		$(".nav dd a").removeClass("active");
		$(this).siblings("a").removeClass("active").end().addClass("active");
		
	});
	//列表隔行同行&光标接触样式
	$(".list").wrapAll("<div class='listWrap'></div>")
	$(".list tr:even").addClass("even");
	$(".list tr:odd").addClass("odd");
	$(".list tr").hover(function(){
		$(this).toggleClass("over");
	});
	//窗口自适应
	var bodyH;
	var textlW;
	if($(".nav").size()!=0){
		var navOffsetT = $(".nav").offset().top;
	};
	if($(".edit").size()!=0){
		var editOffsetT = $(".edit").offset().top;
	};
	if($(".tree").size()!=0){
		var treeOffsetT = $(".tree").offset().top;
	};
	if($(".leftMenu").size()!=0){
		var leftMenuOffsetT = $(".leftMenu").offset().top;
	};
	if($(".gview_userList").size()!=0){
		var gviewOffsetT = $(".gview_userList").offset().top;
	};
	if($(".content").size()!=0){
		var contentOffsetT = $(".content").offset().top;
	};
	if($(".content_div").size()!=0){
		var content_divOffsetT = $(".content_div").offset().top;
	};
	function resize(){
		bodyH = $("body").height();	
		textlW = $(".edit").width();
		if($(".list").size()!=0){
			var listOffsetT = $(".list").offset().top;
		};
		$(".nav dl").css("height",bodyH - navOffsetT - 65);
		$(".listWrap").css("height",bodyH - listOffsetT - 63);
		$(".edit").css("height",bodyH - editOffsetT - 27);
		$(".leftMenu,.rightContent").css("height",bodyH - leftMenuOffsetT);
		$(".tree_t").css("height",bodyH - treeOffsetT - 65);
		$(".saveBtn2").css("width",textlW - 17);
		$(".content").css("height",bodyH - contentOffsetT - 27);
		$(".gview_userList").css("height",bodyH - gviewOffsetT - 27);
		$(".content_div").css("height",bodyH - content_divOffsetT - 90);
	};
	resize();
	$(window).resize(function(){
		resize();
	});
	//框架折叠
	$(".frameToggle").toggle(function(){
		textlW = $(".edit").width();
		$(this).css("background-position","-553px -200px");
		$(".leftMenu").hide();
		$(".rightContent").css("margin-left","10px");
		$(".rightContent iframe").contents().find(".tree").css("width","420");
		$(".rightContent iframe").contents().find(".search_input").css("width","200");
		$(".rightContent iframe").contents().find(".edit").css("margin-left","340px");
		$(".rightContent iframe").contents().find(".saveBtn2").css({"margin-left":"347px","width":textlW + 73});
	},function(){
		textlW = $(".edit").width();
		$(this).css("background-position","-543px -200px");
		$(".leftMenu").show();
		$(".rightContent").css("margin-left","220px");
		$(".rightContent iframe").contents().find(".tree").css("width","210");
		$(".rightContent iframe").contents().find(".search_input").css("width","80");
		$(".rightContent iframe").contents().find(".edit").css("margin-left","220px");
		$(".rightContent iframe").contents().find(".saveBtn2").css({"margin-left":"227px","width":textlW - 107});
	});
	//分页
	$(".page a").not(".prev,.next").click(function(){
		$(this).siblings("a").removeClass("active").end().addClass("active");
	});
})